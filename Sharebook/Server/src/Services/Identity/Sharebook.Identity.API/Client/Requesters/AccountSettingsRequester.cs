﻿namespace Sharebook.Identity.API.Client.Requesters
{
    using System.Threading.Tasks;

    using Sharebook.AccountSettings.Controllers;
    using Sharebook.Client;
    using Sharebook.Common.Client.Validators;
    using Sharebook.Common.Events;
    using Sharebook.Common.Public;
    using Sharebook.Common.Public.Client.Requesters;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Parameters.AccountSettingsClient;
    using Sharebook.Common.Web;

    public class AccountSettingsRequester : BaseRequester, IAccountSettingsRequester
    {
        private readonly IAccountSettingsController accountSettingsController;
        private readonly IAccountSettingsClientRequiredParametersValidator validator;

        public AccountSettingsRequester(ITwitterClient client, ITwitterClientEvents clientEvents, IAccountSettingsController accountSettingsController,
            IAccountSettingsClientRequiredParametersValidator validator)
        : base(client, clientEvents)
        {
            this.accountSettingsController = accountSettingsController;
            this.validator = validator;
        }

        public Task<ITwitterResult<IAccountSettingsDTO>> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.accountSettingsController.GetAccountSettingsAsync(parameters, request));
        }

        public Task<ITwitterResult<IAccountSettingsDTO>> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.accountSettingsController.UpdateAccountSettingsAsync(parameters, request));
        }

        public Task<ITwitterResult<IUserDTO>> UpdateProfileAsync(IUpdateProfileParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.accountSettingsController.UpdateProfileAsync(parameters, request));
        }

        public Task<ITwitterResult<IUserDTO>> UpdateProfileImageAsync(IUpdateProfileImageParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.accountSettingsController.UpdateProfileImageAsync(parameters, request));
        }

        public Task<ITwitterResult> UpdateProfileBannerAsync(IUpdateProfileBannerParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.accountSettingsController.UpdateProfileBannerAsync(parameters, request));
        }

        public Task<ITwitterResult> RemoveProfileBannerAsync(IRemoveProfileBannerParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.accountSettingsController.RemoveProfileBannerAsync(parameters, request));
        }
    }
}