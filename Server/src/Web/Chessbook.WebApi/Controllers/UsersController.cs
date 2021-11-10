namespace Chessbook.Web.Api.Controllers
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.IO;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using SkiaSharp;

    using Chessbook.Data.Common.Filters;
    using Chessbook.Services;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models;
    using Chessbook.Services.Data.Services.Media;
    using Chessbook.Services.Common;
    using Chessbook.Common;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Services.Data;
    using Chessbook.Web.Models.Outputs;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Media;
    using Chessbook.Web.Api.Factories;
    using Chessbook.Core;
    using Chessbook.Services.Logging;
    using Chessbook.Web.Areas.Admin.Models.Customers;
    using Chessbook.Services.Authentication;
    using Chessbook.Web.Api.Models.Posts;
    using Chessbook.Services.Notifications;
    using Chessbook.Core.Domain.Notifications;
    using Chessbook.Services.Notifications.Settings;
    using Chessbook.Services.Customers;
    using Chessbook.Services.Abuses;
    using Chessbook.Web.Api.Models.Abuses;
    using Chessbook.Services.Relationships;
    using Chessbook.Services.Blocklist;
    using Chessbook.Web.Api.Models.Blocklist;
    using Chessbook.Web.Models.Users;
    using Chessbook.Web.Models.Media;
    using Chessbook.Web.Api.Areas.Admin.Models.Post;
    using Chessbook.Services.Directory;
    using Chessbook.Web.Api.Models.Utc;
    using Chessbook.Services.Helpers;
    using Chessbook.Services.Localization;
    using Chessbook.Core.Domain.Gdpr;
    using Chessbook.Services.Gdpr;
    using Chessbook.Services.ExportImport;
    using Chessbook.Services.Chat;

    [Route("users")]
    public class UsersController : BaseApiController
    {
        protected readonly IUserService userService;
        protected readonly JwtManager jwtManager;
        protected readonly IAuthenticationService authService;
        protected readonly IPostsService postsService;
        protected readonly IPictureService pictureService;
        private readonly IGenericAttributeService genericAttributeService;
        private readonly IRelationshipService relationshipService;
        private readonly IUserModelFactory userModelFactory;
        private readonly ICustomerActivityService _customerActivityService;
        private readonly IUserNotificationService notificationsService;
        private readonly INotificationsSettingsService notificationsSettingsService;
        private readonly IUserNotificationSettingModelFactory userNotificationSettingModelFactory;
        private readonly IUserNotificationModelFactory userNotificationModelFactory;
        private readonly ICustomerRegistrationService customerRegistrationService;
        private readonly IAbuseService abuseService;
        private readonly IAbuseModelFactory abuseModelFactory;
        private readonly IFollowService followService;
        private readonly IBlocklistService blocklistService;
        private readonly IUserBlocklistFactory userBlocklistFactory;
        private readonly IWorkContext workContext;
        private readonly ICountryService countryService;
        private readonly IDateTimeHelper dateTimeHelper;
        private readonly ILocaleStringResourceService localeStringResourceService;
        private readonly IGdprService gdprService;
        private readonly IExportManager exportManager;
        private readonly IChatService chatService;

        public UsersController(IUserService userService, JwtManager jwtManager, IAuthenticationService authService, IPostsService postsService,
            IPictureService pictureService, IGenericAttributeService genericAttributeService, IRelationshipService relationshipService, IUserModelFactory userModelFactory,
            ICustomerActivityService customerActivityService, IUserNotificationService notificationsService, INotificationsSettingsService notificationsSettingsService,
            IUserNotificationSettingModelFactory userNotificationSettingModelFactory, IUserNotificationModelFactory userNotificationModelFactory,
            ICustomerRegistrationService customerRegistrationService, IAbuseService abuseService, IAbuseModelFactory abuseModelFactory,
            IFollowService followService, IBlocklistService blocklistService, IUserBlocklistFactory userBlocklistFactory, IWorkContext workContext,
            ICountryService countryService, IDateTimeHelper dateTimeHelper, ILocaleStringResourceService localeStringResourceService,
            IGdprService gdprService, IExportManager exportManager, IChatService chatService)
        {
            this.userService = userService;
            this.jwtManager = jwtManager;
            this.authService = authService;
            this.postsService = postsService;
            this.pictureService = pictureService;
            this.genericAttributeService = genericAttributeService;
            this.relationshipService = relationshipService;
            this.userModelFactory = userModelFactory;
            this._customerActivityService = customerActivityService;
            this.notificationsService = notificationsService;
            this.notificationsSettingsService = notificationsSettingsService;
            this.userNotificationSettingModelFactory = userNotificationSettingModelFactory;
            this.userNotificationModelFactory = userNotificationModelFactory;
            this.customerRegistrationService = customerRegistrationService;
            this.abuseService = abuseService;
            this.abuseModelFactory = abuseModelFactory;
            this.followService = followService;
            this.blocklistService = blocklistService;
            this.userBlocklistFactory = userBlocklistFactory;
            this.workContext = workContext;
            this.countryService = countryService;
            this.dateTimeHelper = dateTimeHelper;
            this.localeStringResourceService = localeStringResourceService;
            this.gdprService = gdprService;
            this.exportManager = exportManager;
            this.chatService = chatService;
        }

        //[HttpGet]
        //[Route("")]
        //// [Authorize(Policy = "AdminOnly")]
        //public async Task<IActionResult> GetDataForGrid([FromQuery] UsersGridFilter filter)
        //{
        //    filter = filter ?? new UsersGridFilter();
        //    var users = await userService.GetDataForGrid(filter);
        //    return Ok(users);
        //}

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllUsers(int pageNumber = 0, int pageSize = 3)
        {
            var filter = new UsersGridFilter
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
            };

            var users = await this.userService.GetAllCustomersAsync(null, null, 0, 0, new int[] { 3, }, null, null, null, null, 0, 0, null, null, null, null, pageNumber, pageSize);

            var model = new List<CustomerModel>();
            foreach (var user in users)
            {
                model.Add(await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user));
            }

            return this.Ok(new
            {
                data = model,
                total = users.TotalCount,
            });
        }

        [HttpGet]
        [Route("who_to_follow")]
        public async Task<IActionResult> GetWhoToFollowUsers(int start = 0, int count = 3)
        {
            var filter = new UsersGridFilter
            {
                PageNumber = start,
                PageSize = count,
            };

            var users = await this.userService.GetWhoToFollowUsers(filter, User.GetUserId(), new int[] { 1, 2, 3, }, false);

            var model = new List<CustomerModel>();
            foreach (var user in users)
            {
                model.Add(await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user));
            }

            return this.Ok(new
            {
                total = users.Count,
                data = model,
            }); ;
        }

        [HttpGet]
        [Route("{id:int}")]
        /*[Authorize(Policy = "AdminOnly")]*/
        public async Task<IActionResult> Get(int id)
        {
            var user = await userService.GetCustomerByIdAsync(id);

            user.StatusesCount = await this.postsService.GetPostsCountByUserId(user.Id);

            return Ok(user);
        }

        [HttpGet]
        [Route("current")]
        public async Task<IActionResult> GetCurrent()
        {
            var currentUserId = User.GetUserId();
            if (currentUserId > 0)
            {
                var user = await userService.GetCustomerByIdAsync(currentUserId);

                var model = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user);

                if (model == null)
                {
                    return this.BadRequest();
                }

                model.UnreadPrivateMessages = await GetUnreadPrivateMessagesAsync();
                return this.Ok(model);
            }

            return this.Ok();
        }

        [HttpPost]
        [Route("")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Create(UserDTO userDto)
        {
            if (userDto.Id != 0)
            {
                return BadRequest();
            }

            // var result = await userService.Edit(userDto);
            return Ok(new object());
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Edit(int id, UserDTO userDto)
        {
            if (id != userDto.Id)
            {
                return BadRequest();
            }

            // var result = await userService.Edit(userDto);
            return Ok(new object());
        }

        [HttpPut]
        [Route("current")]
        public async Task<IActionResult> EditCurrent(UserDTO userDto)
        {
            var currentUserId = User.GetUserId();
            if (currentUserId != userDto.Id)
            {
                return BadRequest();
            }
            // await userService.Edit(userDto);

            var newToken = await authService.GenerateToken(currentUserId);

            return Ok(newToken);
        }

        [HttpPut]
        [Authorize]
        [Route("me/edit-email")]
        public async Task<IActionResult> ChangeEmail([FromBody] EditEmailInputModel input)
        {
            // try to get a customer with the specified id
            var customer = await this.userService.GetCustomerByIdAsync(User.GetUserId());
            if (customer == null || customer.Deleted)
            {
                return this.BadRequest("List");
            }

            //email
            if (!string.IsNullOrWhiteSpace(input.Email))
            {
                await this.customerRegistrationService.SetEmailAsync(customer, input.Email, false);
            }
            else
            {
                customer.Email = input.Email;
            }

            await this.userService.UpdateCustomerAsync(customer);

            var newToken = await authService.GenerateToken(customer.Id); // hmm

            return this.Ok(newToken);
        }

        [HttpDelete]
        [Route("me/delete")]
        public async Task<IActionResult> Delete()
        {
            var myId = User.GetUserId();

            // try to get a customer with the specified id
            var customer = await this.userService.GetCustomerByIdAsync(myId);
            if (customer == null)
            {
                return this.BadRequest("List");
            }

            try
            {
                //  attempts to delete the user, if it is the last active administrator
                if (await this.userService.IsAdminAsync(customer) && !await SecondAdminAccountExistsAsync(customer))
                {
                    // _notificationService.ErrorNotification(await _localizationService.GetResourceAsync("Admin.Customers.Customers.AdminAccountShouldExists.DeleteAdministrator"));
                    return RedirectToAction("Edit", new { id = customer.Id });
                }

                var currentUserId = User.GetUserId();
                var userCurrent = await userService.GetCustomerByIdAsync(currentUserId);

                // ensure that the current customer cannot delete "Administrators" if he's not an admin himself
                if (await this.userService.IsAdminAsync(customer) && !await this.userService.IsAdminAsync(userCurrent))
                {
                    // _notificationService.ErrorNotification(await _localizationService.GetResourceAsync("Admin.Customers.Customers.OnlyAdminCanDeleteAdmin"));
                    return RedirectToAction("Edit", new { id = customer.Id });
                }

                // delete
                await this.userService.DeleteCustomerAsync(customer);

                //// remove newsletter subscription (if exists)
                //foreach (var store in await _storeService.GetAllStoresAsync())
                //{
                //    var subscription = await _newsLetterSubscriptionService.GetNewsLetterSubscriptionByEmailAndStoreIdAsync(customer.Email, store.Id);
                //    if (subscription != null)
                //        await _newsLetterSubscriptionService.DeleteNewsLetterSubscriptionAsync(subscription);
                //}

                // activity log
                await _customerActivityService.InsertActivityAsync("DeleteCustomer", string.Format("Deleted a customer (ID = {0})", customer.Id), customer);

                // _notificationService.SuccessNotification(await _localizationService.GetResourceAsync("Admin.Customers.Customers.Deleted"));

                return this.NoContent();
            }
            catch (Exception exc)
            {
                return this.BadRequest(exc.Message);
            }
        }

        //[HttpGet]
        //[Route("{userId:int}/photo")]
        //[AllowAnonymous]
        //public async Task<IActionResult> UserPhoto(int userId, string token)
        //{
        //    var user = jwtManager.GetPrincipal(token);
        //    if (user == null || !user.Identity.IsAuthenticated)
        //    {
        //        return Unauthorized();
        //    }

        //    var photoContent = await userService.GetUserPhoto(userId);

        //    if (photoContent == null)
        //    {
        //        return NoContent();
        //    }

        //    return File(photoContent, contentType: "image/png");
        //}

        [HttpPost]
        [Route("avatar")]
        public async Task<IActionResult> UploadAvatar()
        {
            //var user = jwtManager.GetPrincipal(token);
            //if (user == null || !user.Identity.IsAuthenticated)
            //{
            //    return Unauthorized();
            //}

            var currentUserId = User.GetUserId();
            var customer = await userService.GetCustomerByIdAsync(currentUserId);

            if (!await userService.IsRegisteredAsync(customer))
            {
                return Challenge();
            }

            var uploadedFile = this.Request.Form.Files.FirstOrDefault();

            if (ModelState.IsValid)
            {
                try
                {
                    var customerAvatar = await this.pictureService.GetPictureByIdAsync(await this.genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.AvatarPictureIdAttribute));
                    if (uploadedFile != null && !string.IsNullOrEmpty(uploadedFile.FileName))
                    {
                        var avatarMaxSize = 1024 * 1024 * 2;
                        if (uploadedFile.Length > avatarMaxSize)
                        {
                            this.BadRequest("throw new NopException(string.Format(await _localizationService.GetResourceAsync('Account.Avatar.MaximumUploadedFileSize'), avatarMaxSize));");
                        }

                        var customerPictureBinary = await this.GetDownloadBitsAsync(uploadedFile);
                        customerAvatar = await this.pictureService.InsertPictureAsync(customerPictureBinary, uploadedFile.ContentType, null);

                        var customerAvatarId = 0;
                        if (customerAvatar != null)
                        {
                            customerAvatarId = customerAvatar.Id;
                        }

                        await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.AvatarPictureIdAttribute, customerAvatarId);

                        var avatarUrl = await this.pictureService.GetPictureUrlAsync(customerAvatar.Id, 400, false);

                        return this.Ok(new { url = ChessbookConstants.SiteHttps + avatarUrl });

                    }


                }
                catch (Exception exc)
                {
                    ModelState.AddModelError("", exc.Message);
                }
            }

            // If we got this far, something failed, redisplay form
            return this.BadRequest();
        }

        [HttpPost]
        [Route("banner")]
        public async Task<IActionResult> UploadBanner()
        {
            //var user = jwtManager.GetPrincipal(token);
            //if (user == null || !user.Identity.IsAuthenticated)
            //{
            //    return Unauthorized();
            //}

            var currentUserId = User.GetUserId();
            var customer = await userService.GetCustomerByIdAsync(currentUserId);

            if (!await userService.IsRegisteredAsync(customer))
            {
                return Challenge();
            }

            var uploadedFile = this.Request.Form.Files.FirstOrDefault();

            if (ModelState.IsValid)
            {
                try
                {
                    var customerBanner = await this.pictureService.GetPictureByIdAsync(await this.genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.ProfileBannerIdAttribute));
                    if (uploadedFile != null && !string.IsNullOrEmpty(uploadedFile.FileName))
                    {
                        var bannerMaxSize = 1024 * 1024 * 5;
                        if (uploadedFile.Length > bannerMaxSize)
                        {
                            this.BadRequest("throw new NopException(string.Format(await _localizationService.GetResourceAsync('Account.Avatar.MaximumUploadedFileSize'), avatarMaxSize));");
                        }

                        var customerPictureBinary = await this.GetDownloadBitsAsync(uploadedFile);
                        customerBanner = await this.pictureService.InsertPictureAsync(customerPictureBinary, uploadedFile.ContentType, null);

                        var customerBannerId = 0;
                        if (customerBanner != null)
                        {
                            customerBannerId = customerBanner.Id;
                        }

                        await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.ProfileBannerIdAttribute, customerBannerId);

                        var profileBannerUrl = await this.pictureService.GetPictureUrlAsync(customerBanner.Id, 1500, true, defaultPictureType: PictureType.Banner);

                        return this.Ok(new { url = ChessbookConstants.SiteHttps + profileBannerUrl });

                    }
                }
                catch (Exception exc)
                {
                    ModelState.AddModelError("", exc.Message);
                }
            }

            // If we got this far, something failed, redisplay form
            return this.BadRequest();
        }

        /// <summary>
        /// Gets the download binary array
        /// </summary>
        /// <param name="file">File</param>
        /// <returns>Download binary array</returns>
        public virtual async Task<byte[]> GetDownloadBitsAsync(IFormFile file)
        {
            await using var fileStream = file.OpenReadStream();
            await using var ms = new MemoryStream();
            await fileStream.CopyToAsync(ms);
            var fileBytes = ms.ToArray();

            return fileBytes;
        }

        [HttpGet]
        [Route("me/posts/{postId:int}/rating")]
        [Authorize]
        public async Task<IActionResult> GetUserPostRating(int postId)
        {
            var currentUserId = User.GetUserId();
            var user = await this.userService.GetCustomerByIdAsync(currentUserId);
            var postVote = await this.postsService.GetPostVoteAsync(postId, user);

            if (postVote == null)
            {
                return this.Ok(new PostRateModel { Type = postVote.Type });
            }

            return this.Ok(new PostRateModel { Type = postVote.Type });
        }

        [HttpGet]
        [Route("profile/{screenName:length(3,32)}")] // WTF...
        public async Task<IActionResult> GetProfile(string screenName)
        {
            if (!screenName.StartsWith('@'))
            {
                screenName = "@" + screenName;
            }

            var user = await this.userService.GetCustomerByUsernameAsync(screenName);

            if (user == null)
            {
                return this.NotFound();
            }

            var model = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user);

            return this.Ok(model);
        }

        [HttpPut]
        [Route("personal")]
        public async Task<IActionResult> PostEditPersonalDetails([FromBody] EditPersonalDetailsInputModel input)
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            var currentUserId = User.GetUserId();
            var customer = await userService.GetCustomerByIdAsync(currentUserId);

            customer.Description = input.Description;
            customer.DisplayName = input.DisplayName;

            // social pages
            customer.WebsiteLink = input.WebsiteLink;
            customer.TwitterLink = input.TwitterLink;
            customer.TwitchLink = input.TwitchLink;
            customer.YoutubeLink = input.YoutubeLink;
            customer.FacebookLink = input.FacebookLink;

            await this.userService.UpdateCustomerAsync(customer);

            await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.GenderAttribute, input.Gender);

            await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.TimeZoneIdAttribute, input.TimeZoneId);

            await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.CountryIdAttribute, input.CountryId);

            var dateOfBirth = input.ParseDateOfBirth();
            await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.DateOfBirthAttribute, dateOfBirth);

            var newToken = await authService.GenerateToken(currentUserId);

            return Ok(newToken);
        }

        [HttpGet]
        [Route("birthday/{id:int}")]
        public async Task<IActionResult> GetYourBirthday(int id)
        {
            var currentUserId = User.GetUserId();

            if (currentUserId != id)
            {
                this.Unauthorized("Sorry hacker. Not this time 😎");
            }

            var customer = await userService.GetCustomerByIdAsync(currentUserId);

            var model = new GetYourBirthdayDTO();

            var dateOfBirth = await this.genericAttributeService.GetAttributeAsync<DateTime?>(customer, NopCustomerDefaults.DateOfBirthAttribute);
            if (dateOfBirth.HasValue)
            {
                model.DateOfBirthMonth = dateOfBirth.Value.Month;
                model.DateOfBirthDay = dateOfBirth.Value.Day;
                model.DateOfBirthYear = dateOfBirth.Value.Year;
            }

            var gender = await this.genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.GenderAttribute);

            model.Gender = gender;

            return this.Ok(model);
        }

        [Authorize]
        [HttpGet]
        [Route("me/notifications")]
        public async Task<IActionResult> GetUnreadNotifications([FromQuery] QueryGetMyNotifications input)
        {
            var notifications = await this.notificationsService.List(User.GetUserId(), input.Start, input.Count, input.Sort, input.Unread);

            if (notifications.Count > 0)
            {
                var models = await notifications.SelectAwait(async notification =>
                {
                    var notificationModel = await this.userNotificationModelFactory.PrepareUserNotificationModelAsync(notification);

                    return notificationModel;
                }).ToListAsync();

                return this.Ok(new
                {
                    data = models,
                    total = notifications.TotalCount,
                });
            }

            return this.Ok(new
            {
                data = notifications,
                total = notifications.TotalCount,
            });
        }

        [HttpPost]
        [Authorize]
        [Route("me/notifications/read-all")]
        public async Task<IActionResult> ReadAll()
        {
            var userId = User.GetUserId();

            await this.notificationsService.ReadAll(userId);

            return this.NoContent();
        }

        [HttpPost]
        [Authorize]
        [Route("me/notifications/clear-all")]
        public async Task<IActionResult> ClearAll()
        {
            var userId = User.GetUserId();

            await this.notificationsService.ClearAll(userId);

            return this.NoContent();
        }

        [HttpPut]
        [Route("me/notification-settings")]
        [Authorize]
        public async Task<IActionResult> UpdateNotificationSettings([FromBody] UserNotificationSettingModel body)
        {
            var userNotificationSettings = await this.notificationsSettingsService.GetByUserId(User.GetUserId());

            if (userNotificationSettings == null)
            {
                return this.NotFound();
            }

            userNotificationSettings.AbuseAsModerator = body.AbuseAsModerator;
            userNotificationSettings.AbuseNewMessage = body.AbuseNewMessage;
            userNotificationSettings.AbuseStateChange = body.AbuseStateChange;
            userNotificationSettings.BlacklistOnMyVideo = body.BlacklistOnMyVideo;
            userNotificationSettings.CommentMention = body.CommentMention;
            userNotificationSettings.NewCommentOnMyVideo = body.NewCommentOnMyVideo;
            userNotificationSettings.NewFollow = body.NewFollow;
            userNotificationSettings.NewVideoFromSubscription = body.NewVideoFromSubscription;

            await this.notificationsSettingsService.UpdateUserNotificationSettingModelAsync(userNotificationSettings);

            return this.NoContent();
        }

        [HttpGet]
        [Route("me/abuses")]
        [Authorize]
        public async Task<IActionResult> ListMyAbuses([FromQuery] QueryGetInputModel input)
        {
            var abuses = await this.abuseService.ListMyAbuses(input.Start, input.Count, input.Sort, input.Id, input.Search, input.AbuseState);

            if (abuses.TotalCount > 0)
            {
                var models = new List<AbuseModel>();
                foreach (var abuse in abuses)
                {
                    models.Add(await this.abuseModelFactory.PrepareAbuseModel(abuse));
                }

                return this.Ok(new
                {
                    data = models,
                    total = abuses.TotalCount,
                });
            }

            return this.Ok(new
            {
                total = abuses.TotalCount,
                data = abuses,
            });
        }

        [HttpGet]
        [Route("following/{screenName:length(3,32)}")]
        public async Task<IActionResult> ListUserFollowing(string screenName, [FromQuery] QueryListFollowingOrFollowersInput input)
        {
            if (!screenName.StartsWith('@'))
            {
                screenName = "@" + screenName;
            }

            var user = await this.userService.GetCustomerByUsernameAsync(screenName);

            if (user == null)
            {
                return this.BadRequest("Bro, why do you try to break (or hack 😲) my website? :( No such user found!");
            }

            var users = await this.followService.ListUserFollowing(user.Id, input.Start, input.Count, input.Following);

            var models = new List<CustomerModel>();
            foreach (var userCurrent in users)
            {
                models.Add(await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), userCurrent));
            }

            return this.Ok(new
            {
                total = users.Count,
                data = models,
            });
        }


        [HttpGet]
        [Route("me/blocklist/accounts")]
        [Authorize]
        public async Task<IActionResult> GetBlockListAccounts([FromQuery] QueryGetInputModel input)
        {
            var blockedAccounts = await this.blocklistService.GetUserBlocklistAccounts(input.Start, input.Count, input.Sort, User.GetUserId(), input.Search);

            if (blockedAccounts == null)
            {
                return this.NoContent();
            }

            var models = new List<UserBlocklistModel>();
            foreach (var blockedAccount in blockedAccounts)
            {
                models.Add(await this.userBlocklistFactory.PrepareUserBlocklistModel(blockedAccount));
            }

            if (input.Search != null)
            {
                models = models.Where(b => b.BlockedAccount.ScreenName.Contains(input.Search)).ToList();
            }

            return this.Ok(new
            {
                total = blockedAccounts.Count,
                data = models,
            });
        }

        [HttpPost]
        [Route("me/blocklist/accounts")]
        [Authorize]
        public async Task<IActionResult> PostBlockListAccounts([FromBody] ScreenNameBody body)
        {
            if (body == null)
            {
                return this.BadRequest();
            }

            await this.blocklistService.Block(User.GetUserId(), body.ScreenName);

            return this.NoContent();
        }

        [HttpDelete]
        [Route("me/blocklist/accounts/{screenName:length(3,32)}")]
        [Authorize]
        public async Task<IActionResult> DeleteBlockListAccounts(string screenName)
        {
            if (screenName == null)
            {
                return this.BadRequest();
            }

            await this.blocklistService.UnBlock(User.GetUserId(), screenName);

            return this.NoContent();
        }

        [HttpGet]
        [Route("user-photo/{id:int}")]
        public async Task<IActionResult> GetBannerForZoom(int id, [FromQuery] string bannerOrAvatar) // userId
        {
            var userCurrent = await this.userService.GetCustomerByIdAsync(id);

            string attr;
            int imgSize = 0;
            PictureType picType;
            if (bannerOrAvatar == "banner")
            {
                attr = NopCustomerDefaults.ProfileBannerIdAttribute;
                imgSize = 1500;
                picType = PictureType.Banner;
            }
            else
            {
                attr = NopCustomerDefaults.AvatarPictureIdAttribute;
                imgSize = 400;
                picType = PictureType.Avatar;
            }

            var profileBannerOrAvatarPictureId = await this.genericAttributeService.GetAttributeAsync<int>(userCurrent, attr);
            var defaultPicture = await this.pictureService.GetPictureByIdAsync(profileBannerOrAvatarPictureId);

            string fullSizeImageUrl, imageUrl, thumbImageUrl;
            (imageUrl, defaultPicture) = await this.pictureService.GetPictureUrlAsync(defaultPicture, imgSize, true, defaultPictureType: picType);

            // TODO: you know what to do kk
            using var image = SKBitmap.Decode(@"C:\Users\volen\OneDrive\Desktop\Chessbook\Server\src\Web\Chessbook.WebApi\wwwroot" + imageUrl);

            var defaultPictureModel = new PictureModel
            {
                ImageUrl = ChessbookConstants.SiteHttps + imageUrl,
                FullSizeImageUrl = ChessbookConstants.SiteHttps + imageUrl,
                Blurhash = defaultPicture.Blurhash,
                Meta = new Dictionary<string, MediaEntitySizeModel>
                        {
                            { "original", new MediaEntitySizeModel
                                {
                                 Width = image.Width,
                                 Height = image.Height,
                                 Size = image.Width + "x" + image.Height,
                                 Aspect = (double) image.Width / image.Height
                                }
                            },
                        }
            };

            return this.Ok(defaultPictureModel);
        }

        // I can't believe I wrote this.. It is sooo wrong and sooo cool at the same time xD 9/6/2021, Monday | Warm summer nights • instrumental hip hop - chillhop - lofi hip hop mix
        [HttpGet]
        [Route("utc-stuff")]
        public async Task<IActionResult> FetchUtcStuff()
        {
            var customer = await this.workContext.GetCurrentCustomerAsync();

            // prepare available countries
            var countriesModel = new List<CountryUtcModel>();
            var availableCountries = await this.countryService.GetAllCountriesAsync(showHidden: true);
            foreach (var country in availableCountries)
            {
                countriesModel.Add(new CountryUtcModel { Value = country.Id.ToString(), Text = country.Name });
            }

            var countryId = await this.genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.CountryIdAttribute);
            var countryText = countriesModel.FirstOrDefault(c => int.Parse(c.Value) == countryId)?.Text;

            if (countryText != null)
            {
                await this.PrepareDefaultItemAsync(countriesModel, true, countryText, countryId.ToString());

            }

            // prepare available time zones
            var availableTimeZones = this.dateTimeHelper.GetSystemTimeZones();
            var timeZonesModel = new List<TimeZoneUtcModel>();
            foreach (var timeZone in availableTimeZones)
            {
                timeZonesModel.Add(new TimeZoneUtcModel { Value = timeZone.Id, Text = timeZone.DisplayName });
            }

            var timeZoneId = await this.genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.TimeZoneIdAttribute);
            var text = timeZoneId != null ? timeZonesModel.FirstOrDefault(tz => tz.Value == timeZoneId)?.Text : null;

            if (text == null)
            {
                var defaultTimeZone = this.dateTimeHelper.DefaultStoreTimeZone;
                timeZoneId = defaultTimeZone.Id;
                text = defaultTimeZone.DisplayName;
            }

            await this.PrepareDefaultItemAsync(timeZonesModel, true, text, timeZoneId);

            var model = new UtcStuffModel
            {
                Countries = countriesModel,
                TimeZones = timeZonesModel,
            };

            return this.Ok(model);
        }

        [HttpPost, ActionName("GdprTools")]
        [Route("gdpr-tools")]
        [Authorize]
        public async Task<IActionResult> GdprToolsExport()
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return Challenge();
            }

            // log
            await this.gdprService.InsertLogAsync(await this.workContext.GetCurrentCustomerAsync(), 0, GdprRequestType.ExportData, "Exported personal data");
                
            // export
            var bytes = await this.exportManager.ExportCustomerGdprInfoToXlsxAsync(await this.workContext.GetCurrentCustomerAsync(), 1);

            return File(bytes, MimeTypes.TextXlsx, "customerdata.xlsx");
        }

        [HttpPost, ActionName("GdprTools")]
        [Route("delete-account")]
        public virtual async Task<IActionResult> GdprDelete(int id)
        {
            // try to get a customer with the specified id
            var customer = await this.userService.GetCustomerByIdAsync(id);
            if (customer == null)
            {
                return this.NotFound();
            }
            try
            {  
                // prevent attempts to delete the user, if it is the last active administrator
                if (await this.userService.IsAdminAsync(customer) && !await SecondAdminAccountExistsAsync(customer))
                {
                    return this.BadRequest();
                }

                if (customer.Id != (await this.workContext.GetCurrentCustomerAsync()).Id && !await this.userService.IsAdminAsync(await this.workContext.GetCurrentCustomerAsync()))
                {
                    return this.Unauthorized();
                }

                // delete
                await this.gdprService.PermanentDeleteCustomerAsync(customer);

                // activity log
                await _customerActivityService.InsertActivityAsync("DeleteCustomer", string.Format("ActivityLog.DeleteCustomer", customer.Id), customer);

                return this.NoContent();
            }
            catch (Exception exc)
            {
                return this.BadRequest(exc.Message);

                //_notificationService.ErrorNotification(exc.Message);
                //return RedirectToAction("Edit", new { id = customer.Id });
            }
        }

        /// <summary>
        /// Prepare default item
        /// </summary>
        /// <param name="items">Available items</param>
        /// <param name="withSpecialDefaultItem">Whether to insert the first special item for the default value</param>
        /// <param name="defaultItemText">Default item text; pass null to use "All" text</param>
        /// <param name="defaultItemValue">Default item value; defaults 0</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        private async Task PrepareDefaultItemAsync(IList<CountryUtcModel> items, bool withSpecialDefaultItem, string defaultItemText = null, string defaultItemValue = "0")
        {
            if (items == null)
            {
                throw new ArgumentNullException(nameof(items));
            }

            // whether to insert the first special item for the default value
            if (!withSpecialDefaultItem)
            {
                return;
            }

            // prepare item text
            defaultItemText ??= await this.localeStringResourceService.GetResourceAsync("Admin.Common.All");

            // insert this default item at first
            items.Insert(0, new CountryUtcModel { Text = defaultItemText, Value = defaultItemValue });
        }
        private async Task PrepareDefaultItemAsync(IList<TimeZoneUtcModel> items, bool withSpecialDefaultItem, string defaultItemText = null, string defaultItemValue = "0")
        {
            if (items == null)
            {
                throw new ArgumentNullException(nameof(items));
            }

            // whether to insert the first special item for the default value
            if (!withSpecialDefaultItem)
            {
                return;
            }

            // prepare item text
            defaultItemText ??= await this.localeStringResourceService.GetResourceAsync("Admin.Common.All");

            // insert this default item at first
            items.Insert(0, new TimeZoneUtcModel { Text = defaultItemText, Value = defaultItemValue });
        }

        private async Task<bool> SecondAdminAccountExistsAsync(Customer customer)
        {
            var customers = await this.userService.GetAllCustomersAsync(customerRoleIds: new[] { (await this.userService.GetCustomerRoleBySystemNameAsync(NopCustomerDefaults.AdministratorsRoleName)).Id });

            return customers.Any(c => c.Active && c.Id != customer.Id);
        }

        /// <summary>
        /// Get the number of unread private messages
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the number of private messages
        /// </returns>
        private async Task<int> GetUnreadPrivateMessagesAsync()
        {
            var result = 0;
            var customer = await this.workContext.GetCurrentCustomerAsync();
            if (!await this.userService.IsGuestAsync(customer))
            {
                var privateMessages = await this.chatService.GetAllPrivateMessagesAsync(1, 0, customer.Id, false, false, false, string.Empty, 0, 1);

                if (privateMessages.TotalCount > 0)
                {
                    result = privateMessages.TotalCount;
                }
            }

            return result;
        }
    }


    public class GetProfileInputQueryModel
    {
        [BindProperty(Name = "screen_name")]
        public string ScreenName { get; set; }
    }
}
