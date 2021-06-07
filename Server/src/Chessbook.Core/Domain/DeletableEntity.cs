namespace Chessbook.Data.Models
{
    using global::System;

    public abstract class DeletableEntity : BaseEntity
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
