namespace WorldFeed.History.BC.Science.Post.Models.Media
{
    public class VideoResponseModel : MediaInitResponseModel
    {
        public int MediaId { get; set; }

        public string media_id_string => "04246119348510";

        public string Media_Key => 7 + "_" + this.media_id_string;

        public long Size { get; set; }

        public int ExpiresAfterSecs => 86400;

        public Video Video { get; set; }

        public ProcessingInfo ProcessingInfo { get; set; }
    }
}
