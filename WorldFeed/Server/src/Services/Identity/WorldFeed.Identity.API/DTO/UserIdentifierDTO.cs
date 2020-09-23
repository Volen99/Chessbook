namespace WorldFeed.Identity.API.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces;

    public class UserIdentifierDTO : IUserIdentifier
    {
        private long _id;

        [JsonProperty("id")]
        public long Id
        {
            get => _id;
            set
            {
                _id = value;
                IdStr = _id.ToString();
            }
        }

        [JsonProperty("id_str")]
        public string IdStr { get; set; }

        [JsonProperty("screen_name")]
        public string ScreenName { get; set; }
    }
}
