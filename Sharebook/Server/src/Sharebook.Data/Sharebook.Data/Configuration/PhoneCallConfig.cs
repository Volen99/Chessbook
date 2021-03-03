namespace Sharebook.Data.Configuration
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Sharebook.Data.Configuration.System;
    using Sharebook.Data.Models.Phone;

    public class PhoneCallConfig : BaseEntityConfig<PhoneCall>
    {
        public PhoneCallConfig() : base("PhoneCalls")
        {
        }

        public override void Configure(EntityTypeBuilder<PhoneCall> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.DateOfCall).IsRequired();
            builder.Property(obj => obj.ContactId).IsRequired();

            builder.HasOne(obj => obj.Contact)
                .WithMany(obj => obj.Calls)
                .HasForeignKey(obj => obj.ContactId)
                .OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
