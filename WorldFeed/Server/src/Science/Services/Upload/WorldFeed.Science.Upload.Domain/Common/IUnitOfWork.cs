namespace WorldFeed.Science.Upload.Domain.Common
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    // These interfaces(IRepository and IUnitOfWork) inform the infrastructure layer about what needs to be implemented. 
    // Those interfaces are also used through Dependency Injection from the application layer
    public interface IUnitOfWork : IDisposable
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));

        Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
