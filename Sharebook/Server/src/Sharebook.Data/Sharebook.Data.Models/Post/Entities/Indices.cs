namespace Sharebook.Data.Models.Post.Entities
{
    using Sharebook.Data.Common.Models;

    public class Indices : BaseDeletableModel<long>
    {
        public int IndexFirst { get; set; }

        public int IndexSecond { get; set; }
    }
}
