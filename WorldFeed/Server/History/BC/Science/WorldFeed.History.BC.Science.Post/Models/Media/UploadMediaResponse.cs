namespace WorldFeed.History.BC.Science.Post.Models.Media
{
    public class UploadMediaResponse
    {
        public string MediaId { get; set; }

        public long Size { get; set; }

        public Image Image { get; set; }

        public Video Video { get; set; }

        public string DbPath { get; set; } // TODO: test property

        public string PostId { get; set; }
    }
}
