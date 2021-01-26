namespace Sharebook.Data.Configuration
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Sharebook.Data.Configuration.System;
    using Sharebook.Data.Models;

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
