namespace Sharebook.Data.Models
{
    using global::System;
    using Sharebook.Data.Common.Models;

    public abstract class DeletableEntity : BaseModel<int>
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
