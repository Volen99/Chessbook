using System;
using WorldFeed.Admin.Models.Identity;
using WorldFeed.Common.Models;
using WorldFeed.Common.Models.Entities;
using WorldFeed.Common.Models.Enums;
using WorldFeed.Common.Services.Mapping;

namespace WorldFeed.Identity.Models.Identity
{
    public class UserOutputModel : Common.Services.Mapping.IMapFrom<ApplicationUser>, IMapTo<ApplicationUser>
    {
        public UserOutputModel(string token)
        {
            this.Token = token;
        }

        public string Token { get; }

        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public Gender Gender { get; set; }

        public DateTime Birthday { get; set; }

        public int Age { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Location { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }

        public EntityOutputModel Entities { get; set; }

        public bool Protected { get; set; }

        public long FollowersCount { get; set; }

        public int FriendsCount { get; set; }

        public int ListedCount { get; set; }

        public long FavouritesCount { get; set; }

        public string UtcOffset { get; set; }

        public DateTime TimeZone { get; set; }

        public bool GeoEnabled { get; set; }

        public bool Verified { get; set; }

        public int StatusesCount { get; set; }

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

        public bool DefaultProfile { get; set; }

        public bool DefaultProfileImage { get; set; }

        public bool Following { get; set; }

        public string FollowRequestSent { get; set; }

        public string Notifications { get; set; }

        public bool Blocking { get; set; }

        public string TranslatorType { get; set; }

        public bool FollowedBy { get; set; }
    }
}
