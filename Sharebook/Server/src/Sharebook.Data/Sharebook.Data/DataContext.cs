namespace Sharebook.Data
{
    using Microsoft.EntityFrameworkCore;
    using Sharebook.Data.Common.Models;
    using Sharebook.Data.Configuration;
    using Sharebook.Data.Configuration.System;
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.Comments;
    using Sharebook.Data.Models.Post;
    using Sharebook.Data.Models.Post.Entities;
    using Sharebook.Data.Models.System;
    using System;
    using System.Linq;
    using System.Reflection;

    public class DataContext : DbContext
    {
        private static readonly MethodInfo SetIsDeletedQueryFilterMethod =
           typeof(DataContext).GetMethod(
               nameof(SetIsDeletedQueryFilter),
               BindingFlags.NonPublic | BindingFlags.Static);

        public ContextSession Session { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<UserClaim> UserClaims { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; }
        public DbSet<Settings> Settings { get; set; }



        public DbSet<Post> Posts { get; set; }

        public DbSet<MediaEntity> MediaEntities { get; set; }

        public DbSet<HashtagEntity> HashtagEntities { get; set; }

        public DbSet<UrlEntity> UrlEntities { get; set; }

        public DbSet<UserMentionEntity> UserMentionEntities { get; set; }

        public DbSet<SymbolEntity> SymbolEntities { get; set; }

        public DbSet<Indices> Indices { get; set; }

        public DbSet<PostVote> PostVotes { get; set; }

        public DbSet<Comment> Comments { get; set; }




        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new UserConfig());
            builder.ApplyConfiguration(new RoleConfig());
            builder.ApplyConfiguration(new UserRoleConfig());
            builder.ApplyConfiguration(new UserClaimConfig());
            builder.ApplyConfiguration(new UserPhotoConfig());
            builder.ApplyConfiguration(new SettingsConfig());

            // modelBuilder.HasDefaultSchema("starter_core");

            // Needed for Identity models configuration
            base.OnModelCreating(builder);

            this.ConfigureUserIdentityRelations(builder);

            EntityIndexesConfiguration.Configure(builder);

            var entityTypes = builder.Model.GetEntityTypes().ToList();

            // Set global query filter for not deleted entities only
            var deletableEntityTypes = entityTypes
                .Where(et => et.ClrType != null && typeof(IDeletableEntity).IsAssignableFrom(et.ClrType));
            foreach (var deletableEntityType in deletableEntityTypes)
            {
                var method = SetIsDeletedQueryFilterMethod.MakeGenericMethod(deletableEntityType.ClrType);
                method.Invoke(null, new object[] { builder });
            }

            // Disable cascade delete
            var foreignKeys = entityTypes
                .SelectMany(e => e.GetForeignKeys().Where(f => f.DeleteBehavior == DeleteBehavior.Cascade));
            foreach (var foreignKey in foreignKeys)
            {
                foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }

        private static void SetIsDeletedQueryFilter<T>(ModelBuilder builder)
            where T : class, IDeletableEntity
        {
            builder.Entity<T>().HasQueryFilter(e => !e.IsDeleted);
        }

        // Applies configurations
        private void ConfigureUserIdentityRelations(ModelBuilder builder)
             => builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);

        private void ApplyAuditInfoRules()
        {
            var changedEntries = this.ChangeTracker
                .Entries()
                .Where(e =>
                    e.Entity is IAuditInfo &&
                    (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in changedEntries)
            {
                var entity = (IAuditInfo)entry.Entity;
                if (entry.State == EntityState.Added && entity.CreatedOn == default)
                {
                    entity.CreatedOn = DateTime.UtcNow;
                }
                else
                {
                    entity.ModifiedOn = DateTime.UtcNow;
                }
            }
        }
    }
}
