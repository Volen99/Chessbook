using Newtonsoft.Json;
using System.Collections.Generic;

namespace Chessbook.Web.Models.APIs
{
    // https://dev.twitch.tv/docs/api/reference#get-clips ♥
    public class GetTwitchClipOrVideoData
    {
        public List<ClipData> Data { get; set; }
    }

    public class ClipData
    {
        [JsonProperty("thumbnail_url")]
        public string ThumbnailUrl { get; set; }
    }
}
