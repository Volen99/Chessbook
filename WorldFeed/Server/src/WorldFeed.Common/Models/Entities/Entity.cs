namespace WorldFeed.Common.Models.Entities
{
    using global::WorldFeed.Common.Models.Urls;

    public class Entity
    {   
        public int Id { get; set; }

        public int UrlId { get; set; }
        public Url Url { get; set; }

        public int DescriptionId { get; set; }
        public Description Description { get; set; }
    }
}
