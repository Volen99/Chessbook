namespace Chessbook.Web.Api
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;

    using Chessbook.Data.Models;

    public class ApplicationUserManager : UserManager<Customer>
    {
        public ApplicationUserManager(IUserStore<Customer> store, IOptions<IdentityOptions> optionsAccessor, IPasswordHasher<Customer> passwordHasher,
            IEnumerable<IUserValidator<Customer>> userValidators, IEnumerable<IPasswordValidator<Customer>> passwordValidators, ILookupNormalizer keyNormalizer,
            IdentityErrorDescriber errors, IServiceProvider services, ILogger<UserManager<Customer>> logger)
            : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
        }

        public override async Task<IdentityResult> ChangePasswordAsync(Customer user, string currentPassword, string newPassword)
        {
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }

            var result = await UpdatePasswordHash(user, newPassword, true);
            if (!result.Succeeded)
            {
                return result;
            }

            return await UpdateUserAsync(user);
        }
    }
}
