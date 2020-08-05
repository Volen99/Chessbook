namespace WorldFeed.Streams.Model.AccountActivity
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class AccountActivityFavoriteEventDTO
    {
        public string Id { get; set; }

        [JsonProperty("user")]
        public IUserDTO User { get; set; }

        [JsonProperty("favorited_status")]
        public ITweetDTO FavoritedTweet { get; set; }
    }
}
