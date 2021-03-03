namespace Sharebook.Data.Models.Contact
{
    using Sharebook.Data.Common.Models;

    public class ContactPhoto : BaseModel<int>
    {
        public byte[] Image { get; set; }

        public virtual Contact Contact { get; set; }
    }
}
