using System;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Data.Models;
using Chessbook.Services;
using Chessbook.Services.Localization;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.AuthDTO;
using Chessbook.Core.Domain.Customers;
using Chessbook.Core.Events;
using Chessbook.Services.Common;
using Chessbook.Services.Customers;
using Chessbook.Services.Logging;
using Chessbook.Services.Security;
using Chessbook.Services.Stores;
using Chessbook.Services.Messages;

namespace Chessbook.Services.Authentication
{
    /// <summary>
    /// Customer registration service
    /// </summary>
    public partial class CustomerRegistrationService : ICustomerRegistrationService
    {
        #region Fields

        private readonly CustomerSettings _customerSettings;
        private readonly IAuthenticationService _authenticationService;
        private readonly ICustomerActivityService _customerActivityService;
        private readonly IUserService _customerService;
        private readonly IEncryptionService _encryptionService;
        private readonly IEventPublisher _eventPublisher;
        private readonly IGenericAttributeService _genericAttributeService;
        private readonly IStoreContext _storeContext;
        private readonly IStoreService _storeService;
        private readonly IWorkContext _workContext;
        private readonly ILocaleStringResourceService localeStringResourceService;
        private readonly IWorkflowMessageService workflowMessageService;


        #endregion

        #region Ctor

        public CustomerRegistrationService(CustomerSettings customerSettings,
            IAuthenticationService authenticationService,
            ICustomerActivityService customerActivityService,
            IUserService customerService,
            IEncryptionService encryptionService,
            IEventPublisher eventPublisher,
            IGenericAttributeService genericAttributeService,
            IStoreContext storeContext,
            IStoreService storeService,
            IWorkContext workContext,
            ILocaleStringResourceService localeStringResourceService,
            IWorkflowMessageService workflowMessageService)
        {
            _customerSettings = customerSettings;
            _authenticationService = authenticationService;
            _customerActivityService = customerActivityService;
            _customerService = customerService;
            _encryptionService = encryptionService;
            _eventPublisher = eventPublisher;
            _genericAttributeService = genericAttributeService;
            _storeContext = storeContext;
            _storeService = storeService;
            _workContext = workContext;
            this.localeStringResourceService = localeStringResourceService;
            this.workflowMessageService = workflowMessageService;
        }

        #endregion

        #region Utilities

        /// <summary>
        /// Check whether the entered password matches with a saved one
        /// </summary>
        /// <param name="customerPassword">Customer password</param>
        /// <param name="enteredPassword">The entered password</param>
        /// <returns>True if passwords match; otherwise false</returns>
        protected bool PasswordsMatch(CustomerPassword customerPassword, string enteredPassword)
        {
            if (customerPassword == null || string.IsNullOrEmpty(enteredPassword))
            {
                return false;
            }

            var savedPassword = string.Empty;
            switch (customerPassword.PasswordFormat)
            {
                case PasswordFormat.Clear:
                    savedPassword = enteredPassword;
                    break;
                case PasswordFormat.Encrypted:
                    savedPassword = _encryptionService.EncryptText(enteredPassword);
                    break;
                case PasswordFormat.Hashed:
                    savedPassword = _encryptionService.CreatePasswordHash(enteredPassword, customerPassword.PasswordSalt, _customerSettings.HashedPasswordFormat);
                    break;
            }

            if (customerPassword.Password == null)
                return false;

            return customerPassword.Password.Equals(savedPassword);
        }

        #endregion

        #region Methods

