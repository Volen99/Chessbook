namespace WorldFeed.BuildingBlocks.EventBus.Abstractions
{
    using WorldFeed.BuildingBlocks.EventBus.Events;
    using System.Threading.Tasks;

    public interface IIntegrationEventHandler<in TIntegrationEvent> : IIntegrationEventHandler
        where TIntegrationEvent : IntegrationEvent
    {
        Task Handle(TIntegrationEvent @event);
    }

    public interface IIntegrationEventHandler
    {
    }
}
