namespace WorldFeed.Upload.Domain.Factories
{
    using WorldFeed.Upload.Domain.Common;

    public interface IFactory<out TEntity>
        where TEntity : IAggregateRoot
    {
        TEntity Build();
    }
}
