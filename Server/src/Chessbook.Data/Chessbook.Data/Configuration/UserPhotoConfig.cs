namespace Chessbook.Data.Configuration
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Chessbook.Data.Configuration.System;
    using Chessbook.Data.Models;

    public class UserPhotoConfig : BaseEntityConfig<UserPhoto>
    {
        public UserPhotoConfig() : base("UserPhotos")
        { }

        public override void Configure(EntityTypeBuilder<UserPhoto> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.Image).IsRequired();
        }
    }
}
