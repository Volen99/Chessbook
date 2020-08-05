namespace WorldFeed.History.API.Data.Models.Comments
{
    using WorldFeed.Common.Models.Entities;

    public class UserMention
    {
        public string Id { get; set; }

        public string ScreenName { get; set; }

        public string Name { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }
    }
}
