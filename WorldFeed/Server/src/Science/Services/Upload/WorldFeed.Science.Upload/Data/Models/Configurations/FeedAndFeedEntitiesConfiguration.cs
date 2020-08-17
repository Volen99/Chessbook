namespace WorldFeed.Science.Upload.Data.Models.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using WorldFeed.Science.API.Data.Models;

    public class FeedAndFeedEntitiesConfiguration : IEntityTypeConfiguration<Feed>
    {
        // TODO: still give same error even after this.
        public void Configure(EntityTypeBuilder<Feed> builder)
        {
            builder
                .HasOne(f => f.Entities)
                .WithOne(f => f.Feed)
                .HasForeignKey<FeedEntities>(f => f.FeedId);
        }
    }
}
