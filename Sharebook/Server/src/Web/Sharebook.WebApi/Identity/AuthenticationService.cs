namespace Sharebook.Web.Api.Identity
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;

    using Sharebook.Data.Models;
    using Sharebook.Web.Api.Interfaces;
    using Sharebook.Web.Models.AuthDTO;

    public class AuthenticationService<TUser> : IAuthenticationService
        where TUser : User, new()
    {
        protected readonly UserManager<TUser> userManager;
        protected readonly JwtManager jwtManager;

        public AuthenticationService(JwtManager jwtManager, UserManager<TUser> userManager)
        {
            this.userManager = userManager;
            this.jwtManager = jwtManager;
        }

        public async Task<AuthResult<Token>> Login(LoginDTO loginDto)
        {
            if (loginDto == null || string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
            {
                return AuthResult<Token>.UnvalidatedResult;
            }

            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user != null && user.Id > 0)
            {
                if (await userManager.CheckPasswordAsync(user, loginDto.Password))
                {
                    var token = jwtManager.GenerateToken(user);
                    return AuthResult<Token>.TokenResult(token);
                }
            }

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
                var user = await userManager.FindByIdAsync(currentUserId.ToString());
                var result = await userManager.ChangePasswordAsync(user, null, changePasswordDto.Password);
                if (result.Succeeded)
                    return AuthResult<Token>.SucceededResult;
            }

            return AuthResult<Token>.UnauthorizedResult;
        }

        public async Task<AuthResult<Token>> SignUp(SignUpDTO signUpDto)
        {
            if (signUpDto == null ||
                string.IsNullOrEmpty(signUpDto.Email) ||
                string.IsNullOrEmpty(signUpDto.Password) ||
                string.IsNullOrEmpty(signUpDto.ConfirmPassword) ||
                string.IsNullOrEmpty(signUpDto.FullName) ||
                signUpDto.Password != signUpDto.ConfirmPassword )
            {
                return AuthResult<Token>.UnvalidatedResult;
            }

            var newUser = new TUser
            {
                Name = signUpDto.FullName,
                ScreenName = "@" + signUpDto.FullName,
                Email = signUpDto.Email,
                Login = signUpDto.FullName, 
            };

            var result = await userManager.CreateAsync(newUser, signUpDto.Password);

            if (result.Succeeded)
            {
                if (newUser.Id > 0)
                {
                    await userManager.AddToRoleAsync(newUser, "User");
                    var token = jwtManager.GenerateToken(newUser);
                    return AuthResult<Token>.TokenResult(token);
                }
            }

            return AuthResult<Token>.UnauthorizedResult;
        }

        public async Task<AuthResult<string>> RequestPassword(RequestPasswordDTO requestPasswordDto)
        {
            if (requestPasswordDto == null ||
                string.IsNullOrEmpty(requestPasswordDto.Email))
                return AuthResult<string>.UnvalidatedResult;

            var user = await userManager.FindByEmailAsync(requestPasswordDto.Email);

            if (user != null && user.Id > 0)
            {
                var passwordResetToken = await userManager.GeneratePasswordResetTokenAsync(user);
                return AuthResult<string>.TokenResult(passwordResetToken);
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

            var user = await userManager.FindByEmailAsync(restorePasswordDto.Email);

            if (user != null && user.Id > 0)
            {
                var result = await userManager.ResetPasswordAsync(user, restorePasswordDto.Token, restorePasswordDto.NewPassword);

                if (result.Succeeded)
                {
                    var token = jwtManager.GenerateToken(user);
                    return AuthResult<Token>.TokenResult(token);
                }
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
                var user = await userManager.FindByIdAsync(userId.ToString());

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
            var user = await userManager.FindByIdAsync(userId.ToString());

            if (user != null && user.Id > 0)
            {
                return jwtManager.GenerateToken(user);
            }

            return null;
        }
    }
}