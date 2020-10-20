namespace Sharebook.BuildingBlocks.EventBus
{
    using System;

    public partial class InMemoryEventBusSubscriptionsManager : IEventBusSubscriptionsManager
    {
        public class SubscriptionInfo
        {
            private SubscriptionInfo(bool isDynamic, Type handlerType)
            {
                this.IsDynamic = isDynamic;
                this.HandlerType = handlerType;
            }

            public bool IsDynamic { get; }

            public Type HandlerType { get; }

            public static SubscriptionInfo Dynamic(Type handlerType)
            {
                return new SubscriptionInfo(true, handlerType);
            }

            public static SubscriptionInfo Typed(Type handlerType)
            {
                return new SubscriptionInfo(false, handlerType);
            }
        }
    }
}
