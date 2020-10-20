namespace Sharebook.Upload.Domain.Factories
{
    using Sharebook.Upload.Domain.Common;

    public interface IFactory<out TEntity>
        where TEntity : IAggregateRoot
    {
        TEntity Build();
    }
}
