using System;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Customers;
using Chessbook.Services.Data.Services;
using Chessbook.Web.Api.Models.Blocklist;
using Nop.Web.Areas.Admin.Models.Customers;

namespace Chessbook.Web.Api.Factories
{
    public class UserBlocklistFactory : IUserBlocklistFactory
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userFactory;

        public UserBlocklistFactory(IUserService userService, IUserModelFactory userFactory)
        {
            this.userService = userService;
            this.userFactory = userFactory;
        }

        public async Task<UserBlocklistModel> PrepareUserBlocklistModel(UserBlocklist userBlocklist)
        {
            if (userBlocklist == null)
            {
                throw new ArgumentNullException(nameof(userBlocklist));
            }

            var byAccountUser =  await this.userService.GetCustomerByIdAsync(userBlocklist.UserId);
            var blockedAccount = await this.userService.GetCustomerByIdAsync(userBlocklist.TargetUserId);

            var model = new UserBlocklistModel
            {
                ByAccount = await this.userFactory.PrepareCustomerModelAsync(new CustomerModel(), byAccountUser),
                BlockedAccount = await this.userFactory.PrepareCustomerModelAsync(new CustomerModel(), blockedAccount),
                CreatedAt = userBlocklist.CreatedAt,
            };

            return model;
        }
    }
}
