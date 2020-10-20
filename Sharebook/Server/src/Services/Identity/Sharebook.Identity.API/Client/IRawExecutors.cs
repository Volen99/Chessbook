namespace Sharebook.Identity.API.Client
{
    using Sharebook.Common.Public.Client.Requesters;
    using Sharebook.Identity.API.Client.Requesters;

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
