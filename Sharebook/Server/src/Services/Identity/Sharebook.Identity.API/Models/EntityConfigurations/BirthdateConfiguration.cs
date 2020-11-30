namespace Sharebook.Identity.API.Models.EntityConfigurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Sharebook.Identity.API.Models.User.Birthdate;

    public class BirthdateConfiguration : IEntityTypeConfiguration<Birthdate>
    {
        public void Configure(EntityTypeBuilder<Birthdate> builder)
        {
            builder.HasNoKey();
        }
    }
}
