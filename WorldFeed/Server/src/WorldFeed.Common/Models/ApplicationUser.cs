// ReSharper disable VirtualMemberCallInConstructor
namespace WorldFeed.Common.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNetCore.Identity;

    using global::WorldFeed.Common.Models.Entities;
    using global::WorldFeed.Common.Models.Enums;

    public class ApplicationUser : IdentityUser, IAuditInfo, IDeletableEntity
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Roles = new HashSet<IdentityUserRole<string>>();
            this.Claims = new HashSet<IdentityUserClaim<string>>();
            this.Logins = new HashSet<IdentityUserLogin<string>>(); 
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public Gender Gender { get; set; }

        public DateTime Birthday { get; set; }

        public int Age { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime CreatedOn { get; set; }


        [DataType(DataType.DateTime)]
        public DateTime? ModifiedOn { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }

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

        public DateTime? DeletedOn { get; set; }
    }
}
