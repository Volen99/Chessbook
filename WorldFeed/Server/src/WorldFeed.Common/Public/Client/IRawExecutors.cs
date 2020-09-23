//namespace WorldFeed.Common.Public.Client
//{
//    using WorldFeed.Common.Public.Client.Requesters;

//    public interface IRawExecutors
//    {
//        /// <summary>
//        /// Client to execute all the actions related with webhooks
//        /// </summary>
//        IAccountActivityRequester AccountActivity { get; }

//        /// <summary>
//        /// Client to execute all actions related with the account associated with the clients' credentials
//        /// </summary>
//        IAccountSettingsRequester AccountSettings { get; }

//        /// <summary>
//        /// Client to execute all actions related with authentication
//        /// </summary>
//        IAuthRequester Auth { get; }

//        /// <summary>
//        /// Client to execute all actions from the help path
//        /// </summary>
//        IHelpRequester Help { get; }

//        /// <summary>
//        /// Client to execute all actions related with twitter lists
//        /// </summary>
//        ITwitterListsRequester Lists { get; }

//        /// <summary>
//        /// Client to execute all actions related with search
//        /// </summary>
//        ISearchRequester Search { get; }

//        /// <summary>
//        /// Client to execute all actions related with timelines
//        /// </summary>
//        ITimelinesRequester Timelines { get; }

//        /// <summary>
//        /// Client to execute all actions related with trends
//        /// </summary>
//        ITrendsRequester Trends { get; }

//        /// <summary>
//        /// Client to execute all actions related with tweets
//        /// </summary>
//        ITweetsRequester Tweets { get; }

//        /// <summary>
//        /// Client to execute all actions related with media upload
//        /// </summary>
//        // IUploadRequester Upload { get; }

//        /// <summary>
//        /// Client to execute all actions related with users
//        /// </summary>
//        IUsersRequester Users { get; }
//    }
//}
