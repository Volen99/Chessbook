namespace Chessbook.Web.Api.Identity
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;

    using Chessbook.Data.Models;
    using Chessbook.Web.Models.AuthDTO;
    using Chessbook.Services.Authentication;
    using System.Collections.Generic;
    using System.Security.Claims;
    using Nop.Services.Authentication;
    using Microsoft.AspNetCore.Authentication;
    using Chessbook.Services.Data.Services;
    using Microsoft.AspNetCore.Http;
    using Nop.Services.Helpers;
    using Chessbook.Core;
    using Nop.Services.Common;
    using Nop.Services.Customers;
    using Nop.Core.Domain.Customers;
    using Chessbook.Services.Localization;
    using Nop.Services.Logging;
    using System.Linq;
    using Nop.Services.Security;

    public class AuthenticationService<TUser> : Services.Authentication.IAuthenticationService
        where TUser : Customer, new()
    {
        protected readonly JwtManager jwtManager;
        protected readonly IUserService userService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private Customer _cachedCustomer;

        public AuthenticationService(JwtManager jwtManager, IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            this.jwtManager = jwtManager;
            this.userService = userService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<AuthResult<Token>> Login(Customer customer, bool isPersistent)          // LoginDTO loginDto
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


            //if (loginDto == null || string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
            //{
            //    return AuthResult<Token>.UnvalidatedResult;
            //}

            //var user = await userManager.FindByEmailAsync(loginDto.Email);

            //if (user != null && user.Id > 0)
            //{
            //    if (await userManager.CheckPasswordAsync(user, loginDto.Password))
            //    {
            //        var token = jwtManager.GenerateToken(user);
            //        return AuthResult<Token>.TokenResult(token);
            //    }
            //}

            return AuthResult<Token>.UnauthorizedResult;
        }

        public async Task<AuthResult<Token>> ChangePassword(ChangePasswordDTO changePasswordDto, int currentUserId)
        {
            if (changePasswordDto == null ||
                string.IsNullOrEmpty(changePasswordDto.ConfirmPassword) ||
                string.IsNullOrEmpty(changePasswordDto.Password) ||
                changePasswordDto.Password != changePasswordDto.ConfirmPassword
            )
                return AuthResult<Token>.UnvalidatedResult;

            if (currentUserId > 0)
            {
                //var user = await userManager.FindByIdAsync(currentUserId.ToString());
                //var result = await userManager.ChangePasswordAsync(user, null, changePasswordDto.Password);
                //if (result.Succeeded)
                //    return AuthResult<Token>.SucceededResult;
            }

            return AuthResult<Token>.UnauthorizedResult;
        }

        public async Task<AuthResult<Token>> SignUp(SignUpDTO signUpDto)
        {
            //if (signUpDto == null ||
            //    string.IsNullOrEmpty(signUpDto.Email) ||
            //    string.IsNullOrEmpty(signUpDto.Password) ||
            //    string.IsNullOrEmpty(signUpDto.ConfirmPassword) ||
            //    string.IsNullOrEmpty(signUpDto.DisplayName) ||
            //    string.IsNullOrEmpty(signUpDto.Username) ||
            //    signUpDto.Password != signUpDto.ConfirmPassword)
            //{
            //    return AuthResult<Token>.UnvalidatedResult;
            //}

            //var newUser = new TUser
            //{
            //    DisplayName = signUpDto.DisplayName,
            //    ScreenName = "@" + signUpDto.Username,
            //    Email = signUpDto.Email,
            //    CustomerGuid = Guid.NewGuid(),
            //    CreatedOn = DateTime.UtcNow,
            //    LastActivityDateUtc = DateTime.UtcNow,
            //};

            // var result = await userManager.CreateAsync(newUser, signUpDto.Password);


            //if (result.Succeeded)
            //{
            //    if (newUser.Id > 0)
            //    {
            //        await userManager.AddToRoleAsync(newUser, "User");
            //        var token = jwtManager.GenerateToken(newUser);
            //        return AuthResult<Token>.TokenResult(token);
            //    }
            //}

            throw new NotImplementedException();
        }




        public async Task<AuthResult<string>> RequestPassword(RequestPasswordDTO requestPasswordDto)
        {
            if (requestPasswordDto == null ||
                string.IsNullOrEmpty(requestPasswordDto.Email))
                return AuthResult<string>.UnvalidatedResult;

            var user = await this.userService.GetCustomerByEmailAsync(requestPasswordDto.Email);

            if (user != null && user.Id > 0)
            {
                //var passwordResetToken = await userManager.GeneratePasswordResetTokenAsync(user);
                //return AuthResult<string>.TokenResult(passwordResetToken);
            }

            return AuthResult<string>.UnvalidatedResult;
        }

        public async Task<AuthResult<Token>> RestorePassword(RestorePasswordDTO restorePasswordDto)
        {
            if (restorePasswordDto == null ||
                string.IsNullOrEmpty(restorePasswordDto.Email) ||
                string.IsNullOrEmpty(restorePasswordDto.Token) ||
                string.IsNullOrEmpty(restorePasswordDto.NewPassword) ||
                string.IsNullOrEmpty(restorePasswordDto.ConfirmPassword) ||
                string.IsNullOrEmpty(restorePasswordDto.ConfirmPassword) ||
                restorePasswordDto.ConfirmPassword != restorePasswordDto.NewPassword
            )
                return AuthResult<Token>.UnvalidatedResult;

            var user = await this.userService.GetCustomerByEmailAsync(restorePasswordDto.Email);

            if (user != null && user.Id > 0)
            {
                //var result = await userManager.ResetPasswordAsync(user, restorePasswordDto.Token, restorePasswordDto.NewPassword);

                //if (result.Succeeded)
                //{
                //    var token = jwtManager.GenerateToken(user);
                //    return AuthResult<Token>.TokenResult(token);
                //}
            }

            return AuthResult<Token>.UnvalidatedResult;
        }

        public Task<AuthResult<Token>> SignOut()
        {
            throw new System.NotImplementedException();
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
                var user = await this.userService.GetCustomerByIdAsync(userId);

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
            var user = await this.userService.GetCustomerByIdAsync(userId);

            if (user != null && user.Id > 0)
            {
                return jwtManager.GenerateToken(user);
            }

            return null;
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
                return _cachedCustomer;

            //try to get authenticated user identity
            var authenticateResult = await _httpContextAccessor.HttpContext.AuthenticateAsync("Bearer"); // NopAuthenticationDefaults.AuthenticationScheme
            if (!authenticateResult.Succeeded)
                return null;

            Customer customer = null;
            if (true) // _customerSettings.UsernamesEnabled
            {
                // try to get customer by username
                var usernameClaim = authenticateResult.Principal.FindFirst(claim => claim.Type == ClaimTypes.Name && claim.Issuer.Equals(NopAuthenticationDefaults.ClaimsIssuer, StringComparison.InvariantCultureIgnoreCase));
                    if (usernameClaim != null)
                {
                    customer = await userService.GetCustomerByUsernameAsync(usernameClaim.Value);
                }
            }
            else
            {
                //try to get customer by email
                var emailClaim = authenticateResult.Principal.FindFirst(claim => claim.Type == ClaimTypes.Email && claim.Issuer.Equals(NopAuthenticationDefaults.ClaimsIssuer, StringComparison.InvariantCultureIgnoreCase));
                if (emailClaim != null)
                {
                    customer = await userService.GetCustomerByEmailAsync(emailClaim.Value);
                }
            }

            //whether the found customer is available
            if (customer == null || !customer.Active || customer.RequireReLogin || customer.Deleted || !await userService.IsRegisteredAsync(customer))
                return null;

            //cache authenticated customer
            _cachedCustomer = customer;

            return _cachedCustomer;
        }
    }
}

