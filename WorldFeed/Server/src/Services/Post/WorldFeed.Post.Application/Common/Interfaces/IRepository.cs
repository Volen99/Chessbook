namespace WorldFeed.Post.Application.Common.Interfaces
{
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Post.Domain.Common;

    // However, a better way to have the code enforce the convention that each repository is related to a single aggregate is
    // to implement a generic repository type. That way, it's explicit that you’re using a repository to target a specific 
    // aggregate. That can be easily done by implementing a generic IRepository base interface, as in the following code:
    public interface IRepository<in TEntity>
        where TEntity : IAggregateRoot
    {
        Task Save(TEntity entity, CancellationToken cancellationToken = default);
    }
}
