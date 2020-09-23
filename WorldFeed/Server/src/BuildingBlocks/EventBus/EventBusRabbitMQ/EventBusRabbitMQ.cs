namespace EventBusRabbitMQ
{
    using System;
    using System.Net.Sockets;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using Polly;
    using Polly.Retry;
    using Autofac;
    using RabbitMQ.Client;
    using RabbitMQ.Client.Events;
    using RabbitMQ.Client.Exceptions;

    using WorldFeed.BuildingBlocks.EventBus.Abstractions;
    using WorldFeed.BuildingBlocks.EventBus;
    using WorldFeed.BuildingBlocks.EventBus.Events;
    using EventBus.Extensions;
    using System.Text;

    public class EventBusRabbitMQ : IEventBus, IDisposable
    {
        const string BROKER_NAME = "worldfeed_event_bus";

        private readonly IRabbitMQPersistentConnection persistentConnection;
        private readonly ILogger<EventBusRabbitMQ> logger;
        private readonly IEventBusSubscriptionsManager subsManager;
        private readonly ILifetimeScope autofac;
        private readonly string AUTOFAC_SCOPE_NAME = "worldfeed_event_bus";
        private readonly int retryCount;

        private IModel consumerChannel;
        private string queueName;

        public EventBusRabbitMQ(IRabbitMQPersistentConnection persistentConnection, ILogger<EventBusRabbitMQ> logger,
            ILifetimeScope autofac, IEventBusSubscriptionsManager subsManager, string queueName = null, int retryCount = 5)
        {
            this.persistentConnection = persistentConnection ?? throw new ArgumentNullException(nameof(persistentConnection));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.subsManager = subsManager ?? new InMemoryEventBusSubscriptionsManager();
            this.queueName = queueName;
            this.consumerChannel = CreateConsumerChannel();
            this.autofac = autofac;
            this.retryCount = retryCount;
            this.subsManager.OnEventRemoved += SubsManager_OnEventRemoved;
        }

        private void SubsManager_OnEventRemoved(object sender, string eventName)
        {
            if (!this.persistentConnection.IsConnected)
            {
                this.persistentConnection.TryConnect();
            }

            using (var channel = this.persistentConnection.CreateModel())
            {
                channel.QueueUnbind(
                    queue: this.queueName,
                    exchange: BROKER_NAME,
                    routingKey: eventName);

                if (this.subsManager.IsEmpty)
                {
                    this.queueName = string.Empty;
                    this.consumerChannel.Close();
                }
            }
        }

        public void Publish(IntegrationEvent @event)
        {
            if (this.persistentConnection.IsConnected == false)
            {
                this.persistentConnection.TryConnect();
            }

            var policy = RetryPolicy.Handle<BrokerUnreachableException>()
                .Or<SocketException>()
                .WaitAndRetry(this.retryCount, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)), (ex, time) =>
                {
                    this.logger.LogWarning(ex, "Could not publish event: {EventId} after {Timeout}s ({ExceptionMessage})", @event.Id, $"{time.TotalSeconds:n1}", ex.Message);
                });

            var eventName = @event.GetType().Name;

            this.logger.LogTrace("Creating RabbitMQ channel to publish event: {EventId} ({EventName})", @event.Id, eventName);

            using (var channel = this.persistentConnection.CreateModel())
            {
                this.logger.LogTrace("Declaring RabbitMQ exchange to publish event: {EventId}", @event.Id);

                channel.ExchangeDeclare(exchange: BROKER_NAME, type: "direct");

                var message = JsonConvert.SerializeObject(@event);
                var body = Encoding.UTF8.GetBytes(message);

                policy.Execute(() =>
                {
                    var properties = channel.CreateBasicProperties();
                    properties.DeliveryMode = 2; // persistent

                    this.logger.LogTrace("Publishing event to RabbitMQ: {EventId}", @event.Id);

                    channel.BasicPublish(
                        exchange: BROKER_NAME,
                        routingKey: eventName,
                        mandatory: true,
                        basicProperties: properties,
                        body: body);
                });
            }
        }

        public void SubscribeDynamic<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler
        {
            this.logger.LogInformation("Subscribing to dynamic event {EventName} with {EventHandler}", eventName, typeof(TH).GetGenericTypeName());

            DoInternalSubscription(eventName);
            this.subsManager.AddDynamicSubscription<TH>(eventName);
            StartBasicConsume();
        }

        // The Subscribe method accepts an IIntegrationEventHandler object, which is like a callback method in
        // the current microservice, plus its related IntegrationEvent object. The code then adds that event
        // handler to the list of event handlers that each integration event type can have per client microservice.
        public void Subscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>
        {
            var eventName = this.subsManager.GetEventKey<T>();
            this.DoInternalSubscription(eventName);

            this.logger.LogInformation("Subscribing to event {EventName} with {EventHandler}", eventName, typeof(TH).GetGenericTypeName());

            this.subsManager.AddSubscription<T, TH>();
            StartBasicConsume();
        }

        private void DoInternalSubscription(string eventName)
        {
            var containsKey = this.subsManager.HasSubscriptionsForEvent(eventName);
            // If the client code has not already been subscribed to the event, the code creates a channel for the event type
            // so it can receive events in a push style from RabbitMQ when that event is published from any other service
            if (containsKey == false)
            {
                if (this.persistentConnection.IsConnected == false)
                {
                    this.persistentConnection.TryConnect();
                }

                using (var channel = this.persistentConnection.CreateModel())
                {
                    channel.QueueBind(
                        queue: this.queueName,
                        exchange: BROKER_NAME,
                        routingKey: eventName);
                }
            }
        }

        public void Unsubscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>
        {
            var eventName = this.subsManager.GetEventKey<T>();

            this.logger.LogInformation("Unsubscribing from event {EventName}", eventName);

            this.subsManager.RemoveSubscription<T, TH>();
        }

        public void UnsubscribeDynamic<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler
        {
            this.subsManager.RemoveDynamicSubscription<TH>(eventName);
        }

        public void Dispose()
        {
            if (this.consumerChannel != null)
            {
                this.consumerChannel.Dispose();
            }

            this.subsManager.Clear();
        }

        private void StartBasicConsume()
        {
            this.logger.LogTrace("Starting RabbitMQ basic consume");

            if (this.consumerChannel != null)
            {
                var consumer = new AsyncEventingBasicConsumer(this.consumerChannel);

                consumer.Received += Consumer_Received;

                this.consumerChannel.BasicConsume(
                    queue: this.queueName,
                    autoAck: false,
                    consumer: consumer);
            }
            else
            {
                this.logger.LogError("StartBasicConsume can't call on _consumerChannel == null");
            }
        }

        private async Task Consumer_Received(object sender, BasicDeliverEventArgs eventArgs)
        {
            var eventName = eventArgs.RoutingKey;
            var message = Encoding.UTF8.GetString(eventArgs.Body.ToArray());        // TODO: BUG!!!!!

            try
            {
                if (message.ToLowerInvariant().Contains("throw-fake-exception"))
                {
                    throw new InvalidOperationException($"Fake exception requested: \"{message}\"");
                }

                await ProcessEvent(eventName, message);
            }
            catch (Exception ex)
            {
                this.logger.LogWarning(ex, "----- ERROR Processing message \"{Message}\"", message);
            }

            // Even on exception we take the message off the queue.
            // in a REAL WORLD app this should be handled with a Dead Letter Exchange (DLX). 
            // For more information see: https://www.rabbitmq.com/dlx.html
            this.consumerChannel.BasicAck(eventArgs.DeliveryTag, multiple: false);
        }

        private IModel CreateConsumerChannel()
        {
            if (this.persistentConnection.IsConnected == false)
            {
                this.persistentConnection.TryConnect();
            }

            this.logger.LogTrace("Creating RabbitMQ consumer channel");

            var channel = this.persistentConnection.CreateModel();

            channel.ExchangeDeclare(exchange: BROKER_NAME,
                                    type: "direct");

            channel.QueueDeclare(queue: this.queueName,
                                 durable: true,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

            channel.CallbackException += (sender, ea) =>
            {
                this.logger.LogWarning(ea.Exception, "Recreating RabbitMQ consumer channel");

                this.consumerChannel.Dispose();
                this.consumerChannel = CreateConsumerChannel();
                StartBasicConsume();
            };

            return channel;
        }

        private async Task ProcessEvent(string eventName, string message)
        {
            this.logger.LogTrace("Processing RabbitMQ event: {EventName}", eventName);

            if (this.subsManager.HasSubscriptionsForEvent(eventName))
            {
                using (var scope = this.autofac.BeginLifetimeScope(AUTOFAC_SCOPE_NAME))
                {
                    var subscriptions = this.subsManager.GetHandlersForEvent(eventName);
                    foreach (var subscription in subscriptions)
                    {
                        if (subscription.IsDynamic)
                        {
                            var handler = scope.ResolveOptional(subscription.HandlerType) as IDynamicIntegrationEventHandler;
                            if (handler == null) continue;
                            dynamic eventData = JObject.Parse(message);

                            await Task.Yield();
                            await handler.Handle(eventData);
                        }
                        else
                        {
                            var handler = scope.ResolveOptional(subscription.HandlerType);
                            if (handler == null) continue;
                            var eventType = this.subsManager.GetEventTypeByName(eventName);
                            var integrationEvent = JsonConvert.DeserializeObject(message, eventType);
                            var concreteType = typeof(IIntegrationEventHandler<>).MakeGenericType(eventType);

                            await Task.Yield();
                            await (Task)concreteType.GetMethod("Handle").Invoke(handler, new object[] { integrationEvent });
                        }
                    }
                }
            }
            else
            {
                this.logger.LogWarning("No subscription for RabbitMQ event: {EventName}", eventName);
            }
        }
    }
}
