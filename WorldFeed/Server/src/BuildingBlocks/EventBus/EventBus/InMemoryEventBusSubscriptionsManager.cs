namespace WorldFeed.BuildingBlocks.EventBus
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.BuildingBlocks.EventBus.Abstractions;
    using WorldFeed.BuildingBlocks.EventBus.Events;

    public partial class InMemoryEventBusSubscriptionsManager : IEventBusSubscriptionsManager
    {
        private readonly Dictionary<string, List<SubscriptionInfo>> handlers;
        private readonly List<Type> eventTypes;

        public event EventHandler<string> OnEventRemoved;

        public InMemoryEventBusSubscriptionsManager()
        {
            this.handlers = new Dictionary<string, List<SubscriptionInfo>>();
            this.eventTypes = new List<Type>();
        }

        public bool IsEmpty => !this.handlers.Keys.Any();

        public void Clear() => this.handlers.Clear();

        public void AddDynamicSubscription<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler
        {
            DoAddSubscription(typeof(TH), eventName, isDynamic: true);
        }

        public void AddSubscription<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>
        {
            var eventName = GetEventKey<T>();

            DoAddSubscription(typeof(TH), eventName, isDynamic: false);

            if (!this.eventTypes.Contains(typeof(T)))
            {
                this.eventTypes.Add(typeof(T));
            }
        }

        private void DoAddSubscription(Type handlerType, string eventName, bool isDynamic)
        {
            if (!HasSubscriptionsForEvent(eventName))
            {
                this.handlers.Add(eventName, new List<SubscriptionInfo>());
            }

            if (this.handlers[eventName].Any(s => s.HandlerType == handlerType))
            {
                throw new ArgumentException(
                    $"Handler Type {handlerType.Name} already registered for '{eventName}'", nameof(handlerType));
            }

            if (isDynamic)
            {
                this.handlers[eventName].Add(SubscriptionInfo.Dynamic(handlerType));
            }
            else
            {
                this.handlers[eventName].Add(SubscriptionInfo.Typed(handlerType));
            }
        }


        public void RemoveDynamicSubscription<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler
        {
            var handlerToRemove = FindDynamicSubscriptionToRemove<TH>(eventName);
            DoRemoveHandler(eventName, handlerToRemove);
        }


        public void RemoveSubscription<T, TH>()
            where TH : IIntegrationEventHandler<T>
            where T : IntegrationEvent
        {
            var handlerToRemove = FindSubscriptionToRemove<T, TH>();
            var eventName = GetEventKey<T>();
            DoRemoveHandler(eventName, handlerToRemove);
        }


        private void DoRemoveHandler(string eventName, SubscriptionInfo subsToRemove)
        {
            if (subsToRemove != null)
            {
                this.handlers[eventName].Remove(subsToRemove);
                if (!this.handlers[eventName].Any())
                {
                    this.handlers.Remove(eventName);
                    var eventType = this.eventTypes.SingleOrDefault(e => e.Name == eventName);
                    if (eventType != null)
                    {
                        this.eventTypes.Remove(eventType);
                    }
                    RaiseOnEventRemoved(eventName);
                }

            }
        }

        public IEnumerable<SubscriptionInfo> GetHandlersForEvent<T>() where T : IntegrationEvent
        {
            var key = GetEventKey<T>();
            return GetHandlersForEvent(key);
        }
        public IEnumerable<SubscriptionInfo> GetHandlersForEvent(string eventName) => this.handlers[eventName];

        private void RaiseOnEventRemoved(string eventName)
        {
            var handler = OnEventRemoved;
            handler?.Invoke(this, eventName);
        }


        private SubscriptionInfo FindDynamicSubscriptionToRemove<TH>(string eventName)
            where TH : IDynamicIntegrationEventHandler
        {
            return DoFindSubscriptionToRemove(eventName, typeof(TH));
        }


        private SubscriptionInfo FindSubscriptionToRemove<T, TH>()
             where T : IntegrationEvent
             where TH : IIntegrationEventHandler<T>
        {
            var eventName = GetEventKey<T>();
            return DoFindSubscriptionToRemove(eventName, typeof(TH));
        }

        private SubscriptionInfo DoFindSubscriptionToRemove(string eventName, Type handlerType)
        {
            if (!HasSubscriptionsForEvent(eventName))
            {
                return null;
            }

            return this.handlers[eventName].SingleOrDefault(s => s.HandlerType == handlerType);

        }

        public bool HasSubscriptionsForEvent<T>() where T : IntegrationEvent
        {
            var key = GetEventKey<T>();
            return HasSubscriptionsForEvent(key);
        }
        public bool HasSubscriptionsForEvent(string eventName) => this.handlers.ContainsKey(eventName);

        public Type GetEventTypeByName(string eventName) => this.eventTypes.SingleOrDefault(t => t.Name == eventName);

        public string GetEventKey<T>()
        {
            return typeof(T).Name;
        }
    }
}
