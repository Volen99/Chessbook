namespace WorldFeed.Science.API.Models.Media
{
    using WorldFeed.Common.Services.Mapping;

    public class MediaInitResponseModel : IMapFrom<Data.Models.Media>, IMapTo<Data.Models.Media>
    {
        public long MediaId { get; set; }

        public string MediaIdString => "04246119348510";

        public int ExpiresAfterSecs => 86400;

        public string MediaKey => 7 + "_" + this.MediaIdString; // TODO: I put the value
    }
}
