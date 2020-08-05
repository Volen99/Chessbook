namespace WorldFeed.Science.API.Models.Media
{
    public class ImageResponseModel : MediaInitResponseModel
    {
        public int MediaId { get; set; }

        public string media_id_string => "04246119348510";

        public string Media_Key => 7 + "_" + this.media_id_string; // TODO: I put the value;

        public long Size { get; set; }

        public int ExpiresAfterSecs => 86400;

        public Image Image { get; set; }
    }
}
