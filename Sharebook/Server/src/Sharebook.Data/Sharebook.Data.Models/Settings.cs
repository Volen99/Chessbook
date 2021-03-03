using Sharebook.Data.Common.Models;

namespace Sharebook.Data.Models
{
    public class Settings : BaseModel<int>
    {
        public string ThemeName { get; set; }

        public virtual User User { get; set; }
    }
}
