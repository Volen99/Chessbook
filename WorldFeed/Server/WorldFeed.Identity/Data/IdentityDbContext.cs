namespace WorldFeed.Identity.Data
{
    using System.Reflection;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Entities;
    using WorldFeed.Common.Models.Urls;

    public class IdentityDbContext : IdentityDbContext<ApplicationUser>
    {
        public IdentityDbContext(DbContextOptions<IdentityDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }

        public DbSet<Entity> Entities { get; set; }

        public DbSet<Url> Urls { get; set; }

        public DbSet<Description> Descriptions { get; set; }

        public DbSet<Indices> Indices { get; set; }
    }
}