        /// <summary>
        /// Validate customer
        /// </summary>
        /// <param name="usernameOrEmail">Username or email</param>
        /// <param name="password">Password</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<CustomerLoginResults> ValidateCustomerAsync(string usernameOrEmail, string password)
        {
            var customer = _customerSettings.UsernamesEnabled ?
                await _customerService.GetCustomerByUsernameAsync(usernameOrEmail) :
                await _customerService.GetCustomerByEmailAsync(usernameOrEmail);

            if (customer == null)
            {
                return CustomerLoginResults.CustomerNotExist;
            }
            if (customer.Deleted)
            {
                return CustomerLoginResults.Deleted;
            }
            //if (!customer.Active)
            //{
            //    return CustomerLoginResults.NotActive;
            //}
            // only registered can login
            if (!await _customerService.IsRegisteredAsync(customer))
            {
                return CustomerLoginResults.NotRegistered;
            }
            // check whether a customer is locked out
            if (customer.CannotLoginUntilDateUtc.HasValue && customer.CannotLoginUntilDateUtc.Value > DateTime.UtcNow)
            {
                return CustomerLoginResults.LockedOut;
            }

            if (!PasswordsMatch(await _customerService.GetCurrentPasswordAsync(customer.Id), password))
            {
                // wrong password
                customer.FailedLoginAttempts++;
                if (_customerSettings.FailedPasswordAllowedAttempts > 0 && customer.FailedLoginAttempts >= _customerSettings.FailedPasswordAllowedAttempts)
                {
                    // lock out
                    customer.CannotLoginUntilDateUtc = DateTime.UtcNow.AddMinutes(_customerSettings.FailedPasswordLockoutMinutes);
                    // reset the counter
                    customer.FailedLoginAttempts = 0;
                }

                await _customerService.UpdateCustomerAsync(customer);

                return CustomerLoginResults.WrongPassword;
            }

            var selectedProvider = await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.SelectedMultiFactorAuthenticationProviderAttribute);
            //var methodIsActive = await _multiFactorAuthenticationPluginManager.IsPluginActiveAsync(selectedProvider, customer, (await _storeContext.GetCurrentStoreAsync()).Id);
            //if (methodIsActive)
            //{
            //    return CustomerLoginResults.MultiFactorAuthenticationRequired;
            //}
            if (!string.IsNullOrEmpty(selectedProvider))
            {
                // _notificationService.WarningNotification(await this.localeStringResourceService.GetResourceAsync("MultiFactorAuthentication.Notification.SelectedMethodIsNotActive"));
            }

            // update login details
            customer.FailedLoginAttempts = 0;
            customer.CannotLoginUntilDateUtc = null;
            customer.RequireReLogin = false;
            customer.LastLoginDateUtc = DateTime.UtcNow;
            await _customerService.UpdateCustomerAsync(customer);

            return CustomerLoginResults.Successful;
        }

        /// <summary>
        /// Register customer
        /// </summary>
        /// <param name="request">Request</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<CustomerRegistrationResult> RegisterCustomerAsync(CustomerRegistrationRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            if (request.Customer == null)
                throw new ArgumentException("Can't load current customer");

            var result = new CustomerRegistrationResult();
            if (request.Customer.IsSearchEngineAccount())
            {
                result.AddError("Search engine can't be registered");
                return result;
            }

            if (request.Customer.IsBackgroundTaskAccount())
            {
                result.AddError("Background task account can't be registered");
                return result;
            }

            if (await _customerService.IsRegisteredAsync(request.Customer))
            {
                result.AddError("Current customer is already registered");
                return result;
            }

