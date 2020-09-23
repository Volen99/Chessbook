namespace WorldFeed.Identity.Domain.AggregatesModel.ApplicationUserAggregate
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNetCore.Identity;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Identity.Domain.AggregatesModel.UserAggregate.Birthdate;
    using WorldFeed.Identity.Domain.AggregatesModel.UserAggregate.Enums;


    // Add profile data for application users by adding properties to the ApplicationUser class 
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();

            // this.Entities = new Entity();
            // this.Birthdate = new Birthdate();
        }

        public string IdStr => this.Id.ToString();          // TODO: Long int64 ids will lose value to "ToString()"!!!

        public string Name { get; set; }

        public string ScreenName { get; set; }

        public string Location { get; set; } // The user-defined location for this account’s profile. Not necessarily a location, nor machine-parseable

        public string ProfileLocation { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }                // A URL provided by the user in association with their profile: "https://developer.twitter.com"

        public bool Protected { get; set; }                     // When true, indicates that this user has chosen to protect their Tweets

        public long FollowersCount { get; set; }                // The number of followers this account currently has

        public int FriendsCount { get; set; }                   // The number of users this account is following (AKA their "followings")

        public int ListedCount { get; set; }                    // The number of public lists that this user is a member of

        [DataType(DataType.DateTime)]
        public DateTime CreatedOn { get; set; }      // The UTC datetime that the user account was created on Twitter: "Sun Jul 20 20:17:40 +0000 1969"

        public long FavouritesCount { get; set; }                // The number of Feeds this user has liked in the account’s lifetime

        public int UtcOffset { get; set; }

        public DateTime TimeZone { get; set; }

        public bool GeoEnabled { get; set; }

        public bool Verified { get; set; }

        public int StatusesCount { get; set; }

        public int MediaCount { get; set; }

        public string Lang { get; set; }

        public bool ContributorsEnabled { get; set; }

        public bool IsTranslator { get; set; }

        public bool IsTranslationEnabled { get; set; }

        public string ProfileBackgroundColor { get; set; }

        public string ProfileBackgroundImageUrl { get; set; }

        public string ProfileBackgroundImageUrlHttps { get; set; }

        public bool ProfileBackgroundTile { get; set; }

        public string ProfileImageUrl { get; set; }

        public string ProfileImageUrlHttps { get; set; }

        public string ProfileBannerUrl { get; set; }

        public string ProfileLinkColor { get; set; }

        public string ProfileSidebarBorderColor { get; set; }

        public string ProfileSidebarFillColor { get; set; }

        public string ProfileTextColor { get; set; }

        public bool ProfileUseBackgroundImage { get; set; }

        public bool DefaultProfile { get; set; }    // When true, indicates that the user has not altered the theme or background of their user profile

        public bool DefaultProfileImage { get; set; }

        public string PinnedTweetIds { get; set; }              // [int]

        public bool HasCustomTimelines { get; set; }        // https://blog.twitter.com/developer/en_us/a/2013/introducing-custom-timelines.html

        public bool CanMediaTag { get; set; }

        public bool FollowedBy { get; set; }

        public bool Following { get; set; }

        public bool FollowRequestSent { get; set; }

        public bool Notifications { get; set; }

        public bool Blocking { get; set; }

        public string BusinessProfileState { get; set; }

        public string TranslatorType { get; set; }

        public bool RequireSomeConsent { get; set; }

        public Gender Gender { get; set; }

        public Birthdate Birthdate { get; set; }

        public bool IsDeleted { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? ModifiedOn { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? DeletedOn { get; set; }

        // Account Settings

        public PrivacyMode PrivacyMode { get; set; }

        public Language Language { get; set; }

        public bool AlwaysUseHttps { get; set; }

        public bool DiscoverableByEmail { get; set; }

        public bool DiscoverableByMobilePhone { get; set; }

        public bool UseCookiePersonalization { get; set; }

        public AllowDirectMessagesFrom AllowDirectMessagesFrom { get; set; }

        public AllowDirectMessagesFrom AllowGroupDirectMessagesFrom { get; set; }

        public AllowContributorRequestMode AllowContributorRequest { get; set; }

        public bool DisplaySensitiveMedia { get; set; }

        public bool SmartMute { get; set; }

        public bool SleepTimeEnabled { get; set; }

        public int StartSleepHour { get; set; }

        public int EndSleepHour { get; set; }

        public TrendLocation[] TrendLocations { get; set; }
    }
}
