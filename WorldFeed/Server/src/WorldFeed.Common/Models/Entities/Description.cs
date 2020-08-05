namespace WorldFeed.Common.Models.Entities
{
    using System.Collections.Generic;

    using WorldFeed.Common.Models.Urls;

    public class Description
    {
        public int Id { get; set; }

        public List<Url> Urls { get; set; }
    }
}
