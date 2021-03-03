namespace Sharebook.Data.Configuration
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Sharebook.Data.Configuration.System;
    using Sharebook.Data.Models.Contact;

    public class ContactConfig : BaseEntityConfig<Contact>
    {
        public ContactConfig() : base("Contacts")
        { }

        public override void Configure(EntityTypeBuilder<Contact> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.FirstName).IsRequired();
            builder.Property(obj => obj.LastName).IsRequired();
            builder.Property(obj => obj.PhoneNumber).IsRequired();
            builder.Property(obj => obj.NumberType).IsRequired();

            builder.HasOne(obj => obj.Photo)
                .WithOne(obj => obj.Contact)
                .HasForeignKey<ContactPhoto>(obj => obj.Id)
                .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
