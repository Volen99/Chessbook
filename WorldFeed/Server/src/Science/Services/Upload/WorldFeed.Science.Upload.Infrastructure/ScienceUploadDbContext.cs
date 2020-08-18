namespace WorldFeed.Science.Upload.Infrastructure
{
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Science.Upload.Domain.Feed;
    using WorldFeed.Science.Upload.Domain.Media;

    public class ScienceUploadDbContext : DbContext
    {
        public ScienceUploadDbContext(DbContextOptions<ScienceUploadDbContext> options)
            : base(options)
        {
        }

        // public DbSet<Media> Media { get; set; }

        public DbSet<Tweet> Feeds { get; set; }

        //public DbSet<FeedEntities> FeedEntities { get; set; }

        //public DbSet<UrlFeedEntity> UrlFeedEntities { get; set; }

        //public DbSet<UserMentionFeedEntity> UserMentionFeedEntities { get; set; }

        //public DbSet<HashtagFeedEntity> HashtagFeedEntities { get; set; }

        //public DbSet<SymbolFeedEntity> SymbolFeedEntities { get; set; }

        //public DbSet<MediaFeedEntity> MediaFeedEntities { get; set; }

        //public DbSet<ExtendedEntities> ExtendedEntities { get; set; }

        //public DbSet<GeoFeed> Geo { get; set; }

        //public DbSet<Coordinates> Coordinates { get; set; }

        //public DbSet<PlaceFeed> Places { get; set; }


        //protected override Assembly ConfigurationsAssembly => Assembly.GetExecutingAssembly();


        protected override void OnModelCreating(ModelBuilder builder)
        {
            // builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            //builder.Entity<Tweet>()
            //   .HasOne(f => f.Entities)
            //   .WithOne(f => f.Feed)
            //   .HasForeignKey<FeedEntities>(f => f.FeedId);

            base.OnModelCreating(builder);
        }
    }
}
