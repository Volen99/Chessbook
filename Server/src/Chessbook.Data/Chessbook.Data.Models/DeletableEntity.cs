namespace Chessbook.Data.Models
{
    using global::System;
    using Chessbook.Data.Common.Models;

    public abstract class DeletableEntity : BaseEntity
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
