import {Inject, InjectionToken} from "@angular/core";

import {IUploadedMediaInfo} from "../../Models/Interfaces/DTO/IUploadedMediaInfo";
import {IMedia} from "../../Models/Interfaces/IMedia";
import {IWebhook} from "../../Models/Interfaces/IWebhook";
import {IAccountSettings} from "../../Models/Interfaces/IAccountSettings";
import {IAccountSettingsDTO} from "../../Models/Interfaces/DTO/IAccountSettingsDTO";
import {ITwitterList} from "../../Models/Interfaces/ITwitterList";
import {ITwitterListDTO} from "../../Models/Interfaces/DTO/ITwitterListDTO";
import {IMessage} from "../../Models/Interfaces/IMessage";
import {IMessageEventDTO} from "../../Models/Interfaces/DTO/Events/IMessageEventDTO";
import {IApp} from "../../Models/Interfaces/IApp";
import {IGetMessageDTO} from "../../Models/Interfaces/DTO/IGetMessageDTO";
import {ICreateMessageDTO} from "../../Models/Interfaces/DTO/ICreateMessageDTO";
import {IMessageEventWithAppDTO} from "../../Models/Interfaces/DTO/IMessageEventWithAppDTO";
import {IRelationshipState} from "../../Models/Interfaces/IRelationshipState";
import {IRelationshipStateDTO} from "../../Models/Interfaces/DTO/IRelationshipStateDTO";
import {IRelationshipDetailsDTO} from "../../Models/Interfaces/DTO/IRelationshipDetailsDTO";
import {ISavedSearch} from "../../Models/Interfaces/ISavedSearch";
import {ISavedSearchDTO} from "../../Models/Interfaces/DTO/ISavedSearchDTO";
import {ISearchResultsDTO} from "../../Models/Interfaces/DTO/ISearchResultsDTO";
import {ISearchResults} from "../../Models/Interfaces/ISearchResults";
import {ITweet} from "../../Models/Interfaces/ITweet";
import {ITweetDTO} from "../../Models/Interfaces/DTO/ITweetDTO";
import {ITweetWithSearchMetadataDTO} from "../../Models/Interfaces/DTO/ITweetWithSearchMetadataDTO";
import {ITweetWithSearchMetadata} from "../../Models/Interfaces/ITweetWithSearchMetadata";
import {IOEmbedTweet} from "../../Models/Interfaces/IOEmbedTweet";
import {IOEmbedTweetDTO} from "../../Models/Interfaces/DTO/IOembedTweetDTO";
import {IUser} from "../../Models/Interfaces/IUser";
import {IUserDTO} from "../../Models/Interfaces/DTO/IUserDTO";
import {IAuthenticatedUser} from "../../Models/Interfaces/IAuthenticatedUser";
import {IWebhookEnvironment} from "../../Models/Interfaces/IWebhookEnvironment";
import {IWebhookDTO} from "../../Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import {IWebhookEnvironmentDTO} from "../../Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentDTO";
import {IWebhookEnvironmentSubscriptions} from "../../Models/Interfaces/IWebhookEnvironmentSubscriptions";
import {IWebhookEnvironmentSubscriptionsDTO} from "../../Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";
import {ITwitterConfiguration} from "../../Models/Interfaces/DTO/ITwitterConfiguration";
import {ITwitterCredentials} from "../../Models/Authentication/TwitterCredentials";
import {IConsumerOnlyCredentials} from "../../Models/Authentication/ConsumerOnlyCredentials";
import {CredentialsRateLimitsDTO} from "../../../Core/DTO/CredentialsRateLimitsDTO";
import {TwitterClientFactories} from "../../../../sharebook/Client/Tools/TwitterClientFactories";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface ITwitterClientFactories {
  // ACCOUNT SETTINGS

  // Creates accountSettings from json
  createAccountSettings(json: string): IAccountSettings;

  createAccountSettings(dto: IAccountSettingsDTO): IAccountSettings;

  // LISTS

  // Create TwitterList from json
  createTwitterList(json: string): ITwitterList;

  createTwitterList(twitterListDTO: ITwitterListDTO): ITwitterList;

  createTwitterLists(listDTOs: Array<ITwitterListDTO>): ITwitterList[];

  // MESSAGE

  // Creates a message from create event message json
  createMessageFromMessageEventWithApp(json: string): IMessage;

  // Creates a Message from json
  createMessage(json: string): IMessage;

  createMessage(messageEventDTO: IMessageEventDTO): IMessage;

  createMessage(messageEventDTO: IMessageEventDTO, app: IApp): IMessage;

  createMessage(getMessageDTO: IGetMessageDTO): IMessage;

  createMessage(createMessageDTO: ICreateMessageDTO): IMessage;

  createMessage(messageEventWithAppDTO: IMessageEventWithAppDTO): IMessage;

  createMessages(eventWithAppDTOs: Array<IMessageEventWithAppDTO>): IMessage[];

  // RELATIONSHIP

  // Creates a relationship state from json
  createRelationshipState(json: string): IRelationshipState;

  createRelationshipState(relationshipStateDTO: IRelationshipStateDTO): IRelationshipState;

  createRelationshipStates(relationshipStateDTOs: IRelationshipStateDTO[]): IRelationshipState[];

  createRelationshipDetails(json: string): IRelationshipState;

  createRelationshipDetails(dto: IRelationshipDetailsDTO): IRelationshipState;

  // SAVED SEARCH

  // Creates a saved search from json
  createSavedSearch(json: string): ISavedSearch;

  createSavedSearch(savedSearchDTO: ISavedSearchDTO): ISavedSearch;

  // SEARCH
  createSearchResult(searchResultsDTO: ISearchResultsDTO): ISearchResults;

  // TWEET

  // Creates a tweet from json
  createTweet(json: string): ITweet;

  createTweet(tweetDTO: ITweetDTO): ITweet;

  createTweets(tweetDTOs: Array<ITweetDTO>): ITweet[];

  createTweetWithSearchMetadata(tweetWithSearchMetadataDTO: ITweetWithSearchMetadataDTO): ITweetWithSearchMetadata;

  // Creates a oembed tweet from json
  createOEmbedTweet(json: string): IOEmbedTweet;

  createOEmbedTweet(oEmbedTweetDTO: IOEmbedTweetDTO): IOEmbedTweet;

  // USER

  // Creates a user from json
  createUser(json: string): IUser;

  createUser(userDTO: IUserDTO): IUser;

  createUsers(usersDTO: Array<IUserDTO>): IUser[];

  // Creates an authenticated user from json
  createAuthenticatedUser(json: string): IAuthenticatedUser;

  createAuthenticatedUser(userDTO: IUserDTO): IAuthenticatedUser;

  // WEBHOOKS

  // Creates a webhook from json
  createWebhook(json: string): IWebhook;

  createWebhook(webhookDTO: IWebhookDTO): IWebhook;

  // Creates a webhook environment from json
  createWebhookEnvironment(json: string): IWebhookEnvironment;

  createWebhookEnvironment(webhookEnvironmentDTO: IWebhookEnvironmentDTO): IWebhookEnvironment;

  // Creates a webhook subscription from json
  createWebhookEnvironmentSubscriptions(json: string): IWebhookEnvironmentSubscriptions;

  createWebhookEnvironmentSubscriptions(webhookEnvironmentSubscriptionsDTO: IWebhookEnvironmentSubscriptionsDTO): IWebhookEnvironmentSubscriptions;

  // HELP

  // Creates a twitter configuration from json
  createTwitterConfiguration(json: string): ITwitterConfiguration;

  // RATE LIMITS

  // Creates a RateLimits object from json
  createRateLimits(json: string): ICredentialsRateLimits;

  createRateLimits(dto: CredentialsRateLimitsDTO): ICredentialsRateLimits;

  // CREDENTIALS

  // Creates credentials from json
  createTwitterCredentials(json: string): ITwitterCredentials;

  // Creates consumer credentials from json
  createConsumerCredentials(json: string): IConsumerOnlyCredentials;

  // MEDIA

  /// Creates a media from json
  createMedia(json: string): IMedia;

  // Creates uploaded media information from json
  createUploadedMediaInfo(json: string): IUploadedMediaInfo;

  // SEARCH

  // Creates search results from json
  createSearchResult(json: string): ISearchResults;
}


export const ITwitterClientFactoriesToken = new InjectionToken<ITwitterClientFactories>('ITwitterClientFactories', {
  providedIn: 'root',
  factory: () => new TwitterClientFactories(Inject(TwitterClient), Inject(JsonObjectConverter)),
});
