namespace Sharebook.Identity.API.Models.EntityConfigurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Sharebook.Identity.API.Models.User;
    using Sharebook.Identity.API.Models.User.Birthdate;

    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasOne<Birthdate>();
        }
    }
}
