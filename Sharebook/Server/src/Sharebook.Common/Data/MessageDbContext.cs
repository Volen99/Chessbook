namespace Sharebook.Common.Data
{
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;

    using Sharebook.Common.Data.Configurations;

    public abstract class MessageDbContext : DbContext
    {
        protected MessageDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Message> Messages { get; set; }

        // public DbSet<ProcessedMessages> ProcessedMessages { get; set; } // Search if one id is already processed -> 1:44:12 kenov last lecture

        protected abstract Assembly ConfigurationsAssembly { get; } // it is abstract due to .GetExecutingAssembly() if it later changes assembly

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new MessageConfiguration());

            builder.ApplyConfigurationsFromAssembly(this.ConfigurationsAssembly);

            base.OnModelCreating(builder);
        }
    }
}
