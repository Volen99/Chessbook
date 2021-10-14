using Newtonsoft.Json;

namespace Chessbook.Web.Models.APIs
{
    public class GetChessbookUsersStreamDTO : GetStreamsResponseDTO
    {
        [JsonProperty("twitch_login_name")]
        public string TwitchLoginName { get; set; }
    }
}
