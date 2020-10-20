namespace Sharebook.Profile.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.Public.Models.Interfaces;

    public class UserIdentifierDTO : IUserIdentifier
    {
        private long id;

        [JsonProperty("id")]
        public long Id
        {
            get => this.id;
            set
            {
                this.id = value;
                IdStr = this.id.ToString();
            }
        }

        [JsonProperty("id_str")]
        public string IdStr { get; set; }

        [JsonProperty("screen_name")]
        public string ScreenName { get; set; }
    }
}
