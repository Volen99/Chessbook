namespace WorldFeed.Science.API.Data
{
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Common.Data;
    using WorldFeed.Science.API.Data.Models;
    using WorldFeed.Science.Upload.Data.Models;
    using WorldFeed.Science.Upload.Data.Models.ExtendedFeedEntities;
    using WorldFeed.Science.Upload.Data.Models.Properties;

    public class ScienceUploadDbContext : DbContext
    {
        public ScienceUploadDbContext(DbContextOptions<ScienceUploadDbContext> options)
            : base(options)
        {
        }

        public DbSet<Media> Media { get; set; }

        public DbSet<Feed> Feeds { get; set; }

        public DbSet<FeedEntities> FeedEntities { get; set; }

        public DbSet<UrlFeedEntity> UrlFeedEntities { get; set; }

        public DbSet<UserMentionFeedEntity> UserMentionFeedEntities { get; set; }

        public DbSet<HashtagFeedEntity> HashtagFeedEntities { get; set; }

        public DbSet<SymbolFeedEntity> SymbolFeedEntities { get; set; }

        public DbSet<MediaFeedEntity> MediaFeedEntities { get; set; }

        public DbSet<ExtendedEntities> ExtendedEntities { get; set; }

        public DbSet<GeoFeed> Geo { get; set; }

        public DbSet<Coordinates> Coordinates { get; set; }

        public DbSet<PlaceFeed> Places { get; set; }


        //protected override Assembly ConfigurationsAssembly => Assembly.GetExecutingAssembly();


        protected override void OnModelCreating(ModelBuilder builder)
        {
            // builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            builder.Entity<Feed>()
               .HasOne(f => f.Entities)
               .WithOne(f => f.Feed)
               .HasForeignKey<FeedEntities>(f => f.FeedId);

            base.OnModelCreating(builder);
        }
    }
}
