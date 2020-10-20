namespace Sharebook.Common.Data
{
    using System.Threading;
    using System.Threading.Tasks;
    public interface IDbContextHelpingMethods // TODO: delete it as it is used nowhere?
    {
        public int SaveChanges();

        public int SaveChanges(bool acceptAllChangesOnSuccess);

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        public Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default);
    }
}
