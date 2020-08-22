namespace WorldFeed.Identity.API.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNetCore.Identity;

    using WorldFeed.Common.Models.Entities;
    using WorldFeed.Identity.API.Models.Enums;

    // Add profile data for application users by adding properties to the ApplicationUser class 
    public class ApplicationUser : IdentityUser
    {
        //  [Required]            // interesting regex
        //  [RegularExpression(@"(0[1-9]|1[0-2])\/[0-9]{2}", ErrorMessage = "Expiration should match a valid MM/YY value")]
        //  public string Expiration { get; set; }

        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Name { get; set; }

        public string ScreenName { get; set; }

        public int Month { get; set; }

        public int Day { get; set; }


        public int Year { get; set; }

        public Gender Gender { get; set; }

        public DateTime Birthday { get; set; }

        public int Age { get; set; }

        // Twitter

        public string Location { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }

        public Entity Entities { get; set; }

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

        public bool IsDeleted { get; set; }


        [DataType(DataType.DateTime)]
        public DateTime CreatedOn { get; set; }


        [DataType(DataType.DateTime)]
        public DateTime? ModifiedOn { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? DeletedOn { get; set; }
    }
}
