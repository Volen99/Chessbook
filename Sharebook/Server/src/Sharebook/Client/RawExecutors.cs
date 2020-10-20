//namespace WorldFeed.Client
//{
//    using WorldFeed.Common.Public.Client;
//    using WorldFeed.Common.Public.Client.Requesters;

//    public class RawExecutors : IRawExecutors
//    {
//        private readonly IAuthRequester authRequester;
//        private readonly IAccountSettingsRequester accountSettingsRequester;
//        private readonly IHelpRequester helpRequester;
//        private readonly ISearchRequester searchRequester;
//        private readonly ITwitterListsRequester listsRequester;
//        private readonly ITimelinesRequester timelinesRequester;
//        private readonly ITrendsRequester trendsRequester;
//        private readonly ITweetsRequester tweetsRequester;
//        // private readonly IUploadRequester uploadRequester;
//        private readonly IUsersRequester usersRequester;
//        private readonly IAccountActivityRequester accountActivityRequester;

//        public RawExecutors(
//            IAccountActivityRequester accountActivityRequester,
//            IAuthRequester authRequester,
//            IAccountSettingsRequester accountSettingsRequester,
//            IHelpRequester helpRequester,
//            ISearchRequester searchRequester,
//            ITwitterListsRequester listsRequester,
//            ITimelinesRequester timelinesRequester,
//            ITrendsRequester trendsRequester,
//            ITweetsRequester tweetsRequester,
//            // IUploadRequester uploadRequester,
//            IUsersRequester usersRequester)
//        {
//            this.accountActivityRequester = accountActivityRequester;
//            this.authRequester = authRequester;
//            this.accountSettingsRequester = accountSettingsRequester;
//            this.helpRequester = helpRequester;
//            this.searchRequester = searchRequester;
//            this.listsRequester = listsRequester;
//            this.timelinesRequester = timelinesRequester;
//            this.trendsRequester = trendsRequester;
//            this.tweetsRequester = tweetsRequester;
//            // this.uploadRequester = uploadRequester;
//            this.usersRequester = usersRequester;
//        }

//        public IAuthRequester Auth => this.authRequester;
//        public IAccountSettingsRequester AccountSettings => this.accountSettingsRequester;
//        public IHelpRequester Help => this.helpRequester;
//        public ISearchRequester Search => this.searchRequester;
//        public ITwitterListsRequester Lists => this.listsRequester;
//        public ITimelinesRequester Timelines => this.timelinesRequester;
//        public ITrendsRequester Trends => this.trendsRequester;
//        public ITweetsRequester Tweets => this.tweetsRequester;
//        // public IUploadRequester Upload => this.uploadRequester;
//        public IUsersRequester Users => this.usersRequester;
//        public IAccountActivityRequester AccountActivity => this.accountActivityRequester;
//    }
//}
