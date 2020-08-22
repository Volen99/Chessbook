namespace WorldFeed.Science.Upload.Infrastructure.EntityConfigurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using WorldFeed.Science.Upload.Domain.Models;

    internal class FeedEntityTypeConfiguration : IEntityTypeConfiguration<Feed>
    {
        // https://docs.microsoft.com/en-us/ef/core/modeling/owned-entities#nested-owned-types
        public void Configure(EntityTypeBuilder<Feed> builder) // You can't call ModelBuilder.Entity<T>() on owned types (currently by design).
        {
            //// To configure a collection of owned types use OwnsMany;
            //builder
            //    .OwnsMany(p => p.Entities, e => 
            //    {
            //        e.WithOwner(e => e.).HasForeignKey("OwnerId");
            //        e.Property<long>("Id");
            //        e.HasKey("Id");
            //    });

            //builder
            //    .OwnsMany(p => p.UserMentions, a =>
            //    {
            //        a.WithOwner().HasForeignKey("OwnerId");
            //        a.Property<long>("Id");
            //        a.HasKey("Id");
            //    });

            //builder
            //    .OwnsMany(p => p.Hashtags, a =>
            //    {
            //        a.WithOwner().HasForeignKey("OwnerId");
            //        a.Property<long>("Id");
            //        a.HasKey("Id");
            //    });

            //builder
            //    .OwnsMany(p => p.Symbols, a =>
            //    {
            //        a.WithOwner().HasForeignKey("OwnerId");
            //        a.Property<long>("Id");
            //        a.HasKey("Id");
            //    });

            //builder
            //    .OwnsMany(p => p.Medias, a =>
            //    {
            //        a.WithOwner().HasForeignKey("OwnerId");
            //        a.Property<long>("Id");
            //        a.HasKey("Id");
            //    });

            // var navigation = builder.Metadata.FindNavigation(nameof(Feed.Entities));

            //// Set as field (New since EF 1.1) to access the OrderItem collection property through its field
            // navigation.SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
