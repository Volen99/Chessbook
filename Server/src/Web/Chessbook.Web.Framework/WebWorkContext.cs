using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

using Chessbook.Core;
using Chessbook.Data.Models;
using Chessbook.Services.Authentication;
using Chessbook.Services;
using Chessbook.Core.Domain.Localization;
using Chessbook.Services.Common;
using Chessbook.Services.Helpers;
using Chessbook.Services.Localization;

namespace Chessbook.Web.Framework
{
    /// <summary>
    /// Represents work context for web application
    /// </summary>
    public partial class WebWorkContext : IWorkContext
    {
        #region Fields

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserService _customerService;
        private readonly IGenericAttributeService _genericAttributeService;
        private readonly IAuthenticationService _authenticationService;
        private readonly ILanguageService languageService;

        private Customer _cachedCustomer;
        private Customer _originalCustomerIfImpersonated;
        private Language _cachedLanguage;

        #endregion

        #region Ctor

        public WebWorkContext(
            IUserService customerService,
            IGenericAttributeService genericAttributeService,
            IHttpContextAccessor httpContextAccessor,
            IUserAgentHelper userAgentHelper,
            IWebHelper webHelper,
            IAuthenticationService authenticationService,
            ILanguageService languageService)
        {
            _customerService = customerService;
            _authenticationService = authenticationService;
            this.languageService = languageService;
            _genericAttributeService = genericAttributeService;
            _httpContextAccessor = httpContextAccessor;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets the current customer
        /// </summary>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task<Customer> GetCurrentCustomerAsync()
        {
            //whether there is a cached value
            if (_cachedCustomer != null)
            {
                return _cachedCustomer;
            }

            await SetCurrentCustomerAsync();

            return _cachedCustomer;
        }

        /// <summary>
        /// Sets the current customer
        /// </summary>
        /// <param name="customer">Current customer</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task SetCurrentCustomerAsync(Customer customer = null)
        {
            if (customer == null)
            {
                //check whether request is made by a background (schedule) task
                if (_httpContextAccessor.HttpContext?.Request ?.Path.Equals(new PathString($"/{Services.Tasks.NopTaskDefaults.ScheduleTaskPath}"), StringComparison.InvariantCultureIgnoreCase) ?? true)
                {
                    // in this case return built-in customer record for background task
                    customer = await _customerService.GetOrCreateBackgroundTaskUserAsync();
                }

                if (customer == null || customer.IsDeleted || !customer.Active || customer.RequireReLogin)
                {
                    ////check whether request is made by a search engine, in this case return built-in customer record for search engines
                    //if (_userAgentHelper.IsSearchEngine())
                    //    customer = await _customerService.GetOrCreateSearchEngineUserAsync();
                }

                if (customer == null || customer.IsDeleted || !customer.Active || customer.RequireReLogin)
                {
                    //try to get registered user
                    customer = await _authenticationService.GetAuthenticatedCustomerAsync();
                }

                if (customer != null && !customer.IsDeleted && customer.Active && !customer.RequireReLogin)
                {
                    //get impersonate user if required
                    var impersonatedCustomerId = await _genericAttributeService
                        .GetAttributeAsync<int?>(customer, NopCustomerDefaults.ImpersonatedCustomerIdAttribute);
                    if (impersonatedCustomerId.HasValue && impersonatedCustomerId.Value > 0)
                    {
                        var impersonatedCustomer = await _customerService.GetCustomerByIdAsync(impersonatedCustomerId.Value);
                        if (impersonatedCustomer != null && !impersonatedCustomer.IsDeleted &&
                            impersonatedCustomer.Active &&
                            !impersonatedCustomer.RequireReLogin)
                        {
                            //set impersonated customer
                            _originalCustomerIfImpersonated = customer;
                            customer = impersonatedCustomer;
                        }
                    }
                }

                if (customer == null || customer.IsDeleted || !customer.Active || customer.RequireReLogin)
                {
                    //get guest customer
                    //var customerCookie = GetCustomerCookie();
                    //if (Guid.TryParse(customerCookie, out var customerGuid))
                    //{
                    //    //get customer from cookie (should not be registered)
                    //    var customerByCookie = await _customerService.GetCustomerByGuidAsync(customerGuid);
                    //    if (customerByCookie != null && !await _customerService.IsRegisteredAsync(customerByCookie))
                    //        customer = customerByCookie;
                    //}
                }

                if (customer == null || customer.IsDeleted || !customer.Active || customer.RequireReLogin)
                {
                    //create guest if not exists
                    customer = await _customerService.InsertGuestCustomerAsync();
                }
            }

            if (!customer.IsDeleted && customer.Active && !customer.RequireReLogin)
            {
                //set customer cookie
                // SetCustomerCookie(customer.CustomerGuid);

                //cache the found customer
                _cachedCustomer = customer;
            }
        }

        /// <summary>
        /// Gets the original customer (in case the current one is impersonated)
        /// </summary>
        public virtual Customer OriginalCustomerIfImpersonated => _originalCustomerIfImpersonated;

        /// <summary>
        /// Gets or sets value indicating whether we're in admin area
        /// </summary>
        public virtual bool IsAdmin { get; set; }

        /// <summary>
        /// Gets current user working language
        /// </summary>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task<Language> GetWorkingLanguageAsync()
        {
            // whether there is a cached value
            if (_cachedLanguage != null)
            {
                return _cachedLanguage;
            }

            var language = await this.languageService.GetLanguageByIdAsync(1); // hard code awww <3 

            // cache the found language
            _cachedLanguage = language;

            return _cachedLanguage;
        }

        #endregion
    }
}
