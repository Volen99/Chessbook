using Sharebook.Data.Common.Models;

namespace Sharebook.Data.Models
{
    public class UserPhoto : BaseModel<int>
    {
        public byte[] Image { get; set; }

        public virtual User User { get; set; }
    }
}
