namespace WorldFeed.Identity.API.Client
{
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Identity.API.Client.Requesters;

    public interface IRawExecutors
    {
       
        /// <summary>
        /// Client to execute all actions related with the account associated with the clients' credentials
        /// </summary>
        IAccountSettingsRequester AccountSettings { get; }

        /// <summary>
        /// Client to execute all actions related with authentication
        /// </summary>
        IAuthRequester Auth { get; }

        /// <summary>
        /// Client to execute all actions from the help path
        /// </summary>
        IHelpRequester Help { get; }
    }
}
