using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

using Chessbook.Core.Domain.Customers;
using Chessbook.Data.Models;
using Chessbook.Services;
using Chessbook.Web.Models.AuthDTO;
using Chessbook.Web.Api;
using Chessbook.Web.Api.Identity;

namespace Chessbook.Services.Authentication
{
    /// <summary>
    /// Represents service using cookie middleware for the authentication
    /// </summary>
    public class AuthenticationService : IAuthenticationService
    {
        #region Fields

        private readonly JwtManager jwtManager;
        private readonly CustomerSettings _customerSettings;
        private readonly IUserService _customerService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private Customer _cachedCustomer;

        #endregion

        #region Ctor

        public AuthenticationService(JwtManager jwtManager, CustomerSettings customerSettings, IUserService customerService, IHttpContextAccessor httpContextAccessor)
        {
            this.jwtManager = jwtManager;
            _customerSettings = customerSettings;
            _customerService = customerService;
            _httpContextAccessor = httpContextAccessor;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Sign in
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="isPersistent">Whether the authentication session is persisted across multiple requests</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task<AuthResult<Token>> SignInAsync(Customer customer, bool isPersistent)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            // create claims for customer's username and email
            var claims = new List<Claim>();

            if (!string.IsNullOrEmpty(customer.ScreenName))
            {
                claims.Add(new Claim(ClaimTypes.Name, customer.ScreenName, ClaimValueTypes.String, NopAuthenticationDefaults.ClaimsIssuer));
            }

            if (!string.IsNullOrEmpty(customer.Email))
            {
                claims.Add(new Claim(ClaimTypes.Email, customer.Email, ClaimValueTypes.Email, NopAuthenticationDefaults.ClaimsIssuer));
            }

            // create principal for the current authentication scheme
            var userIdentity = new ClaimsIdentity(claims, NopAuthenticationDefaults.AuthenticationScheme);
            var userPrincipal = new ClaimsPrincipal(userIdentity);

            // set value indicating whether session is persisted and the time at which the authentication was issued
            var authenticationProperties = new AuthenticationProperties
            {
                IsPersistent = isPersistent,
                IssuedUtc = DateTime.UtcNow
            };

            // sign in
            if (true)
            {
                var token = jwtManager.GenerateToken(customer);

                // cache authenticated customer
                _cachedCustomer = customer;

                return AuthResult<Token>.TokenResult(token);
            }

            //// sign in
            //await _httpContextAccessor.HttpContext.SignInAsync(NopAuthenticationDefaults.AuthenticationScheme, userPrincipal, authenticationProperties);

            //// cache authenticated customer
            //_cachedCustomer = customer;
        }

        /// <summary>
        /// Sign out
        /// </summary>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task SignOutAsync()
        {
            //reset cached customer
            _cachedCustomer = null;

            //and sign out from the current authentication scheme
            await _httpContextAccessor.HttpContext.SignOutAsync(NopAuthenticationDefaults.AuthenticationScheme);
        }

        /// <summary>
        /// Get authenticated customer
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer
        /// </returns>
        public virtual async Task<Customer> GetAuthenticatedCustomerAsync()
        {
            //whether there is a cached customer
            if (_cachedCustomer != null)
            {
                return _cachedCustomer;
            }

            //try to get authenticated user identity
            var authenticateResult = await _httpContextAccessor.HttpContext.AuthenticateAsync("Bearer"); // NopAuthenticationDefaults.AuthenticationScheme
            if (!authenticateResult.Succeeded)
            {
                return null;
            }

            Customer customer = null;
            if (true) // _customerSettings.UsernamesEnabled
            {
                // try to get customer by username
                var usernameClaim = authenticateResult.Principal.FindFirst(claim => claim.Type == ClaimTypes.Name
                    && claim.Issuer.Equals(NopAuthenticationDefaults.ClaimsIssuer, StringComparison.InvariantCultureIgnoreCase));
                if (usernameClaim != null)
                {
                    customer = await _customerService.GetCustomerByUsernameAsync(usernameClaim.Value);
                }
            }
            else
            {
                // try to get customer by email
                var emailClaim = authenticateResult.Principal.FindFirst(claim => claim.Type == ClaimTypes.Email
                    && claim.Issuer.Equals(NopAuthenticationDefaults.ClaimsIssuer, StringComparison.InvariantCultureIgnoreCase));
                if (emailClaim != null)
                    customer = await _customerService.GetCustomerByEmailAsync(emailClaim.Value);
            }

            // whether the found customer is available
            if (customer == null || !customer.Active || customer.RequireReLogin || customer.Deleted || !await _customerService.IsRegisteredAsync(customer))
                return null;

            // cache authenticated customer
            _cachedCustomer = customer;

            return _cachedCustomer;
        }

        public async Task<AuthResult<Token>> RefreshToken(RefreshTokenDTO refreshTokenDto)
        {
            var refreshToken = refreshTokenDto?.Token?.Refresh_token;
            if (string.IsNullOrEmpty(refreshToken))
                return AuthResult<Token>.UnvalidatedResult;

            try
            {
                var principal = jwtManager.GetPrincipal(refreshToken, isAccessToken: false);
                var userId = principal.GetUserId();
                var user = await this._customerService.GetCustomerByIdAsync(userId);

                if (user != null && user.Id > 0)
                {
                    var token = jwtManager.GenerateToken(user);
                    return AuthResult<Token>.TokenResult(token);
                }
            }
            catch (Exception)
            {
                return AuthResult<Token>.UnauthorizedResult;
            }

            return AuthResult<Token>.UnauthorizedResult;
        }

        public async Task<Token> GenerateToken(int userId)
        {
            var user = await this._customerService.GetCustomerByIdAsync(userId);

            if (user != null && user.Id > 0)
            {
                return jwtManager.GenerateToken(user);
            }

            return null;
        }

        #endregion
    }
}
