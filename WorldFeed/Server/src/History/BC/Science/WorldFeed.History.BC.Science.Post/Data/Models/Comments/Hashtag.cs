namespace WorldFeed.History.BC.Science.Post.Data.Models.Comments
{
    using WorldFeed.Common.Models.Entities;

    // 12.07.2020, 10:36, Sunday, 1 Hour of H.P. Lovecraft Music: The Great Old Ones and Other Beings
    public class Hashtag
    {
        public string Text { get; set; }

        public int IndicesId { get; set; }
        public Indices Indices { get; set; }
    }
}
