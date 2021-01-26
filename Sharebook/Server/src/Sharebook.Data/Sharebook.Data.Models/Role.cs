namespace Sharebook.Data.Models
{
    using global::System.Collections.Generic;

    public class Role : BaseEntity
    {
        public string Name { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
