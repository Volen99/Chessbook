﻿namespace Chessbook.Web.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Services.Logging;
    using Chessbook.Core.Domain.Notifications;
    using Chessbook.Services.Notifications.Settings;
    using Chessbook.Web.Models.AuthDTO;
    using Chessbook.Services.Customers;
    using Chessbook.Core.Domain.Customers;
    using Chessbook.Core;
    using Chessbook.Services;
    using Chessbook.Services.Localization;
    using Chessbook.Data.Models;

    [Route("auth")]
    public class AuthController : BaseApiController
    {
        protected readonly JwtManager jwtManager;
        private readonly CustomerSettings customerSettings;
        private readonly ICustomerRegistrationService customerRegistrationService;
        private readonly IUserService userService;
        private readonly ILocaleStringResourceService localeStringResourceService;
        private readonly ICustomerActivityService customerActivityService;
        private readonly INotificationsSettingsService notificationsSettingsService;
        private readonly IWorkContext workContext;

        public AuthController(JwtManager jwtManager, ICustomerRegistrationService customerRegistrationService, IUserService customerService,
            ILocaleStringResourceService localeStringResourceService, ICustomerActivityService customerActivityService,
            CustomerSettings customerSettings, INotificationsSettingsService notificationsSettingsService,
            IWorkContext workContext)
        {
            this.jwtManager = jwtManager;
            this.customerSettings = customerSettings;
            this.customerRegistrationService = customerRegistrationService;
            this.userService = customerService;
            this.localeStringResourceService = localeStringResourceService;
            this.customerActivityService = customerActivityService;
            this.notificationsSettingsService = notificationsSettingsService;
            this.workContext = workContext;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDTO loginDto)
        {
            var customerEmail = loginDto.Email?.Trim();

            var loginResult = await this.customerRegistrationService.ValidateCustomerAsync(customerEmail, loginDto.Password);
            switch (loginResult)
            {
                case CustomerLoginResults.Successful:
                    {
                        var customer = await this.userService.GetCustomerByEmailAsync(customerEmail);

                        var token = await this.customerRegistrationService.SignInCustomerAsync(customer, null, loginDto.RememberMe);

                        return Ok(new { token = token.Data });
                    }
                case CustomerLoginResults.CustomerNotExist:
                    ModelState.AddModelError("", await this.localeStringResourceService.GetResourceAsync("Account.Login.WrongCredentials.CustomerNotExist"));
                    break;
                case CustomerLoginResults.Deleted:
                    ModelState.AddModelError("", await this.localeStringResourceService.GetResourceAsync("Account.Login.WrongCredentials.Deleted"));
                    break;
                case CustomerLoginResults.NotActive:
                    ModelState.AddModelError("", await this.localeStringResourceService.GetResourceAsync("Account.Login.WrongCredentials.NotActive"));
                    break;
                case CustomerLoginResults.NotRegistered:
                    ModelState.AddModelError("", await this.localeStringResourceService.GetResourceAsync("Account.Login.WrongCredentials.NotRegistered"));
                    break;
                case CustomerLoginResults.LockedOut:
                    ModelState.AddModelError("", await this.localeStringResourceService.GetResourceAsync("Account.Login.WrongCredentials.LockedOut"));
                    break;
                case CustomerLoginResults.WrongPassword:
                default:
                    ModelState.AddModelError("", await this.localeStringResourceService.GetResourceAsync("Account.Login.WrongCredentials"));
                    break;
            }

            return BadRequest();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp(SignUpDTO signUpDto)
        {
            if (!string.IsNullOrWhiteSpace(signUpDto.Email) && await this.userService.GetCustomerByEmailAsync(signUpDto.Email) != null)
            {
                ModelState.AddModelError(string.Empty, "Email is already registered");
            }

            if (!string.IsNullOrWhiteSpace(signUpDto.Username) && await this.userService.GetCustomerByUsernameAsync(signUpDto.Username) != null)
            {
                ModelState.AddModelError(string.Empty, "Username is already registered");
            }

            if (signUpDto == null ||
               string.IsNullOrEmpty(signUpDto.Email) ||
               string.IsNullOrEmpty(signUpDto.Password) ||
               string.IsNullOrEmpty(signUpDto.ConfirmPassword) ||
               string.IsNullOrEmpty(signUpDto.DisplayName) ||
               string.IsNullOrEmpty(signUpDto.Username) ||
               signUpDto.Password != signUpDto.ConfirmPassword)
            {
                return this.BadRequest();
            }

            var newUser = new Customer
            {
                DisplayName = signUpDto.DisplayName,
                ScreenName = "@" + signUpDto.Username,
                Email = signUpDto.Email,
                CustomerGuid = Guid.NewGuid(),
                CreatedOn = DateTime.UtcNow,
                LastActivityDateUtc = DateTime.UtcNow,
                Active = true,
            };


            await this.userService.InsertCustomerAsync(newUser);

            // notifications settings
            var settings = new UserNotificationSettingModel
            {
                CustomerId = newUser.Id,
                AbuseAsModerator = UserNotificationSettingValue.EMAIL,
                AbuseNewMessage = UserNotificationSettingValue.EMAIL,
                AbuseStateChange = UserNotificationSettingValue.EMAIL,
                BlacklistOnMyVideo = UserNotificationSettingValue.EMAIL,
                CommentMention = UserNotificationSettingValue.WEB,
                NewCommentOnMyVideo = UserNotificationSettingValue.WEB,
                NewFollow = UserNotificationSettingValue.WEB,
                NewVideoFromSubscription = UserNotificationSettingValue.WEB,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            await this.notificationsSettingsService.CreateAsync(settings);

            //// form fields
            //if (_dateTimeSettings.AllowCustomersToSetTimeZone)
            //    await _genericAttributeService.SaveAttributeAsync(newUser, NopCustomerDefaults.TimeZoneIdAttribute, signUpDto.TimeZoneId);
            //if (true)
            //    await _genericAttributeService.SaveAttributeAsync(newUser, NopCustomerDefaults.GenderAttribute, signUpDto.Gender);
            //if (true)
            //    await _genericAttributeService.SaveAttributeAsync(newUser, NopCustomerDefaults.DateOfBirthAttribute, signUpDto.DateOfBirth);
            //if (true)
            //    await _genericAttributeService.SaveAttributeAsync(newUser, NopCustomerDefaults.CityAttribute, signUpDto.City);
            //if (true)
            //    await _genericAttributeService.SaveAttributeAsync(newUser, NopCustomerDefaults.CountyAttribute, signUpDto.County);
            //if (true)
            //    await _genericAttributeService.SaveAttributeAsync(newUser, NopCustomerDefaults.CountryIdAttribute, signUpDto.CountryId);
            //if (true && true)
            //    await _genericAttributeService.SaveAttributeAsync(newUser, NopCustomerDefaults.StateProvinceIdAttribute, signUpDto.StateProvinceId);

            //validate customer roles
            var allCustomerRoles = await this.userService.GetAllCustomerRolesAsync(true);
            var newCustomerRoles = new List<CustomerRole>();
            foreach (var customerRole in allCustomerRoles)
                if (customerRole.Id == 3)
                    newCustomerRoles.Add(customerRole);
            var customerRolesError = await ValidateCustomerRolesAsync(newCustomerRoles, new List<CustomerRole>());
            if (!string.IsNullOrEmpty(customerRolesError))
            {
                //ModelState.AddModelError(string.Empty, customerRolesError);
                //_notificationService.ErrorNotification(customerRolesError);
            }

            // Ensure that valid email address is entered if Registered role is checked to avoid registered customers with empty email address
            if (newCustomerRoles.Any() && newCustomerRoles.FirstOrDefault(c => c.SystemName == NopCustomerDefaults.RegisteredRoleName) != null &&
                !CommonHelper.IsValidEmail(newUser.Email))
            {
                ModelState.AddModelError(string.Empty, await this.localeStringResourceService.GetResourceAsync("Admin.Customers.Customers.ValidEmailRequiredRegisteredRole"));

                // _notificationService.ErrorNotification(await this.localeStringResourceService.GetResourceAsync("Admin.Customers.Customers.ValidEmailRequiredRegisteredRole"));
            }

            // custom customer attributes
            // await _genericAttributeService.SaveAttributeAsync(newUser, NopCustomerDefaults.CustomCustomerAttributes, customerAttributesXml);

            //password
            if (!string.IsNullOrWhiteSpace(signUpDto.Password))
            {
                var changePassRequest = new ChangePasswordRequest(signUpDto.Email, false, this.customerSettings.DefaultPasswordFormat, signUpDto.Password);
                var changePassResult = await this.customerRegistrationService.ChangePasswordAsync(changePassRequest);
                if (!changePassResult.Success)
                {
                    foreach (var changePassError in changePassResult.Errors)
                    {
                        // _notificationService.ErrorNotification(changePassError);
                    }
                }
            }

            //customer roles
            foreach (var customerRole in newCustomerRoles)
            {
                // ensure that the current customer cannot add to "Administrators" system role if he's not an admin himself
                if (customerRole.SystemName == NopCustomerDefaults.AdministratorsRoleName && !await this.userService.IsAdminAsync(await this.workContext.GetCurrentCustomerAsync()))
                {
                    continue;
                }

                await this.userService.AddCustomerRoleMappingAsync(new CustomerCustomerRoleMapping { CustomerId = newUser.Id, CustomerRoleId = customerRole.Id });
            }

            await this.userService.UpdateCustomerAsync(newUser);

            // activity log
            await this.customerActivityService.InsertActivityAsync("AddNewCustomer", string.Format(await this.localeStringResourceService.GetResourceAsync("ActivityLog.AddNewCustomer"), newUser.Id), newUser);
            // _notificationService.SuccessNotification(await this.localeStringResourceService.GetResourceAsync("Admin.Customers.Customers.Added"));

            var token = jwtManager.GenerateToken(newUser);

            return Ok(new { token });
        }

        //[HttpPost]
        //[AllowAnonymous]
        //[Route("request-pass")]
        //public async Task<IActionResult> RequestPassword(RequestPasswordDTO requestPasswordDto)
        //{
        //    var result = await authService.RequestPassword(requestPasswordDto);

        //    if (result.Succeeded)
        //        return Ok(new { result.Data, Description = "Reset Token should be sent via Email. Token in response - just for testing purpose." });

        //    return BadRequest();
        //}

        //[HttpPost]
        //[AllowAnonymous]
        //[Route("restore-pass")]
        //public async Task<IActionResult> RestorePassword(RestorePasswordDTO restorePasswordDto)
        //{
        //    var result = await authService.RestorePassword(restorePasswordDto);

        //    if (result.Succeeded)
        //        return Ok(new { token = result.Data });

        //    return BadRequest();
        //}

        [HttpPost]
        [Authorize]
        [Route("sign-out")]
        public async Task<IActionResult> SignOut()
        {
            await Task.FromResult(true);
            return Ok();
        }

        //[HttpPost]
        //[AllowAnonymous]
        //[Route("refresh-token")]
        //public async Task<IActionResult> RefreshToken(RefreshTokenDTO refreshTokenDTO)
        //{
        //    var result = await authService.RefreshToken(refreshTokenDTO);

        //    if (result.Succeeded)
        //        return Ok(new { token = result.Data });

        //    return BadRequest();
        //}

        /// <returns>A task that represents the asynchronous operation</returns>
        protected virtual async Task<string> ValidateCustomerRolesAsync(IList<CustomerRole> customerRoles, IList<CustomerRole> existingCustomerRoles)
        {
            if (customerRoles == null)
            {
                throw new ArgumentNullException(nameof(customerRoles));
            }

            if (existingCustomerRoles == null)
            {
                throw new ArgumentNullException(nameof(existingCustomerRoles));
            }

            //// check ACL permission to manage customer roles
            //var rolesToAdd = customerRoles.Except(existingCustomerRoles);
            //var rolesToDelete = existingCustomerRoles.Except(customerRoles);
            //if (rolesToAdd.Any(role => role.SystemName != NopCustomerDefaults.RegisteredRoleName) || rolesToDelete.Any())
            //{
            //    if (!await _permissionService.AuthorizeAsync(StandardPermissionProvider.ManageAcl))
            //        return await this.localeStringResourceService.GetResourceAsync("Admin.Customers.Customers.CustomerRolesManagingError");
            //}

            // ensure a customer is not added to both 'Guests' and 'Registered' customer roles
            // ensure that a customer is in at least one required role ('Guests' and 'Registered')
            var isInGuestsRole = customerRoles.FirstOrDefault(cr => cr.SystemName == NopCustomerDefaults.GuestsRoleName) != null;
            var isInRegisteredRole = customerRoles.FirstOrDefault(cr => cr.SystemName == NopCustomerDefaults.RegisteredRoleName) != null;
            if (isInGuestsRole && isInRegisteredRole)
            {
                return await this.localeStringResourceService.GetResourceAsync("Admin.Customers.Customers.GuestsAndRegisteredRolesError");
            }
            if (!isInGuestsRole && !isInRegisteredRole)
            {
                return await this.localeStringResourceService.GetResourceAsync("Admin.Customers.Customers.AddCustomerToGuestsOrRegisteredRoleError");
            }

            // no errors
            return string.Empty;
        }
    }
}
