using Newtonsoft.Json;

namespace Chessbook.Web.Models.APIs
{
    // https://dev.twitch.tv/docs/api/reference#get-streams ♥
    public class GetStreamsResponseDTO
    {
        [JsonProperty("data")]
        public GetStreamsResponseData[] Data { get; set; }

        [JsonProperty("pagination")]
        public GetStreamsResponsePagination Pagination { get; set; }
    }
}
