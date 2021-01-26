namespace Sharebook.Data.Models
{
    public class UserClaim : BaseEntity
    {
        public int UserId { get; set; }

        public virtual User User { get; set; }

        public string ClaimType { get; set; }

        public string ClaimValue { get; set; }
    }
}
