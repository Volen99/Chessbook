namespace WorldFeed.BuildingBlocks.EventBus.Abstractions
{
    using System.Threading.Tasks;

    using WorldFeed.BuildingBlocks.EventBus.Events;

    public interface IIntegrationEventHandler<in TIntegrationEvent> : IIntegrationEventHandler
        where TIntegrationEvent : IntegrationEvent
    {
        Task Handle(TIntegrationEvent @event);
    }

    public interface IIntegrationEventHandler
    {
    }
}
