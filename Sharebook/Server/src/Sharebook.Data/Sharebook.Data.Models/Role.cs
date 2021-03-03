namespace Sharebook.Data.Models
{
    using global::System.Collections.Generic;
    using Sharebook.Data.Common.Models;

    public class Role : BaseModel<int>
    {
        public string Name { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
