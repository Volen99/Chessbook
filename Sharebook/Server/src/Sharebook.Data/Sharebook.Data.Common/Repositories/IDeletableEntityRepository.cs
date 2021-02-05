namespace Sharebook.Data.Common.Repositories
{
    using System.Linq;
    using System.Threading.Tasks;

    using Sharebook.Data.Common.Models;
    using Sharebook.Data.Common.Repositories;

    public interface IDeletableEntityRepository<TEntity> : IRepository<TEntity>
        where TEntity : class, IDeletableEntity
    {
        IQueryable<TEntity> AllWithDeleted();

        IQueryable<TEntity> AllAsNoTrackingWithDeleted();

        void HardDelete(TEntity entity);

        void Undelete(TEntity entity);
    }
}
