using Chessbook.Common;
using Chessbook.Core;
using Chessbook.Data.Models;
using Chessbook.Data.Models.Media;
using Chessbook.Services.Data.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Data.Services.Media;
using Chessbook.Services.Notifications.Settings;
using Chessbook.Web.Models;
using Nop.Services.Common;
using Nop.Services.Helpers;
using Nop.Web.Areas.Admin.Models.Customers;
using System;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Factories
{
    public class UserModelFactory : IUserModelFactory
    {
        private readonly IPictureService pictureService;
        private readonly IPostsService postsService;
        private readonly IGenericAttributeService genericAttributeService;
        private readonly IDateTimeHelper dateTimeHelper;
        private readonly IUserService userService;
        private readonly ISettingsService settingsService;
        private readonly INotificationsSettingsService notificationsSettingsService;
        private readonly IUserNotificationSettingModelFactory userNotificationSettingModelFactory;

        public UserModelFactory(IPictureService pictureService, IPostsService postsService,
             IGenericAttributeService genericAttributeService, IDateTimeHelper dateTimeHelper,
             IUserService userService, ISettingsService settingsService,
             INotificationsSettingsService notificationsSettingsService,
             IUserNotificationSettingModelFactory userNotificationSettingModelFactory)
        {
            this.pictureService = pictureService;
            this.postsService = postsService;
            this.genericAttributeService = genericAttributeService;
            this.dateTimeHelper = dateTimeHelper;
            this.userService = userService;
            this.settingsService = settingsService;
            this.notificationsSettingsService = notificationsSettingsService;
            this.userNotificationSettingModelFactory = userNotificationSettingModelFactory;
        }

        public async Task<CustomerModel> PrepareCustomerModelAsync(CustomerModel model, Customer customer, bool excludeProperties = false)
        {
            if (customer != null)
            {
                // fill in model values from the entity
                model ??= new CustomerModel();

                model.Id = customer.Id;

                // whether to fill in some of properties
                if (!excludeProperties)
                {
                    model.Email = customer.Email;
                    model.DisplayName = customer.DisplayName;
                    model.ScreenName = customer.ScreenName;
                    model.Active = customer.Active;
                    model.FollowedBy = customer.FollowedBy;
                    model.FollowersCount = customer.FollowersCount;
                    model.County = await this.genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.CountyAttribute);
                    // model.CountryId = await this.genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.CountryIdAttribute);
                    model.CreatedOn = await dateTimeHelper.ConvertToUserTimeAsync(customer.CreatedOn, DateTimeKind.Utc, model.Id);
                    model.LastActivityDate = await this.dateTimeHelper.ConvertToUserTimeAsync(customer.LastActivityDateUtc, DateTimeKind.Utc, model.Id);
                    model.LastIpAddress = customer.LastIpAddress;
                }
            }
            else
            {
                // whether to fill in some of properties
                if (!excludeProperties)
                {
                    // precheck Registered Role as a default role while creating a new customer through admin
                    var registeredRole = await this.userService.GetCustomerRoleBySystemNameAsync(NopCustomerDefaults.RegisteredRoleName);
                    if (registeredRole != null)
                    {
                        // model.SelectedCustomerRoleIds.Add(registeredRole.Id);
                    }
                }
            }

            var userCurrent = await this.userService.GetCustomerByIdAsync(model.Id);

            // settings
            model.Settings = await this.settingsService.GetById(userCurrent.Id);

            // avatar
            var avatarPictureId = await this.genericAttributeService.GetAttributeAsync<int>(userCurrent, NopCustomerDefaults.AvatarPictureIdAttribute);
            var profilePictureUrl = await this.pictureService.GetPictureUrlAsync(avatarPictureId, 400, true, defaultPictureType: PictureType.Avatar);
            model.ProfileImageUrlHttps = ChessbookConstants.SiteHttps + profilePictureUrl;

            // banner
            var profileBannerPictureId = await this.genericAttributeService.GetAttributeAsync<int>(userCurrent, NopCustomerDefaults.ProfileBannerIdAttribute);
            var profileBannerUrl = await this.pictureService.GetPictureUrlAsync(profileBannerPictureId, 1500, true, defaultPictureType: PictureType.Banner);
            model.ProfileBannerURL = ChessbookConstants.SiteHttps + profileBannerUrl;

            // posts
            model.StatusesCount = await this.postsService.GetPostsCountByUserId(model.Id);

            // notification settings
            var userNotificationSettings = await this.notificationsSettingsService.GetByUserId(model.Id);
            model.NotificationSettings = await this.userNotificationSettingModelFactory.PrepareUserNotificationSettingModelAsync(userNotificationSettings);

            return model;

        }

        /// <summary>
        /// Prepare the customer avatar model
        /// </summary>
        /// <param name="model">Customer avatar model</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer avatar model
        /// </returns>
        public virtual async Task<string> PrepareCustomerAvatarModelAsync(int userId)
        {
            var userCurrent = await this.userService.GetCustomerByIdAsync(userId);

            var avatarPictureId = await this.genericAttributeService.GetAttributeAsync<int>(userCurrent, NopCustomerDefaults.AvatarPictureIdAttribute);
            var avatarUrl = await this.pictureService.GetPictureUrlAsync(avatarPictureId, 400, true, defaultPictureType: PictureType.Avatar);

            return ChessbookConstants.SiteHttps + avatarUrl;
        }
    }
}
