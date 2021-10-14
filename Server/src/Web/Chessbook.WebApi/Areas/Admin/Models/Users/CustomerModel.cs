using System;
using System.Collections.Generic;

using Chessbook.Data.Models;
using Chessbook.Web.Api.Models.UserNotification;
using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Areas.Admin.Models.Customers
{
    /// <summary>
    /// Represents a customer model
    /// </summary>
    public partial record CustomerModel : BaseNopEntityModel //, IAclSupportedModel  // IUserIdentifierDTO
    {
        public string DisplayName { get; set; }

        public string ScreenName { get; set; }

        public string Email { get; set; }

        public int? Age { get; set; }

        public Settings Settings { get; set; }

        // Verify : ProfileImageTile

        public string Name { get; set; }

        //[JsonProperty("status")]
        //public PostDTO Status { get; set; }

        public string Description { get; set; }

        public DateTime CreatedOn { get; set; } // DateTimeOffset

        public string Location { get; set; }

        public bool? GeoEnabled { get; set; }

        public string Url { get; set; }

        public int StatusesCount { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingCount { get; set; }

        public bool? Following { get; set; }

        public bool Protected { get; set; }

        public bool Verified { get; set; }

        public bool BlockedBy { get; set; }

        public bool Blocking { get; set; }

        //[JsonProperty("entities")]
        //public IUserEntities Entities { get; set; }

        public bool? Notifications { get; set; }

        public string ProfileImageUrlHttps { get; set; }

        public bool? FollowRequestSent { get; set; }

        public bool DefaultProfile { get; set; }

        public bool DefaultProfileImage { get; set; }

        public int FavoritesCount { get; set; }

        public int ListedCount { get; set; }

        public string ProfileBannerURL { get; set; }

        public bool ProfileUseBackgroundImage { get; set; }

        public bool IsTranslator { get; set; }

        public bool ContributorsEnabled { get; set; }

        public int? UtcOffset { get; set; }

        public string TimeZone { get; set; }

        public bool FollowedBy { get; set; }

        public string County { get; set; }

        public bool Active { get; set; }

        public string WebsiteLink { get; set; }

        public string TwitterLink { get; set; }

        public string TwitchLink { get; set; }

        public string YoutubeLink { get; set; }

        public string FacebookLink { get; set; }

        public DateTime LastActivityDate { get; set; }

        public string LastIpAddress { get; set; }

        public string LastVisitedPage { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public NotificationSettingsModel NotificationSettings { get; set; }

        public List<int> Roles { get; set; }

        public override string ToString()
        {
            return this.ScreenName;
        }
    }
}
