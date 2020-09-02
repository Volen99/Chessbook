namespace WorldFeed.AccountSettings.Client.Clients
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;

    public class AccountSettingsClient : IAccountSettingsClient
    {
        private readonly ITwitterClient client;
        private readonly IAccountSettingsRequester accountRequester;

        public AccountSettingsClient(ITwitterClient client)
        {
            this.client = client;
            this.accountRequester = client.Raw.AccountSettings;
        }

        public IAccountSettingsClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public Task<IAccountSettings> GetAccountSettingsAsync()
        {
            return GetAccountSettingsAsync(new GetAccountSettingsParameters());
        }

        public async Task<IAccountSettings> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters)
        {                                                            // Use .ConfigureAwait(false) to prevent deadlock
            var twitterResult = await this.accountRequester.GetAccountSettingsAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateAccountSettings(twitterResult?.Model);
        }

        public async Task<IAccountSettings> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters)
        {
            var twitterResult = await this.accountRequester.UpdateAccountSettingsAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateAccountSettings(twitterResult?.Model);
        }

        public async Task<IAuthenticatedUser> UpdateProfileAsync(IUpdateProfileParameters parameters)
        {
            var twitterResult = await this.accountRequester.UpdateProfileAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateAuthenticatedUser(twitterResult?.Model);
        }

        public Task<IUser> UpdateProfileImageAsync(byte[] binary)
        {
            return UpdateProfileImageAsync(new UpdateProfileImageParameters(binary));
        }

        public async Task<IUser> UpdateProfileImageAsync(IUpdateProfileImageParameters parameters)
        {
            var twitterResult = await this.accountRequester.UpdateProfileImageAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateUser(twitterResult?.Model);
        }

        public Task UpdateProfileBannerAsync(byte[] binary)
        {
            return UpdateProfileBannerAsync(new UpdateProfileBannerParameters(binary));
        }

        public Task UpdateProfileBannerAsync(IUpdateProfileBannerParameters parameters)
        {
            return this.accountRequester.UpdateProfileBannerAsync(parameters);
        }

        public Task RemoveProfileBannerAsync()
        {
            return RemoveProfileBannerAsync(new RemoveProfileBannerParameters());
        }

        public Task RemoveProfileBannerAsync(IRemoveProfileBannerParameters parameters)
        {
            return this.accountRequester.RemoveProfileBannerAsync(parameters);
        }
    }
}
