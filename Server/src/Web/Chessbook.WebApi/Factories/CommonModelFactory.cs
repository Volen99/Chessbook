using System;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Services;
using Chessbook.Web.Api.Models.Common;

namespace Chessbook.Web.Api.Factories
{
    public class CommonModelFactory : ICommonModelFactory
    {
        private readonly IWorkContext workContext;
        private readonly IUserService customerService;

        public CommonModelFactory(IWorkContext workContext, IUserService customerService)
        {
            this.workContext = workContext;
            this.customerService = customerService;
        }

        /// <summary>
        /// Prepare the contact us model
        /// </summary>
        /// <param name="model">Contact us model</param>
        /// <param name="excludeProperties">Whether to exclude populating of model properties from the entity</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the contact us model
        /// </returns>
        public async Task<ContactUsModel> PrepareContactUsModelAsync(ContactUsModel model, bool excludeProperties)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            if (!excludeProperties)
            {
                var userCurrent = await this.workContext.GetCurrentCustomerAsync();

                model.FromEmail = userCurrent.Email;
                model.FromName = userCurrent.ScreenName;
            }

            return model;
        }
    }
}
