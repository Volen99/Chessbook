namespace WorldFeed.Common.Models.Entities
{

    using global::WorldFeed.Common.Models.Urls;

    public class Entity
    {   
        public Url Url { get; set; }

        public int DescriptionId { get; set; }
        public Description Description { get; set; }
    }
}
