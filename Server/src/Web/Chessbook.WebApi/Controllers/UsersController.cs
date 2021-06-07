namespace Chessbook.Web.Api.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Chessbook.Data.Common.Filters;
    using Chessbook.Services.Data.Services;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Web.Api.Identity;
    using Chessbook.Web.Models;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using Chessbook.Services.Data.Services.Media;
    using Microsoft.AspNetCore.Http;
    using System.IO;
    using Nop.Services.Common;
    using System;
    using System.Linq;
    using Chessbook.Common;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Services.Data;
    using Chessbook.Web.Models.Outputs;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Media;
    using Chessbook.Web.Api.Factories;
    using System.Collections.Generic;
    using Chessbook.Core;
    using Nop.Services.Logging;
    using Nop.Web.Areas.Admin.Models.Customers;
    using Chessbook.Services.Authentication;
    using Chessbook.Web.Api.Models.Posts;
    using Chessbook.Services.Notifications;
    using Chessbook.Core.Domain.Notifications;
    using Chessbook.Services.Notifications.Settings;

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

        public UsersController(IUserService userService, JwtManager jwtManager, IAuthenticationService authService, IPostsService postsService,
            IPictureService pictureService, IGenericAttributeService genericAttributeService, IRelationshipService relationshipService, IUserModelFactory userModelFactory,
            ICustomerActivityService customerActivityService, IUserNotificationService notificationsService, INotificationsSettingsService notificationsSettingsService,
            IUserNotificationSettingModelFactory userNotificationSettingModelFactory, IUserNotificationModelFactory userNotificationModelFactory)
        {
            this.userService = userService;
            this.jwtManager = jwtManager;
            this.authService = authService;
            this.postsService = postsService;
            this.pictureService = pictureService;
            this.genericAttributeService = genericAttributeService;
            this.relationshipService = relationshipService;
            this.userModelFactory = userModelFactory;
            _customerActivityService = customerActivityService;
            this.notificationsService = notificationsService;
            this.notificationsSettingsService = notificationsSettingsService;
            this.userNotificationSettingModelFactory = userNotificationSettingModelFactory;
            this.userNotificationModelFactory = userNotificationModelFactory;
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

            var users = await this.userService.GetAllCustomersAsync(null , null, 0, 0, new int[] { 3, }, null, null, null, null, 0, 0, null, null, null, null, pageNumber, pageSize);

            var model = new List<CustomerModel>();
            foreach (var user in users)
            {
                model.Add(await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user));
            }

            return this.Ok(model);
        }

        [HttpGet]
        [Route("who_to_follow")]
        public async Task<IActionResult> GetWhoToFollowUsers(int pageNumber = 0, int pageSize = 3)
        {
            var filter = new UsersGridFilter
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
            };

            var users = await this.userService.GetWhoToFollowUsers(filter, User.GetUserId(), new int[] { 3, }, false);

            var model = new List<CustomerModel>();
            foreach (var user in users)
            {
                model.Add(await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user));
            }

            return this.Ok(model);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Policy = "AdminOnly")]
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

                return this.Ok(model);
            }

            return Unauthorized();
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

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            // try to get a customer with the specified id
            var customer = await this.userService.GetCustomerByIdAsync(id);
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

                return RedirectToAction("List");
            }
            catch (Exception exc)
            {
                // _notificationService.ErrorNotification(exc.Message);
                return RedirectToAction("Edit", new { id = customer.Id });
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

            if (!await userService.IsRegisteredAsync(customer)) {
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
                return this.Ok(new PostRateModel { Type = false });
            }

            return this.Ok(new PostRateModel { Type = postVote.IsUp });
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

            var model = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), user);

            return this.Ok(model);
        }

        [HttpPut]
        [Route("personal")]
        public async Task<IActionResult> PostEditPersonalDetails([FromBody] EditPersonalDetailsInputModel input)
        {
            var currentUserId = User.GetUserId();
            var customer = await userService.GetCustomerByIdAsync(currentUserId);

            if (input.Description != null || input.DisplayName != null)
            {
                customer.Description = input.Description;
                customer.DisplayName = input.DisplayName;

                await this.userService.Update(customer);
            }

            await this.genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.GenderAttribute, input.Gender);

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

        [HttpGet]
        [Route("me/notifications")]
        public async Task<IActionResult> GetUnreadNotifications([FromQuery] QueryGetMyNotifications input)
        {
            var notifications = await this.notificationsService.List(User.GetUserId(), input.Start, input.Count, input.Sort, input.Unread);

            var models = notifications.Select(notification => this.userNotificationModelFactory.PrepareUserNotificationModelAsync(notification).Result).ToList();

            return this.Ok(new
            {
                data = models,
                total = models.Count,
            });
        }

        [HttpPut]
        [Route("me/notification-settings")]
        [Authorize]
        public async Task<IActionResult> UpdateNotificationSettings([FromBody] UserNotificationSettingModel body)
        {
            var userNotificationSettings = await this.notificationsSettingsService.GetByUserId(User.GetUserId());

            userNotificationSettings.AbuseAsModerator = body.AbuseAsModerator;
            userNotificationSettings.AbuseNewMessage = body.AbuseNewMessage;
            userNotificationSettings.AbuseStateChange = body.AbuseStateChange;
            userNotificationSettings.BlacklistOnMyVideo = body.BlacklistOnMyVideo;
            userNotificationSettings.CommentMention = body.CommentMention;
            userNotificationSettings.MyVideoPublished = body.MyVideoPublished;
            userNotificationSettings.NewCommentOnMyVideo = body.NewCommentOnMyVideo;
            userNotificationSettings.NewFollow = body.NewFollow;
            userNotificationSettings.NewUserRegistration = body.NewUserRegistration;
            userNotificationSettings.NewVideoFromSubscription = body.NewVideoFromSubscription;
            userNotificationSettings.VideoAutoBlacklistAsModerator = body.VideoAutoBlacklistAsModerator;

            await this.notificationsSettingsService.UpdateUserNotificationSettingModelAsync(userNotificationSettings);

            return this.NoContent();
        }


        private async Task<bool> SecondAdminAccountExistsAsync(Customer customer)
        {
            var customers = await this.userService.GetAllCustomersAsync(customerRoleIds: new[] { (await this.userService.GetCustomerRoleBySystemNameAsync(NopCustomerDefaults.AdministratorsRoleName)).Id });

            return customers.Any(c => c.Active && c.Id != customer.Id);
        }
    }

   

    public class GetProfileInputQueryModel
    {
        [BindProperty(Name = "screen_name")]
        public string ScreenName { get; set; }
    }
}
