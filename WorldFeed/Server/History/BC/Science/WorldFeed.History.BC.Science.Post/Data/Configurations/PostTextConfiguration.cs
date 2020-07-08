using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldFeed.History.BC.Science.Post.Data.Models;

namespace WorldFeed.History.BC.Science.Post.Data.Configurations
{
    public class PostTextConfiguration : IEntityTypeConfiguration<Models.Post>
    {
        public void Configure(EntityTypeBuilder<Models.Post> builder)
        {
            builder
                .HasOne(p => p.Text)
                .WithOne(t => t.Post)
                .HasForeignKey<Text>(t => t.PostId); // basi maikata.. Kolko sum tup... 07.07.2020, Tuesday
        }
    }
}
