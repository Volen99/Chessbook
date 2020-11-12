import {CredentialsRateLimitsDTO, RateLimitResources} from "../DTO/CredentialsRateLimitsDTO";
import {IEndpointRateLimit} from "../../Public/Models/RateLimits/IEndpointRateLimit";
import {ICredentialsRateLimits} from "../../Public/Models/RateLimits/ICredentialsRateLimits";
import {TwitterEndpointAttribute} from "../Attributes/TwitterEndpointAttribute";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export class CredentialsRateLimits implements ICredentialsRateLimits {

  constructor(credentialsRateLimitsDTO: CredentialsRateLimitsDTO) {
    this.createdAt = DateTime.now;
    this.otherEndpointRateLimits = new Dictionary<TwitterEndpointAttribute, IEndpointRateLimit>();
    this.credentialsRateLimitsDTO = credentialsRateLimitsDTO;
  }

  public createdAt: DateTime; // DateTimeOffset ;

  public credentialsRateLimitsDTO: CredentialsRateLimitsDTO;

  get rateLimitContext(): string {
    let jsonObj;
    if (this.credentialsRateLimitsDTO.rateLimitContext.tryGetValue("access_token", /*out var jsonObj*/)) {
      return null; // return jsonObj.ToObject<string>();
    }

    if (this.credentialsRateLimitsDTO.rateLimitContext.tryGetValue("application", /*out jsonObj*/)) {
      return null; // return jsonObj.ToObject<string>();
    }

    return null;
  }

  get isApplicationOnlyCredentials(): boolean {
    return this.credentialsRateLimitsDTO.rateLimitContext.ContainsKey("application");
  }

  private getRateLimits(getResources: (rr: RateLimitResources) => Dictionary<string, IEndpointRateLimit>, key: string): IEndpointRateLimit {
    let resource = getResources(this.credentialsRateLimitsDTO?.resources);
    if (resource == null) {
      return null;
    }

    let rateLimit: IEndpointRateLimit;
    let out = (value: IEndpointRateLimit): void => {
      rateLimit = value;
    };
    if (!resource.tryGetValue(key, out)) {
      return null;
    }

    return rateLimit;
  }

  public otherEndpointRateLimits: Dictionary<TwitterEndpointAttribute, IEndpointRateLimit>;

  // Account
  get accountLoginVerificationEnrollmentLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.accountRateLimits, "/account/login_verification_enrollment");
  }

  get accountSettingsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.accountRateLimits, "/account/settings");
  }


  get accountUpdateProfileLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.accountRateLimits, "/account/update_profile");
  }

  get accountVerifyCredentialsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.accountRateLimits, "/account/verify_credentials");
  }

  // Application
  get applicationRateLimitStatusLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.applicationRateLimits, "/application/rate_limit_status");
  }

  // Auth
  get authCrossSiteRequestForgeryLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.authRateLimits, "/auth/csrf_token");
  }

  // Block
  get blocksIdsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.blocksRateLimits, "/blocks/ids");
  }

  get blocksListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.blocksRateLimits, "/blocks/list");
  }

  // Business Experience
  get businessExperienceKeywordLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.businessExperienceRateLimits, "/business_experience/keywords");
  }

  // Collections
  get collectionsListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.collectionsRateLimits, "/collections/list");
  }

  get collectionsEntriesLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.collectionsRateLimits, "/collections/entries");
  }

  get collectionsShowLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.collectionsRateLimits, "/collections/show");
  }

  // Contacts
  get contactsUpdatedByLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.contactsRateLimits, "/contacts/uploaded_by");
  }

  get contactsUsersLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.contactsRateLimits, "/contacts/users");
  }

  get contactsAddressBookLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.contactsRateLimits, "/contacts/addressbook");
  }

  get contactsUsersAndUploadedByLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.contactsRateLimits, "/contacts/users_and_uploaded_by");
  }

  get contactsDeleteStatusLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.contactsRateLimits, "/contacts/delete/status");
  }

  // Device
  get deviceTokenLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.deviceRateLimits, "/device/token");
  }

  // DirectMessages
  get directMessagesShowLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.directMessagesRateLimits, "/direct_messages/events/show");
  }

  get directMessagesListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.directMessagesRateLimits, "/direct_messages/events/list");
  }

  // Favorites
  get favoritesListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.favoritesRateLimits, "/favorites/list");
  }

  // Feedback
  get feedbackShowLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.feedbackRateLimits, "/feedback/show/:id");
  }

  get feedbackEventsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.feedbackRateLimits, "/feedback/events");
  }

  // Followers
  get followersIdsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.followersRateLimits, "/followers/ids");
  }

  get followersListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.followersRateLimits, "/followers/list");
  }

  // Friends
  get friendsIdsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendsRateLimits, "/friends/ids");
  }


  get friendsListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendsRateLimits, "/friends/list");
  }

  get friendsFollowingIdsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendsRateLimits, "/friends/following/ids");
  }

  get friendsFollowingListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendsRateLimits, "/friends/following/list");
  }

  // Friendships
  get friendshipsIncomingLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendshipsRateLimits, "/friendships/incoming");
  }

  get friendshipsLookupLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendshipsRateLimits, "/friendships/lookup");
  }

  get friendshipsNoRetweetsIdsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendshipsRateLimits, "/friendships/no_retweets/ids");
  }

  get friendshipsOutgoingLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendshipsRateLimits, "/friendships/outgoing");
  }

  get friendshipsShowLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendshipsRateLimits, "/friendships/show");
  }

  get friendshipsListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.friendshipsRateLimits, "/friendships/list");
  }

  // Geo
  get geoGetPlaceFromIdLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.geoRateLimits, "/geo/id/:place_id");
  }

  get geoReverseGeoCodeLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.geoRateLimits, "/geo/reverse_geocode");
  }

  get geoSearchLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.geoRateLimits, "/geo/search");
  }

  get geoSimilarPlacesLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.geoRateLimits, "/geo/similar_places");
  }

  // Help
  get helpConfigurationLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.helpRateLimits, "/help/configuration");
  }

  get helpLanguagesLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.helpRateLimits, "/help/languages");
  }

  get helpPrivacyLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.helpRateLimits, "/help/privacy");
  }

  get helpSettingsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.helpRateLimits, "/help/settings");
  }

  get helpTosLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.helpRateLimits, "/help/tos");
  }

  // Lists
  get listsListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/list");
  }

  get listsMembersLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/members");
  }

  get listsMembersShowLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/members/show");
  }

  get listsMembershipsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/memberships");
  }

  get listsOwnershipsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/ownerships");
  }

  get listsShowLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/show");
  }

  get listsStatusesLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/statuses");
  }

  get listsSubscribersLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/subscribers");
  }

  get listsSubscribersShowLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/subscribers/show");
  }

  get listsSubscriptionsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.listsRateLimits, "/lists/subscriptions");
  }

  // Media
  get mediaUploadLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.mediaRateLimits, "/media/upload");
  }

  // Moments
  get momentsPermissions(): IEndpointRateLimit {
    return this.getRateLimits(r => r.momentsRateLimits, "/moments/permissions");
  }

  // Mutes
  get mutesUserList(): IEndpointRateLimit {
    return this.getRateLimits(r => r.mutesRateLimits, "/mutes/users/list");
  }

  get mutesUserIds(): IEndpointRateLimit {
    return this.getRateLimits(r => r.mutesRateLimits, "/mutes/users/ids");
  }

  // SavedSearches
  get savedSearchDestroyLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.savedSearchesRateLimits, "/saved_searches/destroy/:id");
  }

  get savedSearchesListLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.savedSearchesRateLimits, "/saved_searches/list");
  }

  get savedSearchesShowIdLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.savedSearchesRateLimits, "/saved_searches/show/:id");
  }

  // Search
  get searchTweetsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.searchRateLimits, "/search/tweets");
  }

  // Statuses
  get statusesFriendsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/friends");
  }

  get statusesHomeTimelineLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/home_timeline");
  }

  get statusesLookupLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/lookup");
  }

  get statusesMentionsTimelineLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/mentions_timeline");
  }

  get statusesOembedLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/oembed");
  }

  get statusesRetweetersIdsLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/retweeters/ids");
  }

  get statusesRetweetsIdLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/retweets/:id");
  }

  get statusesRetweetsOfMeLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/retweets_of_me");
  }

  get statusesShowIdLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/show/:id");
  }

  get statusesUserTimelineLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.statusesRateLimits, "/statuses/user_timeline");
  }

  // Trends
  get trendsAvailableLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.trendsRateLimits, "/trends/available");
  }

  get trendsClosestLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.trendsRateLimits, "/trends/closest");
  }

  get trendsPlaceLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.trendsRateLimits, "/trends/place");
  }

  // Twitter Prompts
  get tweetPromptsReportInteractionLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.tweetPromptsRateLimits, "/tweet_prompts/report_interaction");
  }

  get tweetPromptsShowLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.tweetPromptsRateLimits, "/tweet_prompts/show");
  }

  // Users
  get usersDerivedInfoLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.usersRateLimits, "/users/derived_info");
  }

  get usersLookupLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.usersRateLimits, "/users/lookup");
  }

  get usersProfileBannerLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.usersRateLimits, "/users/profile_banner");
  }

  get usersReportSpamLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.usersRateLimits, "/users/report_spam");
  }

  get usersSearchLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.usersRateLimits, "/users/search");
  }

  get usersShowIdLimit(): IEndpointRateLimit {
    return this.getRateLimits(r => r.usersRateLimits, "/users/show/:id");
  }
}
