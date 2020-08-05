namespace WorldFeed.History.API.Models.Media
{
    public class VideoResponseModel : MediaInitResponseModel
    {
        public long Size { get; set; }

        public Video Video { get; set; }

        public ProcessingInfo ProcessingInfo { get; set; }
    }
}
