//namespace WorldFeed.Common.Client.Validators
//{
//    using WorldFeed.Common.Public.Models.Interfaces;
//    using WorldFeed.Common.Public.Parameters.AccountActivity;
//    using WorldFeed.Common.Public.Parameters.AccountClient;
//    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;
//    using WorldFeed.Common.Public.Parameters.Auth;
//    using WorldFeed.Common.Public.Parameters.HelpClient;
//    using WorldFeed.Common.Public.Parameters.ListsClient;
//    using WorldFeed.Common.Public.Parameters.ListsClient.Members;
//    using WorldFeed.Common.Public.Parameters.ListsClient.Subscribers;
//    using WorldFeed.Common.Public.Parameters.MessageClient;
//    using WorldFeed.Common.Public.Parameters.Search;
//    using WorldFeed.Common.Public.Parameters.TimelineClient;
//    using WorldFeed.Common.Public.Parameters.TrendsClient;
//    using WorldFeed.Common.Public.Parameters.TweetsClient;
//    using WorldFeed.Common.Public.Parameters.TweetsClients;
//    // using WorldFeed.Common.Public.Parameters.Upload;
//    using WorldFeed.Common.Public.Parameters.UsersClient;
//    using WorldFeed.Common.Public.Parameters.UsersClients;

//    public interface IParametersValidator :
//        IAccountActivityClientParametersValidator,
//        IAccountSettingsClientParametersValidator,
//        IAuthClientParametersValidator,
//        IHelpClientParametersValidator,
//        IMessagesClientParametersValidator,
//        ISearchClientParametersValidator,
//        ITwitterListsClientParametersValidator,
//        ITimelineClientParametersValidator,
//        ITrendsClientParametersValidator,
//        ITweetsClientParametersValidator,
//        // IUploadClientParametersValidator,
//        IUsersClientParametersValidator
//    {
//    }

//    public class ParametersValidator : IParametersValidator
//    {
//        private readonly IAccountActivityClientParametersValidator accountActivityClientParametersValidator;
//        private readonly IAccountSettingsClientParametersValidator accountSettingsClientParametersValidator;
//        private readonly IAuthClientParametersValidator authClientParametersValidator;
//        private readonly IHelpClientParametersValidator helpClientParametersValidator;
//        private readonly IMessagesClientParametersValidator messagesClientParametersValidator;
//        private readonly ISearchClientParametersValidator searchClientParametersValidator;
//        private readonly ITwitterListsClientParametersValidator twitterListsClientParametersValidator;
//        private readonly ITrendsClientParametersValidator trendsClientParametersValidator;
//        private readonly ITimelineClientParametersValidator timelineClientParametersValidator;
//        private readonly ITweetsClientParametersValidator tweetsClientParametersValidator;
//        // private readonly IUploadClientParametersValidator uploadClientParametersValidator;
//        private readonly IUsersClientParametersValidator usersClientParametersValidator;

//        public ParametersValidator(
//            IAccountActivityClientParametersValidator accountActivityClientParametersValidator,
//            IAccountSettingsClientParametersValidator accountSettingsClientParametersValidator,
//            IAuthClientParametersValidator authClientParametersValidator,
//            IHelpClientParametersValidator helpClientParametersValidator,
//            IMessagesClientParametersValidator messagesClientParametersValidator,
//            ISearchClientParametersValidator searchClientParametersValidator,
//            ITwitterListsClientParametersValidator twitterListsClientParametersValidator,
//            ITrendsClientParametersValidator trendsClientParametersValidator,
//            ITimelineClientParametersValidator timelineClientParametersValidator,
//            ITweetsClientParametersValidator tweetsClientParametersValidator,
//            // IUploadClientParametersValidator uploadClientParametersValidator,
//            IUsersClientParametersValidator usersClientParametersValidator)
//        {
//            this.accountActivityClientParametersValidator = accountActivityClientParametersValidator;
//            this.accountSettingsClientParametersValidator = accountSettingsClientParametersValidator;
//            this.authClientParametersValidator = authClientParametersValidator;
//            this.helpClientParametersValidator = helpClientParametersValidator;
//            this.messagesClientParametersValidator = messagesClientParametersValidator;
//            this.searchClientParametersValidator = searchClientParametersValidator;
//            this.twitterListsClientParametersValidator = twitterListsClientParametersValidator;
//            this.trendsClientParametersValidator = trendsClientParametersValidator;
//            this.timelineClientParametersValidator = timelineClientParametersValidator;
//            this.tweetsClientParametersValidator = tweetsClientParametersValidator;
//            // this.uploadClientParametersValidator = uploadClientParametersValidator;
//            this.usersClientParametersValidator = usersClientParametersValidator;
//        }

