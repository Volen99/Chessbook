namespace Sharebook.Data.Configuration.System
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Sharebook.Data.Models;

    public class RoleConfig : BaseEntityConfig<Role>
    {
        public RoleConfig() : base("Roles") { }

        public override void Configure(EntityTypeBuilder<Role> builder)
        {
            base.Configure(builder);
            builder.Property(obj => obj.Name);

            builder
                .HasMany(r => r.UserRoles)
                .WithOne()
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }
    }
}
