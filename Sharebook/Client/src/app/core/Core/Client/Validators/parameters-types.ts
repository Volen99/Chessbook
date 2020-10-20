import {ICreateAccountActivityWebhookParameters} from "../../../Public/Parameters/AccountActivity/RegisterAccountActivityWebhookParameters";
import {IGetAccountActivityWebhookEnvironmentsParameters} from "../../../Public/Parameters/AccountActivity/GetAccountActivityWebhookEnvironmentsParameters";
import {IGetAccountActivityEnvironmentWebhooksParameters} from "../../../Public/Parameters/AccountActivity/GetAccountActivityEnvironmentWebhooksParameters";
import {IDeleteAccountActivityWebhookParameters} from "../../../Public/Parameters/AccountActivity/RemoveAccountActivityWebhookParameters";
import {ITriggerAccountActivityWebhookCRCParameters} from "../../../Public/Parameters/AccountActivity/TriggerAccountActivityCRCParameters";
import {ISubscribeToAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/SubscribeToAllEnvironmentEventsParameters";
import {ICountAccountActivitySubscriptionsParameters} from "../../../Public/Parameters/AccountActivity/CountNumberOfSubscriptionsParameters";
import {IIsAccountSubscribedToAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/IsAccountSubscribedToAppAccountActivityParameters";
import {IGetAccountActivitySubscriptionsParameters} from "../../../Public/Parameters/AccountActivity/GetListOfSubscriptionsParameters";
import {IUnsubscribeFromAccountActivityParameters} from "../../../Public/Parameters/AccountActivity/UnsubscribeFromAccountActivityParameters";
import {IUpdateProfileParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUpdateProfileImageParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {IRemoveProfileBannerParameters} from "../../../Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {ICreateBearerTokenParameters} from "../../../Public/Parameters/Auth/CreateBearerTokenParameters";
import {IRequestAuthUrlParameters} from "../../../Public/Parameters/Auth/IRequestAuthUrlParameters";
import {IRequestCredentialsParameters} from "../../../Public/Parameters/Auth/RequestCredentialsParameters";
import {IInvalidateAccessTokenParameters} from "../../../Public/Parameters/Auth/InvalidateAccessTokenParameters";
import {IInvalidateBearerTokenParameters} from "../../../Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {IGetRateLimitsParameters} from "../../../Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IGetTwitterConfigurationParameters} from "../../../Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../../Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../../Public/Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../../Public/Parameters/HelpClient/GeoSearchParameters";
import {IGeoSearchReverseParameters} from "../../../Public/Parameters/HelpClient/GeoSearchReverseParameters";
import {IPublishMessageParameters} from "../../../Public/Parameters/MessageClient/PublishMessageParameters";
import {IDeleteMessageParameters} from "../../../Public/Parameters/MessageClient/DestroyMessageParameters";
import {IGetMessageParameters} from "../../../Public/Parameters/MessageClient/GetMessageParameters";
import {IGetMessagesParameters} from "../../../Public/Parameters/MessageClient/GetMessagesParameters";
import {ICreateListParameters} from "../../../Public/Parameters/ListsClient/CreateListParameters";
import {IGetListParameters} from "../../../Public/Parameters/ListsClient/GetListParameters";
import {IGetListsSubscribedByUserParameters} from "../../../Public/Parameters/ListsClient/GetListsSubscribedByUserParameters";
import {IUpdateListParameters} from "../../../Public/Parameters/ListsClient/UpdateListParameters";
import {IDestroyListParameters} from "../../../Public/Parameters/ListsClient/DestroyListParameters";
import {IGetListsOwnedByAccountParameters} from "../../../Public/Parameters/ListsClient/GetListsOwnedByAccountParameters";
import {IGetListsOwnedByUserParameters} from "../../../Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {IGetTweetsFromListParameters} from "../../../Public/Parameters/ListsClient/GetTweetsFromListParameters";
import {IAddMemberToListParameters} from "../../../Public/Parameters/ListsClient/Members/AddMemberToListParameters";
import {IAddMembersToListParameters} from "../../../Public/Parameters/ListsClient/Members/AddMembersToListParameters";
import {IGetUserListMembershipsParameters} from "../../../Public/Parameters/ListsClient/Members/GetUserListMembershipsParameters";
import {IGetMembersOfListParameters} from "../../../Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {ICheckIfUserIsMemberOfListParameters} from "../../../Public/Parameters/ListsClient/Members/CheckIfUserIsMemberOfListParameters";
import {IRemoveMemberFromListParameters} from "../../../Public/Parameters/ListsClient/Members/RemoveMemberFromListParameters";
import {IRemoveMembersFromListParameters} from "../../../Public/Parameters/ListsClient/Members/RemoveMembersFromListParameters";
import {IGetAccountListMembershipsParameters} from "../../../Public/Parameters/ListsClient/Members/GetAccountListMembershipsParameters";
import {ISubscribeToListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/SubscribeToListParameters";
import {IUnsubscribeFromListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/UnsubscribeFromListParameters";
import {IGetListSubscribersParameters} from "../../../Public/Parameters/ListsClient/Subscribers/GetListSubscribersParameters";
import {IGetAccountListSubscriptionsParameters} from "../../../Public/Parameters/ListsClient/Subscribers/GetAccountListSubscriptionsParameters";
import {IGetUserListSubscriptionsParameters} from "../../../Public/Parameters/ListsClient/Subscribers/GetUserListSubscriptionsParameters";
import {ICheckIfUserIsSubscriberOfListParameters} from "../../../Public/Parameters/ListsClient/Subscribers/CheckIfUserIsSubscriberOfListParameters";
import {ISearchTweetsParameters} from "../../../Public/Parameters/Search/SearchTweetsParameters";
import {ISearchUsersParameters} from "../../../Public/Parameters/Search/SearchUsersParameters";
import {ICreateSavedSearchParameters} from "../../../Public/Parameters/Search/CreateSavedSearchParameters";
import {IGetSavedSearchParameters} from "../../../Public/Parameters/Search/GetSavedSearchParameters";
import {IListSavedSearchesParameters} from "../../../Public/Parameters/Search/ListSavedSearchesParameters";
import {IDestroySavedSearchParameters} from "../../../Public/Parameters/Search/DestroySavedSearchParameters";
import {IGetHomeTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetUserTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {IGetTrendsLocationCloseToParameters} from "../../../Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {IGetTrendsAtParameters} from "../../../Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsLocationParameters} from "../../../Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {IGetTweetParameters} from "../../../Public/Parameters/TweetsClient/GetTweetParameters";
import {IGetTweetsParameters} from "../../../Public/Parameters/TweetsClient/GetTweetsParameters";
import {IPublishTweetParameters} from "../../../Public/Parameters/TweetsClient/PublishTweetParameters";
import {IDestroyTweetParameters} from "../../../Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IGetUserFavoriteTweetsParameters} from "../../../Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {IGetRetweetsParameters} from "../../../Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IPublishRetweetParameters} from "../../../Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IDestroyRetweetParameters} from "../../../Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IGetRetweeterIdsParameters} from "../../../Public/Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IFavoriteTweetParameters} from "../../../Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IUnfavoriteTweetParameters} from "../../../Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IGetOEmbedTweetParameters} from "../../../Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {IUploadParameters} from "../../../Public/Parameters/Upload/UploadBinaryParameters";
import {IGetUserParameters} from "../../../Public/Parameters/UsersClient/GetUserParameters";
import {IGetUsersParameters} from "../../../Public/Parameters/UsersClient/GetUsersParameters";
import {IGetFollowerIdsParameters} from "../../../Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {IGetFollowersParameters} from "../../../Public/Parameters/UsersClient/GetFollowersParameters";
import {IGetFriendIdsParameters} from "../../../Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IGetFriendsParameters} from "../../../Public/Parameters/UsersClient/GetFriendsParameters";
import {IGetRelationshipBetweenParameters} from "../../../Public/Parameters/UsersClient/GetRelationshipBetweenParameters";
import {IGetProfileImageParameters} from "../../../Public/Parameters/UsersClient/GetProfileImageParameters";
import {IGetAuthenticatedUserParameters} from "../../../Public/Parameters/AccountClient/GetAuthenticatedUserParameters";
import {IBlockUserParameters} from "../../../Public/Parameters/AccountClient/BlockUserParameters";
import {IUnblockUserParameters} from "../../../Public/Parameters/AccountClient/UnblockUserParameters";
import {IReportUserForSpamParameters} from "../../../Public/Parameters/AccountClient/ReportUserForSpamParameters";
import {IGetBlockedUserIdsParameters} from "../../../Public/Parameters/AccountClient/GetBlockedUserIdsParameter";
import {IGetBlockedUsersParameters} from "../../../Public/Parameters/AccountClient/GetBlockedUsersParameter";
import {IFollowUserParameters} from "../../../Public/Parameters/AccountClient/FollowUserParameters";
import {IUnfollowUserParameters} from "../../../Public/Parameters/AccountClient/UnfollowUserParameters";
import {IGetUserIdsRequestingFriendshipParameters} from "../../../Public/Parameters/AccountClient/GetUserIdsRequestingFriendshipParameters";
import {IGetUsersRequestingFriendshipParameters} from "../../../Public/Parameters/AccountClient/GetUsersRequestingFriendshipParameters";
import {IGetUserIdsYouRequestedToFollowParameters} from "../../../Public/Parameters/AccountClient/GetUserIdsYouRequestedToFollowParameters";
import {IGetUsersYouRequestedToFollowParameters} from "../../../Public/Parameters/AccountClient/GetUsersYouRequestedToFollowParameters";
import {IUpdateRelationshipParameters} from "../../../Public/Parameters/AccountClient/UpdateRelationshipParameters";
import {IGetRelationshipsWithParameters} from "../../../Public/Parameters/AccountClient/GetRelationshipsWithParameters";
import {IGetUserIdsWhoseRetweetsAreMutedParameters} from "../../../Public/Parameters/AccountClient/GetUserIdsWhoseRetweetsAreMutedParameters";
import {IGetMutedUserIdsParameters} from "../../../Public/Parameters/AccountClient/GetMutedUserIdsParameters";
import {IGetMutedUsersParameters} from "../../../Public/Parameters/AccountClient/GetMutedUsersParameters";
import {IMuteUserParameters} from "../../../Public/Parameters/AccountClient/MuteUserParameters";
import {IUnmuteUserParameters} from "../../../Public/Parameters/AccountClient/UnMuteUserParameters";
import {IUpdateAccountSettingsParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IGetAccountSettingsParameters} from "../../../Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";

export type AccountActivityParameters = ICreateAccountActivityWebhookParameters
  | IGetAccountActivityWebhookEnvironmentsParameters
  | IGetAccountActivityEnvironmentWebhooksParameters
  | IDeleteAccountActivityWebhookParameters
  | ITriggerAccountActivityWebhookCRCParameters
  | ISubscribeToAccountActivityParameters
  | ICountAccountActivitySubscriptionsParameters
  | IIsAccountSubscribedToAccountActivityParameters
  | IGetAccountActivitySubscriptionsParameters
  | IUnsubscribeFromAccountActivityParameters;

export type AccountSettingsParameters = IGetAccountSettingsParameters
  | IUpdateAccountSettingsParameters
  | IUpdateProfileParameters
  | IUpdateProfileImageParameters
  | IUpdateProfileBannerParameters
  | IRemoveProfileBannerParameters;

export type AuthParameters = ICreateBearerTokenParameters
  | IRequestAuthUrlParameters
  | IRequestCredentialsParameters
  | IInvalidateAccessTokenParameters
  | IInvalidateBearerTokenParameters;

export type HelpParameters = IGetRateLimitsParameters
  | IGetTwitterConfigurationParameters
  | IGetSupportedLanguagesParameters
  | IGetPlaceParameters
  | IGeoSearchParameters
  | IGeoSearchReverseParameters;

export type MessagesParameters = IPublishMessageParameters
  | IDeleteMessageParameters
  | IGetMessageParameters
  | IGetMessagesParameters;

export type SearchParameters = ISearchTweetsParameters
  | ISearchUsersParameters
  | ICreateSavedSearchParameters
  | IGetSavedSearchParameters
  | IListSavedSearchesParameters
  | IDestroySavedSearchParameters;

export type TwitterListParameters = ICreateListParameters
  | IGetListParameters
  | IGetListsSubscribedByUserParameters
  | IUpdateListParameters
  | IDestroyListParameters
  | IGetListsOwnedByAccountParameters
  | IGetListsOwnedByUserParameters
  | IGetTweetsFromListParameters
  | IAddMemberToListParameters           // MEMBERS
  | IAddMembersToListParameters
  | IGetUserListMembershipsParameters
  | IGetMembersOfListParameters
  | ICheckIfUserIsMemberOfListParameters
  | IRemoveMemberFromListParameters
  | IRemoveMembersFromListParameters
  | IGetAccountListMembershipsParameters
  | ISubscribeToListParameters            // SUBSCRIBERS
  | IUnsubscribeFromListParameters
  | IGetListSubscribersParameters
  | IGetAccountListSubscriptionsParameters
  | IGetUserListSubscriptionsParameters
  | ICheckIfUserIsSubscriberOfListParameters;

export type TrendsParameters = IGetTrendsLocationCloseToParameters
  | IGetTrendsAtParameters
  | IGetTrendsLocationParameters;

export type TimelineParameters = IGetHomeTimelineParameters
  | IGetUserTimelineParameters
  | IGetMentionsTimelineParameters
  | IGetRetweetsOfMeTimelineParameters;

export type TweetsParameters = IGetTweetParameters
  | IGetTweetsParameters
  | IPublishTweetParameters
  | IDestroyTweetParameters
  | IGetUserFavoriteTweetsParameters
  | IGetRetweetsParameters
  | IPublishRetweetParameters
  | IDestroyRetweetParameters
  | IGetRetweeterIdsParameters
  | IFavoriteTweetParameters
  | IUnfavoriteTweetParameters
  | IGetOEmbedTweetParameters;

export type UploadParameters = IUploadParameters; // | IAddMediaMetadataParameters;

export type UserParameters = IGetAuthenticatedUserParameters
  | IGetUserParameters
  | IGetUsersParameters
  | IGetFollowerIdsParameters
  | IGetFollowersParameters
  | IGetFriendIdsParameters
  | IGetFriendsParameters
  | IGetProfileImageParameters
  | IBlockUserParameters
  | IUnblockUserParameters
  | IReportUserForSpamParameters
  | IGetBlockedUserIdsParameters
  | IGetBlockedUsersParameters
  | IFollowUserParameters
  | IUnfollowUserParameters
  | IGetUserIdsRequestingFriendshipParameters
  | IGetUsersRequestingFriendshipParameters
  | IGetUserIdsYouRequestedToFollowParameters
  | IGetUsersYouRequestedToFollowParameters
  | IUpdateRelationshipParameters              // RELATIONSHIPS
  | IGetRelationshipsWithParameters
  | IGetRelationshipBetweenParameters
  | IGetUserIdsWhoseRetweetsAreMutedParameters    // MUTE
  | IGetMutedUserIdsParameters
  | IGetMutedUsersParameters
  | IMuteUserParameters
  | IUnmuteUserParameters;
