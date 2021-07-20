﻿namespace Chessbook.Data.Models
{
    using global::System;
    using global::System.Collections.Generic;

    using Chessbook.Core.Domain.Common;

    public class Customer : DeletableEntity, ISoftDeletedEntity
    {
        private const string REGEX_PROFILE_IMAGE_SIZE = "_[^\\W_]+(?=(?:\\.[a-zA-Z0-9_]+$))";

        public string DisplayName { get; set; }

        public string ScreenName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the customer GUID
        /// </summary>
        public Guid CustomerGuid { get; set; }

        public int? Age { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public string Location { get; set; } // The user-defined location for this account’s profile. Not necessarily a location, nor machine-parseable

        public string ProfileLocation { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }                         // A URL provided by the user in association with their profile: "https://developer.twitter.com"

        public bool Protected { get; set; }                     // When true, indicates that this user has chosen to protect their Tweets

        public int FollowersCount { get; set; }                 // The number of followers this account currently has

        public int FollowingCount { get; set; }                 // The number of users this account is following (AKA their "followings")

        public int ListedCount { get; set; }                    // The number of public lists that this user is a member of

        public int FavouritesCount { get; set; }                // The number of Feeds this user has liked in the account’s lifetime

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

        public string ProfileBackgroundImageUrl { get; set; }

        public string ProfileBackgroundImageUrlHttps { get; set; }

        public bool ProfileBackgroundTile { get; set; }

        public string ProfileBannerUrl { get; set; }

        public bool ProfileUseBackgroundImage { get; set; }

        public bool DefaultProfile { get; set; }    // When true, indicates that the user has not altered the theme or background of their user profile

        public bool DefaultProfileImage { get; set; }

        public int FavoritesCount { get; set; }

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


        // Account Settings

        //public PrivacyMode PrivacyMode { get; set; }

        //public Language Language { get; set; }

        public bool AlwaysUseHttps { get; set; }

        public bool DiscoverableByEmail { get; set; }

        public bool DiscoverableByMobilePhone { get; set; }

        public bool UseCookiePersonalization { get; set; }

        //public AllowDirectMessagesFrom AllowDirectMessagesFrom { get; set; }

        //public AllowDirectMessagesFrom AllowGroupDirectMessagesFrom { get; set; }

        //public AllowContributorRequestMode AllowContributorRequest { get; set; }

        public bool DisplaySensitiveMedia { get; set; }

        public bool SmartMute { get; set; }

        public bool SleepTimeEnabled { get; set; }

        public int StartSleepHour { get; set; }

        public int EndSleepHour { get; set; }

        /// <summary>
        /// Gets or sets the date and time until which a customer cannot login (locked out)
        /// </summary>
        public DateTime? CannotLoginUntilDateUtc { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the customer is active
        /// </summary>
        public bool Active { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the customer is required to re-login
        /// </summary>
        public bool RequireReLogin { get; set; }

        /// <summary>
        /// Gets or sets a value indicating number of failed login attempts (wrong password)
        /// </summary>
        public int FailedLoginAttempts { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the customer has been deleted
        /// </summary>
        public bool Deleted { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the customer account is system
        /// </summary>
        public bool IsSystemAccount { get; set; }

        /// <summary>
        /// Gets or sets the customer system name
        /// </summary>
        public string SystemName { get; set; }

        /// <summary>
        /// Gets or sets the last IP address
        /// </summary>
        public string LastIpAddress { get; set; }

        /// <summary>
        /// Gets or sets the date and time of last login
        /// </summary>
        public DateTime? LastLoginDateUtc { get; set; }

        /// <summary>
        /// Gets or sets the date and time of last activity
        /// </summary>
        public DateTime LastActivityDateUtc { get; set; }

        public string ProfileImageUrlHttps { get; set; }

        public virtual UserPhoto Photo { get; set; }
        public virtual Settings Settings { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<UserClaim> Claims { get; set; }
    }
}