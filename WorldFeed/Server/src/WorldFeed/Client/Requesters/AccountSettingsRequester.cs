namespace WorldFeed.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Client;
    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;
    using WorldFeed.Common.Web;
    using WorldFeed.Controllers.AccountSettings;

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