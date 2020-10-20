using Newtonsoft.Json;

namespace Sharebook.Identity.API.Models.Authentication
{
    /// <summary>
    /// Information about an invalidated token
    /// </summary>
    public class InvalidateTokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
}