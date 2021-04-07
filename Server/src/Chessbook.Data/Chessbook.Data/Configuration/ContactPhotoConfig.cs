namespace Chessbook.Data.Configuration
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Chessbook.Data.Configuration.System;
    using Chessbook.Data.Models.Contact;

    public class ContactPhotoConfig : BaseEntityConfig<ContactPhoto>
    {
        public ContactPhotoConfig() : base("ContactPhotos")
        {
        }

        public override void Configure(EntityTypeBuilder<ContactPhoto> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.Image).IsRequired();
        }
    }
}
