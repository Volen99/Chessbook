namespace WorldFeed.Identity.API.Client
{
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Identity.API.Client.Requesters;

    public class RawExecutors : IRawExecutors
    {
        private readonly IAuthRequester authRequester;
        private readonly IAccountSettingsRequester accountSettingsRequester;
        private readonly IHelpRequester helpRequester;

        public RawExecutors(IAuthRequester authRequester, IAccountSettingsRequester accountSettingsRequester, IHelpRequester helpRequester)
        {
            this.authRequester = authRequester;
            this.accountSettingsRequester = accountSettingsRequester;
            this.helpRequester = helpRequester;
        }

        public IAuthRequester Auth => this.authRequester;

        public IAccountSettingsRequester AccountSettings => this.accountSettingsRequester;

        public IHelpRequester Help => this.helpRequester;
    }
}
