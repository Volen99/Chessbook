namespace WorldFeed.Identity.API.DTO
{
    using Newtonsoft.Json;

    public class CreateTokenResponseDTO
    {
        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
}
