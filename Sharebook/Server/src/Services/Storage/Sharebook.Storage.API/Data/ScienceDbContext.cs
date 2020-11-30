namespace Sharebook.Storage.API.Data
{
    using System;
    using System.Reflection;
    using System.Data;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Storage;

    using Sharebook.Storage.API.Data.Models.TwitterEntities;

    public class ScienceDbContext : DbContext
    {
        public const string DEFAULT_SCHEMA = "science.upload";

        private IDbContextTransaction currentTransaction;

        public ScienceDbContext(DbContextOptions<ScienceDbContext> options) : base(options) 
        {
        }

        public DbSet<Models.Post> Posts { get; set; }

        public DbSet<MediaEntity> Medias { get; set; }

        public DbSet<HashtagEntity> Hashtags { get; set; }

        public IDbContextTransaction GetCurrentTransaction() => this.currentTransaction;

        public bool HasActiveTransaction => this.currentTransaction != null;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            // modelBuilder.ApplyConfiguration(new ClientRequestEntityTypeConfiguration());
        }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            // Dispatch Domain Events collection. 
            // Choices:
            // A) Right BEFORE committing data (EF SaveChanges) into the DB will make a single transaction including  
            // side effects from the domain event handlers which are using the same DbContext with "InstancePerLifetimeScope" or "scoped" lifetime
            // B) Right AFTER committing data (EF SaveChanges) into the DB will make multiple transactions. 
            // You will need to handle eventual consistency and compensatory actions in case of failures in any of the Handlers. 

            // await this.mediator.DispatchDomainEventsAsync(this);

            // After executing this line all the changes (from the Command Handler and Domain Event Handlers) 
            // performed through the DbContext will be committed
            var result = await base.SaveChangesAsync(cancellationToken);

            return true;
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            if (this.currentTransaction != null) return null;

            this.currentTransaction = await Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);

            return this.currentTransaction;
        }

        public async Task CommitTransactionAsync(IDbContextTransaction transaction)
        {
            if (transaction == null) throw new ArgumentNullException(nameof(transaction));
            if (transaction != this.currentTransaction) throw new InvalidOperationException($"Transaction {transaction.TransactionId} is not current");

            try
            {
                await SaveChangesAsync();
                transaction.Commit();
            }
            catch
            {
                RollbackTransaction();
                throw;
            }
            finally
            {
                if (this.currentTransaction != null)
                {
                    this.currentTransaction.Dispose();
                    this.currentTransaction = null;
                }
            }
        }

        public void RollbackTransaction()
        {
            try
            {
                this.currentTransaction?.Rollback();
            }
            finally
            {
                if (this.currentTransaction != null)
                {
                    this.currentTransaction.Dispose();
                    this.currentTransaction = null;
                }
            }
        }
    }
}
