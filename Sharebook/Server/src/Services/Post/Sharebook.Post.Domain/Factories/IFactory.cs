namespace Sharebook.Storage.Domain.Factories
{
    using Sharebook.Storage.Domain.Common;

    public interface IFactory<out TEntity>
        where TEntity : IAggregateRoot
    {
        TEntity Build();
    }
}