//        public void Validate(ICreateAccountActivityWebhookParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetAccountActivityWebhookEnvironmentsParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetAccountActivityEnvironmentWebhooksParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IDeleteAccountActivityWebhookParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ITriggerAccountActivityWebhookCRCParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ISubscribeToAccountActivityParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ICountAccountActivitySubscriptionsParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IIsAccountSubscribedToAccountActivityParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetAccountActivitySubscriptionsParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUnsubscribeFromAccountActivityParameters parameters)
//        {
//            this.accountActivityClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetAccountSettingsParameters parameters)
//        {
//            this.accountSettingsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUpdateAccountSettingsParameters parameters)
//        {
//            this.accountSettingsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUpdateProfileParameters parameters)
//        {
//            this.accountSettingsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUpdateProfileImageParameters parameters)
//        {
//            this.accountSettingsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUpdateProfileBannerParameters parameters)
//        {
//            this.accountSettingsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IRemoveProfileBannerParameters parameters)
//        {
//            this.accountSettingsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ICreateBearerTokenParameters parameters, ITwitterRequest request)
//        {
//            this.authClientParametersValidator.Validate(parameters, request);
//        }

//        public void Validate(IRequestAuthUrlParameters parameters)
//        {
//            this.authClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IRequestCredentialsParameters parameters)
//        {
//            this.authClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IInvalidateAccessTokenParameters parameters, ITwitterRequest request)
//        {
//            this.authClientParametersValidator.Validate(parameters, request);
//        }

//        public void Validate(IInvalidateBearerTokenParameters parameters, ITwitterRequest request)
//        {
//            this.authClientParametersValidator.Validate(parameters, request);
//        }

//        public void Validate(IGetRateLimitsParameters parameters)
//        {
//            this.helpClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetTwitterConfigurationParameters parameters)
//        {
//            this.helpClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetSupportedLanguagesParameters parameters)
//        {
//            this.helpClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetPlaceParameters parameters)
//        {
//            this.helpClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGeoSearchParameters parameters)
//        {
//            this.helpClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGeoSearchReverseParameters parameters)
//        {
//            this.helpClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IPublishMessageParameters parameters)
//        {
//            this.messagesClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IDeleteMessageParameters parameters)
//        {
//            this.messagesClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetMessageParameters parameters)
//        {
//            this.messagesClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetMessagesParameters parameters)
//        {
//            this.messagesClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ICreateListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetListsSubscribedByUserParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUpdateListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IDestroyListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetListsOwnedByUserParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetTweetsFromListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IAddMemberToListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IAddMembersToListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUserListMembershipsParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetMembersOfListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ICheckIfUserIsMemberOfListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IRemoveMemberFromListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IRemoveMembersFromListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ISubscribeToListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUnsubscribeFromListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetListSubscribersParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUserListSubscriptionsParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ICheckIfUserIsSubscriberOfListParameters parameters)
//        {
//            this.twitterListsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ISearchTweetsParameters parameters)
//        {
//            this.searchClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ISearchUsersParameters parameters)
//        {
//            this.searchClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(ICreateSavedSearchParameters parameters)
//        {
//            this.searchClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetSavedSearchParameters parameters)
//        {
//            this.searchClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IListSavedSearchesParameters parameters)
//        {
//            this.searchClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IDestroySavedSearchParameters parameters)
//        {
//            this.searchClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetHomeTimelineParameters parameters)
//        {
//            this.timelineClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUserTimelineParameters parameters)
//        {
//            this.timelineClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetMentionsTimelineParameters parameters)
//        {
//            this.timelineClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetRetweetsOfMeTimelineParameters parameters)
//        {
//            this.timelineClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetTrendsLocationCloseToParameters parameters)
//        {
//            this.trendsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetTrendsAtParameters parameters)
//        {
//            this.trendsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetTrendsLocationParameters parameters)
//        {
//            this.trendsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetTweetParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetTweetsParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IPublishTweetParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IDestroyTweetParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUserFavoriteTweetsParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetRetweetsParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IPublishRetweetParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IDestroyRetweetParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetRetweeterIdsParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IFavoriteTweetParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUnfavoriteTweetParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetOEmbedTweetParameters parameters)
//        {
//            this.tweetsClientParametersValidator.Validate(parameters);
//        }

//        //public void Validate(IUploadParameters parameters)
//        //{
//        //    this.uploadClientParametersValidator.Validate(parameters);
//        //}

//        //public void Validate(IAddMediaMetadataParameters parameters)
//        //{
//        //    this.uploadClientParametersValidator.Validate(parameters);
//        //}

//        public void Validate(IGetUserParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUsersParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetFollowerIdsParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetFollowersParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetFriendIdsParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetFriendsParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetRelationshipBetweenParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetProfileImageParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetAuthenticatedUserParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IBlockUserParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUnblockUserParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IReportUserForSpamParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetBlockedUserIdsParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetBlockedUsersParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IFollowUserParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUnfollowUserParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUserIdsRequestingFriendshipParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUsersRequestingFriendshipParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUserIdsYouRequestedToFollowParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUsersYouRequestedToFollowParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUpdateRelationshipParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetRelationshipsWithParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetUserIdsWhoseRetweetsAreMutedParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetMutedUserIdsParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetMutedUsersParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IMuteUserParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }

//        public void Validate(IUnmuteUserParameters parameters)
//        {
//            this.usersClientParametersValidator.Validate(parameters);
//        }
//    }
//}
