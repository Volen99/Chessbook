namespace Sharebook.Data.Models
{
    public abstract class DeletableEntity : BaseEntity
    {
        public bool IsDeleted { get; set; }
    }
}
