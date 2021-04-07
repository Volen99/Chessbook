namespace Chessbook.Data.Models
{
    using global::System.Collections.Generic;
    using Chessbook.Data.Common.Models;

    public class Role : BaseEntity
    {
        public string Name { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
