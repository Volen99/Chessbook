namespace Chessbook.Data.Configuration.System
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Chessbook.Data.Models;

    public class UserClaimConfig : BaseEntityConfig<UserClaim>
    {
        public UserClaimConfig() : base("UserClaims") { }

        public override void Configure(EntityTypeBuilder<UserClaim> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.ClaimType).IsRequired();
            builder.Property(obj => obj.ClaimValue).IsRequired();

            builder.Ignore(obj => obj.User);
        }
    }
}
