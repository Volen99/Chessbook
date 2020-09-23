namespace WorldFeed.Identity.Domain.AggregatesModel.UserAggregate
{
    using System.Threading.Tasks;

    using WorldFeed.Identity.Domain.Common;

    // In a microservice based on Domain-Driven Design patterns, the only channel you should use to update the database should be
    // the repositories. This is because they have a one-to-one relationship with the aggregate root, which controls the aggregate's
    // invariants and transactional consistency
    public interface IUserRepository : IRepository<User>
    {
        User Add(User order);

        void Update(User order);

        Task<User> GetAsync(long userId);
    }
}
