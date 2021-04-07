namespace Chessbook.Web.Models
{
    using Newtonsoft.Json;
    using Chessbook.Data.Models;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Outputs.Posts;
    using Chessbook.Web.Models.Users;
    using System;
    using System.Collections.Generic;

    public class UserDTO : UserIdentifierDTO, IMapFrom<User>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public int? Age { get; set; }

        public SettingsDTO Settings { get; set; }

        // Verify : ProfileImageTile

        [JsonProperty("name")]
        public string Name { get; set; }

        //[JsonProperty("status")]
        //public PostDTO Status { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("created_at")]
        public DateTime CreatedOn { get; set; } // DateTimeOffset

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("geo_enabled")]
        public bool? GeoEnabled { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("statuses_count")]
        public int StatusesCount { get; set; }

        [JsonProperty("followers_count")]
        public int FollowersCount { get; set; }

        [JsonProperty("friends_count")]
        public int FriendsCount { get; set; }

        [JsonProperty("following")]
        public bool? Following { get; set; }

        public bool Protected { get; set; }

        [JsonProperty("verified")]
        public bool Verified { get; set; }

        //[JsonProperty("entities")]
        //public IUserEntities Entities { get; set; }

        [JsonProperty("notifications")]
        public bool? Notifications { get; set; }

        //[JsonProperty("profile_image_url")]
         // public string ProfileImageUrlHttp { get; set; }

        [JsonProperty("profile_image_url_https")]
        public string ProfileImageUrlHttps { get; set; }

        [JsonProperty("follow_request_sent")]
        public bool? FollowRequestSent { get; set; }

        [JsonProperty("default_profile")]
        public bool DefaultProfile { get; set; }

        [JsonProperty("default_profile_image")]
        public bool DefaultProfileImage { get; set; }

        [JsonProperty("favourites_count")]
        public int FavoritesCount { get; set; }

        //[JsonProperty("listed_count")]
        public int ListedCount { get; set; }

        [JsonProperty("profile_sidebar_fill_color")]
         public string ProfileSidebarFillColor { get; set; }

        [JsonProperty("profile_sidebar_border_color")]
        public string ProfileSidebarBorderColor { get; set; }

        [JsonProperty("profile_background_tile")]
        public bool ProfileBackgroundTile { get; set; }

        [JsonProperty("profile_background_color")]
        public string ProfileBackgroundColor { get; set; }

        [JsonProperty("profile_background_image_url")]
        public string ProfileBackgroundImageUrl { get; set; }

        [JsonProperty("profile_background_image_url_https")]
        public string ProfileBackgroundImageUrlHttps { get; set; }

        [JsonProperty("profile_banner_url")]
        public string ProfileBannerURL { get; set; }

        [JsonProperty("profile_text_color")]
        public string ProfileTextColor { get; set; }

        [JsonProperty("profile_link_color")]
        public string ProfileLinkColor { get; set; }

        [JsonProperty("profile_use_background_image")]
        public bool ProfileUseBackgroundImage { get; set; }

        [JsonProperty("is_translator")]
        public bool IsTranslator { get; set; }

        [JsonProperty("contributors_enabled")]
        public bool ContributorsEnabled { get; set; }

        [JsonProperty("utc_offset")]
        public int? UtcOffset { get; set; }

        [JsonProperty("time_zone")]
        public string TimeZone { get; set; }

        //[JsonProperty("withheld_in_countries")]
        //public IEnumerable<string> WithheldInCountries { get; set; }

        //[JsonProperty("withheld_scope")]
        //public string WithheldScope { get; set; }

        public override string ToString()
        {
            return base.ScreenName;
        }
    }
}
