namespace WorldFeed.Identity.Services.Identity
{
    using System.Linq;
    using System.Threading.Tasks;
    using WorldFeed.Services;
    using Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Models.Identity;
    using System;
    using System.Globalization;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Entities;
    using System.Security.Cryptography;
    using System.Collections.Generic;
    using WorldFeed.Common.Models.Urls;
    using WorldFeed.Admin.Models.Identity;

    public class IdentityService : IIdentityService
    {
        private const string InvalidErrorMessage = "Invalid credentials.";

        private readonly UserManager<User> userManager;
        private readonly ITokenGeneratorService jwtTokenGenerator;

        public IdentityService(UserManager<User> userManager, ITokenGeneratorService jwtTokenGenerator)
        {
            this.userManager = userManager;
            this.jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<Result<User>> Register(UserLoginRequestModel input)
        {
            var date = input.BirthdayMonth + "/" + input.BirthdayDay + "/" + input.BirthdayYear;
            var birthday = DateTime.Parse(date, CultureInfo.InvariantCulture);
            var user = new User
            {
                UserName = input.FirstName,
                FirstName = input.FirstName,
                LastName = input.LastName,
                Email = input.Email,
                Birthday = birthday,
                Age = DateTime.UtcNow.Year - birthday.Year,
                Gender = (Gender)input.Gender,  
            };

            var identityResult = await this.userManager.CreateAsync(user, input.Password);

            var errors = identityResult.Errors.Select(e => e.Description);

            return identityResult.Succeeded
                ? Result<User>.SuccessWith(user)
                : Result<User>.Failure(errors);
        }

        public async Task<Result<User>> Login(UserLoginRequestModel userInput)
        {
            var user = await this.userManager.FindByEmailAsync(userInput.Email);
            if (user == null)
            {
                return InvalidErrorMessage;
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, userInput.Password);
            if (!passwordValid)
            {
                return InvalidErrorMessage;
            }

            return user;

            //return new UserOutputModel(token);
        }

        public async Task<Result> ChangePassword(string userId, ChangePasswordInputModel changePasswordInput)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return InvalidErrorMessage;
            }

            var identityResult = await this.userManager.ChangePasswordAsync(
                user,
                changePasswordInput.CurrentPassword,
                changePasswordInput.NewPassword);

            var errors = identityResult.Errors.Select(e => e.Description);

            return identityResult.Succeeded
                ? Result.Success
                : Result.Failure(errors);
        }
    }
}
