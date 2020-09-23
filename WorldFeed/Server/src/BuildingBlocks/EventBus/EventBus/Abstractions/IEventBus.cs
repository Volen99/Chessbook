namespace WorldFeed.BuildingBlocks.EventBus.Abstractions
{
    using WorldFeed.BuildingBlocks.EventBus.Events;

    public interface IEventBus
    {
        /// <summary>
        /// The Publish method is straightforward. The event bus will broadcast the integration event passed to
        /// it to any microservice, or even an external application, subscribed to that event. This method is used
        /// by the microservice that is publishing the event
        /// </summary>
        /// <param name="event"></param>
        void Publish(IntegrationEvent @event);

        /// <summary>
        /// The Subscribe methods (you can have several implementations depending on the arguments) are
        /// used by the microservices that want to receive events.This method has two arguments.The first is the
        /// integration event to subscribe to(IntegrationEvent). The second argument is the integration event
        /// handler (or callback method), named IIntegrationEventHandler<T>, to be executed when the
        /// receiver microservice gets that integration event message
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TH"></typeparam>
        void Subscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>;

        void SubscribeDynamic<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler;

        void UnsubscribeDynamic<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler;

        void Unsubscribe<T, TH>()
            where TH : IIntegrationEventHandler<T>
            where T : IntegrationEvent;
    }
}
