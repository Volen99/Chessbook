namespace WorldFeed.Common.Public.Models.Authentication
{
    using Newtonsoft.Json;

    /// <summary>
    /// Information about an invalidated token
    /// </summary>
    public class InvalidateTokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
}
