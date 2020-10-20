using WorldFeed.Programming.Quiz.Data.Common.Models;

namespace WorldFeed.Programming.Quiz.Data.Models
{
    public class Setting : BaseDeletableModel<int>
    {
        public string Name { get; set; }

        public string Value { get; set; }
    }
}
