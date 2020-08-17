namespace WorldFeed.Common.Models.WorldFeed
{
    using global::WorldFeed.Common.Public.Models.Entities;

    public class MediaEntitySize : IMediaEntitySize
    {
        public int Id { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        public string Resize { get; set; }
    }
}
