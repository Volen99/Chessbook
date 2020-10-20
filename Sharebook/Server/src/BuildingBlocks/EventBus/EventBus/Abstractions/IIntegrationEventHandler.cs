namespace Sharebook.BuildingBlocks.EventBus.Abstractions
{
    using System.Threading.Tasks;

    using Sharebook.BuildingBlocks.EventBus.Events;

    public interface IIntegrationEventHandler<in TIntegrationEvent> : IIntegrationEventHandler
        where TIntegrationEvent : IntegrationEvent
    {
        Task Handle(TIntegrationEvent @event);
    }

    public interface IIntegrationEventHandler
    {
    }
}
