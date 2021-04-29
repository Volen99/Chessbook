using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.APIs
{
    public class GetChessbookUsersStreamDTO : GetStreamsResponseDTO
    {
        [JsonProperty("twitch_login_name")]
        public string TwitchLoginName { get; set; }
    }
}
