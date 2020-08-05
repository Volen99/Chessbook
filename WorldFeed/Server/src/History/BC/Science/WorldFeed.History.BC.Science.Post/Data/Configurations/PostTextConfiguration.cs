namespace WorldFeed.History.BC.Science.Post.Data.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using WorldFeed.History.API.Data.Models;

    public class PostTextConfiguration : IEntityTypeConfiguration<API.Data.Models.Post>
    {
        public void Configure(EntityTypeBuilder<API.Data.Models.Post> builder)
        {
            builder
                .HasOne(p => p.Text)
                .WithOne(t => t.Post)
                .HasForeignKey<Text>(t => t.PostId); // basi maikata.. Kolko sum tup... 07.07.2020, Tuesday
        }
    }
}
