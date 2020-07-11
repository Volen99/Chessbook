namespace WorldFeed.Identity.Controllers
{
    using System.Threading.Tasks;
    using Services.Identity;
    using Models.Identity;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;

    using WorldFeed.Common.Controllers;
    using WorldFeed.Services.Identity;
    using WorldFeed.Identity.Data.Models;
    using WorldFeed.Admin.Models.Identity;
    using System.Collections.Generic;

    public class IdentityController : ApiController
    {
        private readonly IIdentityService identity;
        private readonly ICurrentUserService currentUser;
        private readonly UserManager<User> userManager;
        private readonly ITokenGeneratorService jwtTokenGenerator;

        public IdentityController(
            IIdentityService identity,
            ICurrentUserService currentUser,
            UserManager<User> userManager,
            ITokenGeneratorService jwtTokenGenerator)
        {
            this.identity = identity;
            this.currentUser = currentUser;
            this.userManager = userManager;
            this.jwtTokenGenerator = jwtTokenGenerator;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult<UserOutputModel>> Register(UserLoginRequestModel input)
        {
            var result = await this.identity.Register(input);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return await Login(input);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<UserOutputModel>> Login(UserLoginRequestModel input)
        {
            var result = await this.identity.Login(input);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var roles = await this.userManager.GetRolesAsync(result.Data);

            var token = this.jwtTokenGenerator.GenerateToken(result.Data, roles);

            return new UserOutputModel(token)
            {
                Id = result.Data.Id,
                FirstName = result.Data.FirstName,
                LastName = result.Data.LastName,
                Birthday = result.Data.Birthday,
                Age = result.Data.Age,
                Gender = result.Data.Gender,
                Location = result.Data.Location,
                Description = result.Data.Description,
                Url = result.Data.Url,
                Entities = new EntityOutputModel
                {
                    Description = new DescriptionOutputModel
                    {
                        Urls = new List<UrlOutputModel>(),
                    }
                },
                Protected = result.Data.Protected,
                FollowersCount = result.Data.FollowersCount,
                FriendsCount = result.Data.FriendsCount,
                ListedCount = result.Data.ListedCount,
                CreatedOn = result.Data.CreatedOn,
                FavouritesCount = result.Data.FavouritesCount,
                UtcOffset = result.Data.UtcOffset,
                TimeZone = result.Data.TimeZone,
                GeoEnabled = result.Data.GeoEnabled,
                Verified = result.Data.Verified,
                StatusesCount = result.Data.StatusesCount,
                Lang = result.Data.Lang,
                ContributorsEnabled = result.Data.ContributorsEnabled,
                IsTranslator = result.Data.IsTranslator,
                IsTranslationEnabled = result.Data.IsTranslationEnabled,
                ProfileBackgroundColor = result.Data.ProfileBackgroundColor,
                ProfileBackgroundImageUrl = result.Data.ProfileBackgroundImageUrl,
                ProfileBackgroundImageUrlHttps = result.Data.ProfileBackgroundImageUrlHttps,
                ProfileBackgroundTile = result.Data.ProfileBackgroundTile,
                ProfileImageUrl = result.Data.ProfileImageUrl,
                ProfileImageUrlHttps = result.Data.ProfileImageUrlHttps,
                ProfileBannerUrl = result.Data.ProfileBannerUrl,
                ProfileLinkColor = result.Data.ProfileLinkColor,
                ProfileSidebarBorderColor = result.Data.ProfileSidebarBorderColor,
                ProfileSidebarFillColor = result.Data.ProfileSidebarFillColor,
                ProfileTextColor = result.Data.ProfileTextColor,
                ProfileUseBackgroundImage = result.Data.ProfileUseBackgroundImage,
                DefaultProfile = result.Data.DefaultProfile,
                DefaultProfileImage = result.Data.DefaultProfileImage,
                Following = result.Data.Following,
                FollowRequestSent = result.Data.FollowRequestSent,
                Notifications = result.Data.Notifications,
                Blocking = result.Data.Blocking,
                TranslatorType = result.Data.TranslatorType,
                FollowedBy = result.Data.FollowedBy,
            };
        }

        [HttpPut]
        [Authorize]
        [Route(nameof(ChangePassword))]
        public async Task<ActionResult> ChangePassword(ChangePasswordInputModel input)
            => await this.identity.ChangePassword(this.currentUser.UserId, new ChangePasswordInputModel
            {
                CurrentPassword = input.CurrentPassword,
                NewPassword = input.NewPassword
            });
    }
}