            if (string.IsNullOrEmpty(request.Email))
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.Register.Errors.EmailIsNotProvided"));
                return result;
            }

            if (!CommonHelper.IsValidEmail(request.Email))
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Common.WrongEmail"));
                return result;
            }

            if (string.IsNullOrWhiteSpace(request.Password))
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.Register.Errors.PasswordIsNotProvided"));
                return result;
            }

            if (_customerSettings.UsernamesEnabled && string.IsNullOrEmpty(request.Username))
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.Register.Errors.UsernameIsNotProvided"));
                return result;
            }

            //validate unique user
            if (await _customerService.GetCustomerByEmailAsync(request.Email) != null)
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.Register.Errors.EmailAlreadyExists"));
                return result;
            }

            if (_customerSettings.UsernamesEnabled && await _customerService.GetCustomerByUsernameAsync(request.Username) != null)
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.Register.Errors.UsernameAlreadyExists"));
                return result;
            }

            // at this point request is valid
            request.Customer.ScreenName = request.Username;
            request.Customer.Email = request.Email;

            var customerPassword = new CustomerPassword
            {
                CustomerId = request.Customer.Id,
                PasswordFormat = request.PasswordFormat,
                CreatedOnUtc = DateTime.UtcNow
            };
            switch (request.PasswordFormat)
            {
                case PasswordFormat.Clear:
                    customerPassword.Password = request.Password;
                    break;
                case PasswordFormat.Encrypted:
                    customerPassword.Password = _encryptionService.EncryptText(request.Password);
                    break;
                case PasswordFormat.Hashed:
                    var saltKey = _encryptionService.CreateSaltKey(NopCustomerServicesDefaults.PasswordSaltKeySize);
                    customerPassword.PasswordSalt = saltKey;
                    customerPassword.Password = _encryptionService.CreatePasswordHash(request.Password, saltKey, _customerSettings.HashedPasswordFormat);
                    break;
            }

            await _customerService.InsertCustomerPasswordAsync(customerPassword);

            request.Customer.Active = request.IsApproved;

            // add to 'Registered' role
            var registeredRole = await _customerService.GetCustomerRoleBySystemNameAsync(NopCustomerDefaults.RegisteredRoleName);
            if (registeredRole == null)
            {
                throw new NopException("'Registered' role could not be loaded");
            }

            await _customerService.AddCustomerRoleMappingAsync(new CustomerCustomerRoleMapping { CustomerId = request.Customer.Id, CustomerRoleId = registeredRole.Id });

            // remove from 'Guests' role            
            if (await _customerService.IsGuestAsync(request.Customer))
            {
                var guestRole = await _customerService.GetCustomerRoleBySystemNameAsync(NopCustomerDefaults.GuestsRoleName);
                await _customerService.RemoveCustomerRoleMappingAsync(request.Customer, guestRole);
            }

            ////add reward points for customer registration (if enabled)
            //if (_rewardPointsSettings.Enabled && _rewardPointsSettings.PointsForRegistration > 0)
            //{
            //    var endDate = _rewardPointsSettings.RegistrationPointsValidity > 0
            //        ? (DateTime?)DateTime.UtcNow.AddDays(_rewardPointsSettings.RegistrationPointsValidity.Value) : null;
            //    await _rewardPointService.AddRewardPointsHistoryEntryAsync(request.Customer, _rewardPointsSettings.PointsForRegistration,
            //        request.StoreId, await _localizationService.GetResourceAsync("RewardPoints.Message.EarnedForRegistration"), endDate: endDate);
            //}

            await _customerService.UpdateCustomerAsync(request.Customer);

            return result;
        }

        /// <summary>
        /// Change password
        /// </summary>
        /// <param name="request">Request</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<ChangePasswordResult> ChangePasswordAsync(ChangePasswordRequest request)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            var result = new ChangePasswordResult();
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.ChangePassword.Errors.EmailIsNotProvided"));
                return result;
            }

            if (string.IsNullOrWhiteSpace(request.NewPassword))
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.ChangePassword.Errors.PasswordIsNotProvided"));
                return result;
            }

            var customer = await _customerService.GetCustomerByEmailAsync(request.Email);
            if (customer == null)
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.ChangePassword.Errors.EmailNotFound"));
                return result;
            }

            //request isn't valid
            if (request.ValidateRequest && !PasswordsMatch(await _customerService.GetCurrentPasswordAsync(customer.Id), request.OldPassword))
            {
                result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.ChangePassword.Errors.OldPasswordDoesntMatch"));
                return result;
            }

            //check for duplicates
            if (_customerSettings.UnduplicatedPasswordsNumber > 0)
            {
                //get some of previous passwords
                var previousPasswords = await _customerService.GetCustomerPasswordsAsync(customer.Id, passwordsToReturn: _customerSettings.UnduplicatedPasswordsNumber);

                var newPasswordMatchesWithPrevious = previousPasswords.Any(password => PasswordsMatch(password, request.NewPassword));
                if (newPasswordMatchesWithPrevious)
                {
                    result.AddError(await this.localeStringResourceService.GetResourceAsync("Account.ChangePassword.Errors.PasswordMatchesWithPrevious"));
                    return result;
                }
            }

            //at this point request is valid
            var customerPassword = new CustomerPassword
            {
                CustomerId = customer.Id,
                PasswordFormat = request.NewPasswordFormat,
                CreatedOnUtc = DateTime.UtcNow
            };
            switch (request.NewPasswordFormat)
            {
                case PasswordFormat.Clear:
                    customerPassword.Password = request.NewPassword;
                    break;
                case PasswordFormat.Encrypted:
                    customerPassword.Password = _encryptionService.EncryptText(request.NewPassword);
                    break;
                case PasswordFormat.Hashed:
                    var saltKey = _encryptionService.CreateSaltKey(NopCustomerServicesDefaults.PasswordSaltKeySize);
                    customerPassword.PasswordSalt = saltKey;
                    customerPassword.Password = _encryptionService.CreatePasswordHash(request.NewPassword, saltKey,
                        request.HashedPasswordFormat ?? _customerSettings.HashedPasswordFormat);
                    break;
            }

            await _customerService.InsertCustomerPasswordAsync(customerPassword);

            // publish event
            await _eventPublisher.PublishAsync(new CustomerPasswordChangedEvent(customerPassword));

            return result;
        }

        /// <summary>
        /// Login passed user
        /// </summary>
        /// <param name="customer">User to login</param>
        /// <param name="returnUrl">URL to which the user will return after authentication</param>
        /// <param name="isPersist">Is remember me</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result of an authentication
        /// </returns>
        public virtual async Task<AuthResult<Web.Models.AuthDTO.Token>> SignInCustomerAsync(Customer customer, string returnUrl, bool isPersist = false)
        {
            if ((await _workContext.GetCurrentCustomerAsync())?.Id != customer.Id)
            {
                //migrate shopping cart
                // await _shoppingCartService.MigrateShoppingCartAsync(await _workContext.GetCurrentCustomerAsync(), customer, true);

                await _workContext.SetCurrentCustomerAsync(customer);
            }

            // sign in new customer
            var result = await _authenticationService.SignInAsync(customer, isPersist);

            // raise event       
            await _eventPublisher.PublishAsync(new CustomerLoggedinEvent(customer));

            // activity log
            await _customerActivityService.InsertActivityAsync(customer, "PublicStore.Login",
                await this.localeStringResourceService.GetResourceAsync("ActivityLog.PublicStore.Login"), customer);

            return result;
        }

        /// <summary>
        /// Sets a user email
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="newEmail">New email</param>
        /// <param name="requireValidation">Require validation of new email address</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task SetEmailAsync(Customer customer, string newEmail, bool requireValidation)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            if (newEmail == null)
            {
                throw new NopException("Email cannot be null");
            }

            newEmail = newEmail.Trim();
            var oldEmail = customer.Email;

            if (!CommonHelper.IsValidEmail(newEmail))
            {
                throw new NopException(await this.localeStringResourceService.GetResourceAsync("Account.EmailUsernameErrors.NewEmailIsNotValid"));
            }

            if (newEmail.Length > 100)
            {
                throw new NopException(await this.localeStringResourceService.GetResourceAsync("Account.EmailUsernameErrors.EmailTooLong"));
            }

            var customer2 = await _customerService.GetCustomerByEmailAsync(newEmail);
            if (customer2 != null && customer.Id != customer2.Id)
            {
                throw new NopException("Email already exists. Please try again with a new email");
            }

            if (/*requireValidation*/ false) // TODO: look at this before production!!!!!!!!
            {
               // re-validate email
                customer.EmailToRevalidate = newEmail;
                await _customerService.UpdateCustomerAsync(customer);

                // email re-validation message
                await _genericAttributeService.SaveAttributeAsync(customer, NopCustomerDefaults.EmailRevalidationTokenAttribute, Guid.NewGuid().ToString());
                await this.workflowMessageService.SendCustomerEmailRevalidationMessageAsync(customer, 1);
            }
            else
            {
                customer.Email = newEmail;
                await _customerService.UpdateCustomerAsync(customer);

                if (string.IsNullOrEmpty(oldEmail) || oldEmail.Equals(newEmail, StringComparison.InvariantCultureIgnoreCase))
                {
                    return;
                }

                ////update newsletter subscription (if required)
                //foreach (var store in await _storeService.GetAllStoresAsync())
                //{
                //    var subscriptionOld = await _newsLetterSubscriptionService.GetNewsLetterSubscriptionByEmailAndStoreIdAsync(oldEmail, store.Id);

                //    if (subscriptionOld == null)
                //        continue;

                //    subscriptionOld.Email = newEmail;
                //    await _newsLetterSubscriptionService.UpdateNewsLetterSubscriptionAsync(subscriptionOld);
                //}
            }
        }

        /// <summary>
        /// Sets a customer username
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="newUsername">New Username</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task SetUsernameAsync(Customer customer, string newUsername)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            if (!_customerSettings.UsernamesEnabled)
            {
                throw new NopException("Usernames are disabled");
            }

            newUsername = newUsername.Trim();

            if (newUsername.Length > NopCustomerServicesDefaults.CustomerUsernameLength)
            {
                throw new NopException(await this.localeStringResourceService.GetResourceAsync("Account.EmailUsernameErrors.UsernameTooLong"));
            }

            var user2 = await _customerService.GetCustomerByUsernameAsync(newUsername);
            if (user2 != null && customer.Id != user2.Id)
            {
                throw new NopException(await this.localeStringResourceService.GetResourceAsync("Account.EmailUsernameErrors.UsernameAlreadyExists"));
            }

            customer.ScreenName = newUsername;
            await _customerService.UpdateCustomerAsync(customer);
        }

        #endregion
    }
}
