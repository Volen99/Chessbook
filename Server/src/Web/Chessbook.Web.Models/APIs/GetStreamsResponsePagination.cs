using Newtonsoft.Json;

namespace Chessbook.Web.Models.APIs
{
    public class GetStreamsResponsePagination
    {
        [JsonProperty("cursor")]
        public string Cursor { get; set; }
    }
}
