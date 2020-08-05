namespace WorldFeed.History.Common.Messages.Texts
{
    public class TextCreatedMessage
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public int PostId { get; set; }
    }
}
