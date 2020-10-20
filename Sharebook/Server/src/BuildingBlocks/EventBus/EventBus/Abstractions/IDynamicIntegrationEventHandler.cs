namespace Sharebook.BuildingBlocks.EventBus.Abstractions
{
    using System.Threading.Tasks;

    public interface IDynamicIntegrationEventHandler
    {
        Task Handle(dynamic eventData);
    }
}
