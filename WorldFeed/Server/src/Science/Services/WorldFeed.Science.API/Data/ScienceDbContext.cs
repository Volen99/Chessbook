namespace WorldFeed.Science.API.Data
{
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Common.Data;
    using WorldFeed.Science.API.Data.Models;

    public class ScienceDbContext : MessageDbContext  //  IdentityDbContext<ApplicationUser, ApplicationRole, string> // TODO: Do you really need to inherit IdentityDbContext?
    {
        public ScienceDbContext(DbContextOptions<ScienceDbContext> options)
            : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Text> Texts { get; set; }

        public DbSet<Media> Media { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Vote> Votes { get; set; }

        protected override Assembly ConfigurationsAssembly => Assembly.GetExecutingAssembly();
    }
}
