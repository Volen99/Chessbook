namespace WorldFeed.History.BC.Science.Post.Data
{
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    using WorldFeed.Common.Models;
    using WorldFeed.History.BC.Science.Post.Data.Models;

    public class PostDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string> // TODO: Do you really need to inherit IdentityDbContext?
    {
        public PostDbContext(DbContextOptions<PostDbContext> options)
            : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Text> Texts { get; set; }

        public DbSet<Models.Media> Media { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Vote> Votes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
}