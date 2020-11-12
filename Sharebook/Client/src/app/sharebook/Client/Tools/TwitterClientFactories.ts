import {Inject, Injectable} from "@angular/core";

import {ITwitterClientFactories} from "../../../core/Public/Client/Tools/ITwitterClientFactories";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {AccountSettings} from "../../../core/Core/Models/AccountSettings";
import {IAccountSettingsDTO} from "../../../core/Public/Models/Interfaces/DTO/IAccountSettingsDTO";
import {IAccountSettings} from "../../../core/Public/Models/Interfaces/IAccountSettings";
import {ITwitterListDTO} from "../../../core/Public/Models/Interfaces/DTO/ITwitterListDTO";
import {ITwitterList} from 'src/app/core/Public/Models/Interfaces/ITwitterList';
import {TwitterList} from "../../../core/Core/Models/TwitterList";
import {IMessageEventDTO} from "../../../core/Public/Models/Interfaces/DTO/Events/IMessageEventDTO";
import {IApp} from "../../../core/Public/Models/Interfaces/IApp";
import {IMessage} from "../../../core/Public/Models/Interfaces/IMessage";
import {IGetMessageDTO} from "../../../core/Public/Models/Interfaces/DTO/IGetMessageDTO";
import {ICreateMessageDTO} from "../../../core/Public/Models/Interfaces/DTO/ICreateMessageDTO";
import {IMessageEventWithAppDTO} from "../../../core/Public/Models/Interfaces/DTO/IMessageEventWithAppDTO";
import {Message} from "../../../core/Core/Models/Message";
import {EventType} from "../../../core/Public/Models/Enum/EventType";
import {IRelationshipState} from "../../../core/Public/Models/Interfaces/IRelationshipState";
import {IRelationshipStateDTO} from "../../../core/Public/Models/Interfaces/DTO/IRelationshipStateDTO";
import {RelationshipState} from "../../../core/Core/Models/TwitterEntities/RelationshipState";
import {IRelationshipDetails} from "../../../core/Public/Models/Interfaces/IRelationshipDetails";
import {IRelationshipDetailsDTO} from "../../../core/Public/Models/Interfaces/DTO/IRelationshipDetailsDTO";
import {RelationshipDetails} from "../../../core/Core/Models/TwitterEntities/RelationshipDetails";
import {ISavedSearch} from "../../../core/Public/Models/Interfaces/ISavedSearch";
import {SavedSearch} from "../../../core/Core/Models/SavedSearch";
import {ISearchResultsDTO} from "../../../core/Public/Models/Interfaces/DTO/ISearchResultsDTO";
import {ISearchResults} from "../../../core/Public/Models/Interfaces/ISearchResults";
import {SearchResults} from "../../../core/Core/Models/Properties/SearchResults";
import {SearchResultsDTO} from "../../../core/Core/DTO/SearchResultDTO";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {ITweet} from "../../../core/Public/Models/Interfaces/ITweet";
import {Tweet} from "../../../core/Core/Models/Tweet";
import {ITweetWithSearchMetadataDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetWithSearchMetadataDTO";
import {ITweetWithSearchMetadata} from "../../../core/Public/Models/Interfaces/ITweetWithSearchMetadata";
import {TweetWithSearchMetadata} from "../../../logic/TweetWithSearchMetadata";
import {IOEmbedTweet} from "../../../core/Public/Models/Interfaces/IOEmbedTweet";
import {IOEmbedTweetDTO} from "../../../core/Public/Models/Interfaces/DTO/IOembedTweetDTO";
import {OEmbedTweet} from "../../../core/Core/Models/OEmbedTweet";
import {IUser} from "../../../core/Public/Models/Interfaces/IUser";
import {IUserDTO} from "../../../core/Public/Models/Interfaces/DTO/IUserDTO";
import {User} from "../../../core/Core/Models/User";
import {IAuthenticatedUser} from "../../../core/Public/Models/Interfaces/IAuthenticatedUser";
import {AuthenticatedUser} from "../../../core/Core/Models/AuthenticatedUser";
import {IWebhookDTO} from "../../../core/Public/Models/Interfaces/DTO/Webhooks/IWebhookDTO";
import {IWebhook} from "../../../core/Public/Models/Interfaces/IWebhook";
import {WebhookDTO} from "../../../core/Core/DTO/Webhooks/WebhookDTO";
import {Webhook} from "../../../core/Core/Models/Webhook";
import {IWebhookEnvironment} from "../../../core/Public/Models/Interfaces/IWebhookEnvironment";
import {IWebhookEnvironmentDTO} from "../../../core/Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentDTO";
import {WebhookEnvironment} from "../../../core/Core/Models/WebhookEnvironment";
import {IWebhookEnvironmentSubscriptionsDTO} from "../../../core/Public/Models/Interfaces/DTO/Webhooks/IWebhookEnvironmentSubscriptionsDTO";
import {IWebhookEnvironmentSubscriptions} from 'src/app/core/Public/Models/Interfaces/IWebhookEnvironmentSubscriptions';
import {WebhookEnvironmentSubscriptions} from "../../../core/Core/Models/WebhookEnvironmentSubscriptions";
import {ITwitterConfiguration} from "../../../core/Public/Models/Interfaces/DTO/ITwitterConfiguration";
import {CredentialsRateLimitsDTO} from "../../../core/Core/DTO/CredentialsRateLimitsDTO";
import {CredentialsRateLimits} from "../../../core/Core/Models/CredentialsRateLimits";
import {ITwitterCredentials, TwitterCredentials} from "../../../core/Public/Models/Authentication/TwitterCredentials";
import {ConsumerOnlyCredentials, IConsumerOnlyCredentials} from "../../../core/Public/Models/Authentication/ConsumerOnlyCredentials";
import {IMedia} from "../../../core/Public/Models/Interfaces/IMedia";
import {Media} from "../../../core/Core/Models/Media";
import {IUploadedMediaInfo} from "../../../core/Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import {IJsonObjectConverter, IJsonObjectConverterToken} from 'src/app/core/Core/Helpers/IJsonObjectConverter';
import {ISavedSearchDTO} from "../../../core/Public/Models/Interfaces/DTO/ISavedSearchDTO";
import {ICredentialsRateLimits} from "../../../core/Public/Models/RateLimits/ICredentialsRateLimits";
import Type from "typescript-dotnet-commonjs/System/Types";
import IDictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/IDictionary";

@Injectable({
  providedIn: 'root',
})
export class TwitterClientFactories implements ITwitterClientFactories {
  private readonly _client: ITwitterClient;
  private readonly _jsonObjectConverter: IJsonObjectConverter;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IJsonObjectConverterToken) jsonObjectConverter: IJsonObjectConverter) {
    this._client = client;
    this._jsonObjectConverter = jsonObjectConverter;
  }

  public createAccountSettings(jsonOrAccountSettingsDTO: string | IAccountSettingsDTO): IAccountSettings {
    let accountSettingsDTOCurrent: IAccountSettingsDTO;
    if (Type.isString(jsonOrAccountSettingsDTO)) {
      accountSettingsDTOCurrent = this._jsonObjectConverter.Deserialize<IAccountSettingsDTO>(jsonOrAccountSettingsDTO);
    } else {
      accountSettingsDTOCurrent = jsonOrAccountSettingsDTO;
    }

    if (accountSettingsDTOCurrent == null) {
      return null;
    }

    return new AccountSettings(accountSettingsDTOCurrent);
  }

  public createTwitterList(jsonOrListDTO: string | ITwitterListDTO): ITwitterList {
    if (Type.isString(jsonOrListDTO)) {
      let listDTO = this._jsonObjectConverter.Deserialize<ITwitterListDTO>(jsonOrListDTO);
      return this.createTwitterList(listDTO);
    } else {
      if (jsonOrListDTO == null) {
        return null;
      }

      return new TwitterList(jsonOrListDTO, this._client);
    }
  }

  public createTwitterLists(listDTOs: Array<ITwitterListDTO>): ITwitterList[] {
    return [...listDTOs]?.map(this.createTwitterList);
  }

  public createMessage(jsonOrMessageDTO: string | IGetMessageDTO | ICreateMessageDTO | IMessageEventDTO | IMessageEventWithAppDTO,
                       app?: IApp): IMessage {
    if (Type.isString(jsonOrMessageDTO)) {
      let eventWithAppDTO = this._jsonObjectConverter.Deserialize<IMessageEventDTO>(jsonOrMessageDTO);
      return this.createMessage(eventWithAppDTO); // TODO: Beware! Recursion!
    } else if (this.isIGetMessageDTO(jsonOrMessageDTO)) {
      return this._buildMessage(jsonOrMessageDTO.messageEvent, jsonOrMessageDTO.apps);
    } else if (this.isICreateMessageDTO(jsonOrMessageDTO)) {
      return this.createMessage(jsonOrMessageDTO?.messageEvent); // TODO: Beware! Recursion!
    } else if (this.isIMessageEventDTO(jsonOrMessageDTO)) {
      if (jsonOrMessageDTO == null) {
        return null;
      }

      if (app) {
        return new Message(jsonOrMessageDTO, app, this._client);
      }

      return new Message(jsonOrMessageDTO, null, this._client);
    } else if (this.isIMessageEventWithAppDTO(jsonOrMessageDTO)) {

      // @ts-ignore
      return new Message(jsonOrMessageDTO.messageEvent, jsonOrMessageDTO.app, this._client);
    }
  }

  public createMessages(eventWithAppDTOs: Iterable<IMessageEventWithAppDTO>): IMessage[] {
    // @ts-ignore
    return [...eventWithAppDTOs]?.map(this.createMessage);
  }

  public createMessageFromMessageEventWithApp(json: string): IMessage {
    let eventWithAppDTO = this._jsonObjectConverter.Deserialize<IMessageEventWithAppDTO>(json);

    if (eventWithAppDTO.messageEvent == null) {
      return null;
    }

    return this.createMessage(eventWithAppDTO);
  }

  private _buildMessage(messageEventDTO: IMessageEventDTO, apps: IDictionary<number, IApp>): IMessage {
    if (messageEventDTO.type !== EventType.MessageCreate) {
      return null;
    }

    // Get the app that was used to send this message.
    // Note that we don't always get the App ID.
    // Also assume that some apps could be missing from the dictionary.
    let app: IApp = null;
    let out = (value: IApp): void => {
      app = value;
    };
    if (messageEventDTO.messageCreate.sourceAppId != null) {
      apps.tryGetValue(messageEventDTO.messageCreate.sourceAppId, out);
    }

    return new Message(messageEventDTO, app, this._client);
  }

  public createRelationshipState(jsonOrStateDTO: string | IRelationshipStateDTO): IRelationshipState {
    let stateDTOCurrent: IRelationshipStateDTO;
    if (Type.isString(jsonOrStateDTO)) {
      stateDTOCurrent = this._jsonObjectConverter.Deserialize<IRelationshipStateDTO>(jsonOrStateDTO);
    } else {
      stateDTOCurrent = jsonOrStateDTO;
    }

    return stateDTOCurrent == null ? null : new RelationshipState(stateDTOCurrent);
  }

  public createRelationshipStates(relationshipStateDTOs: IRelationshipStateDTO[]): IRelationshipState[] {
    if (relationshipStateDTOs == null) {
      return new Array<IRelationshipState>(0); // new IRelationshipState[0];
    }

    return relationshipStateDTOs.map(dto => this._client.factories.createRelationshipState(dto));
  }

  public createRelationshipDetails(jsonOrRelationshipDetails: string | IRelationshipDetailsDTO): IRelationshipDetails {
    let relationshipDetailsCurrent: IRelationshipDetailsDTO;
    if (Type.isString(jsonOrRelationshipDetails)) {
      relationshipDetailsCurrent = this._jsonObjectConverter.Deserialize<IRelationshipDetailsDTO>(jsonOrRelationshipDetails);
    } else {
      relationshipDetailsCurrent = jsonOrRelationshipDetails;
    }

    return relationshipDetailsCurrent == null ? null : new RelationshipDetails(relationshipDetailsCurrent);
  }

  public createSavedSearch(jsonOrSavedSearchDTO: string | ISavedSearchDTO): ISavedSearch {
    let savedSearchCurrent: ISavedSearchDTO;
    if (Type.isString(jsonOrSavedSearchDTO)) {
      savedSearchCurrent = this._jsonObjectConverter.Deserialize<ISavedSearchDTO>(jsonOrSavedSearchDTO);
    } else {
      savedSearchCurrent = jsonOrSavedSearchDTO;
    }

    return savedSearchCurrent == null ? null : new SavedSearch(savedSearchCurrent);
  }

  public createSearchResult(jsonOrSearchResultsDTO: string | ISearchResultsDTO): ISearchResults {
    let savedSearchDTOCurrent: ISearchResultsDTO;
    if (Type.isString(jsonOrSearchResultsDTO)) {
      savedSearchDTOCurrent = this._jsonObjectConverter.Deserialize<SearchResultsDTO>(jsonOrSearchResultsDTO);
    } else {
      savedSearchDTOCurrent = jsonOrSearchResultsDTO;
    }

    let tweets = savedSearchDTOCurrent?.tweetDTOs?.map(this.createTweetWithSearchMetadata);
    return new SearchResults(tweets, savedSearchDTOCurrent?.searchMetadata);
  }

  public createTweet(jsonOrTweetDTO: string | ITweetDTO): ITweet {
    let tweetDTOCurrent: ITweetDTO;
    if (Type.isString(jsonOrTweetDTO)) {
      tweetDTOCurrent = this._jsonObjectConverter.Deserialize<ITweetDTO>(jsonOrTweetDTO);
    } else {
      tweetDTOCurrent = jsonOrTweetDTO;
    }

    if (tweetDTOCurrent == null) {
      return null;
    }

    return new Tweet(tweetDTOCurrent, this._client.config.tweetMode, this._client);
  }

  public createTweets(tweetDTOs: Array<ITweetDTO>): ITweet[] {
    return [...tweetDTOs]?.map(this.createTweet);
  }

  public createTweetWithSearchMetadata(tweetWithSearchMetadataDTO: ITweetWithSearchMetadataDTO): ITweetWithSearchMetadata {
    if (tweetWithSearchMetadataDTO == null) {
      return null;
    }

    return new TweetWithSearchMetadata(tweetWithSearchMetadataDTO, this._client.config.tweetMode, this._client);
  }

  public createOEmbedTweet(jsonOrOEmbedTweetDTO: string | IOEmbedTweetDTO): IOEmbedTweet {
    let embedTweetDTOCurrent: IOEmbedTweetDTO;
    if (Type.isString(jsonOrOEmbedTweetDTO)) {
      embedTweetDTOCurrent = this._jsonObjectConverter.Deserialize<IOEmbedTweetDTO>(jsonOrOEmbedTweetDTO);
    } else {
      embedTweetDTOCurrent = jsonOrOEmbedTweetDTO;
    }

    if (embedTweetDTOCurrent == null) {
      return null;
    }

    return new OEmbedTweet(embedTweetDTOCurrent);
  }

  public createUser(jsonOrUserDTO: string | IUserDTO): IUser {
    let userDTOCurrent: IUserDTO;
    if (Type.isString(jsonOrUserDTO)) {
      userDTOCurrent = this._jsonObjectConverter.Deserialize<IUserDTO>(jsonOrUserDTO);
    } else {
      userDTOCurrent = jsonOrUserDTO;
    }

    if (userDTOCurrent == null) {
      return null;
    }

    return new User(userDTOCurrent, this._client);
  }

  public createUsers(usersDTO: Array<IUserDTO>): IUser[] {
    return [...usersDTO]?.map(this.createUser);
  }

  public createAuthenticatedUser(jsonOrUserDTO: string | IUserDTO): IAuthenticatedUser {
    let userDTOCurrent: IUserDTO;
    if (Type.isString(jsonOrUserDTO)) {
      userDTOCurrent = this._jsonObjectConverter.Deserialize<IUserDTO>(jsonOrUserDTO);
    } else {
      userDTOCurrent = jsonOrUserDTO;
    }

    if (userDTOCurrent == null) {
      return null;
    }

    return new AuthenticatedUser(userDTOCurrent, this._client);
  }

  public createWebhook(jsonOrWebhookDTO: string | IWebhookDTO): IWebhook {
    let webhookDTOCurrent: IWebhookDTO;
    if (Type.isString(jsonOrWebhookDTO)) {
      webhookDTOCurrent = this._jsonObjectConverter.Deserialize<WebhookDTO>(jsonOrWebhookDTO);
    } else {
      webhookDTOCurrent = jsonOrWebhookDTO;
    }

    if (webhookDTOCurrent == null) {
      return null;
    }

    return new Webhook(webhookDTOCurrent);
  }

  public createWebhookEnvironment(jsonOrWebhookEnvironmentDTO: string | IWebhookEnvironmentDTO): IWebhookEnvironment {
    let webhookEnvironmentDTOCurrent: IWebhookEnvironmentDTO;
    if (Type.isString(jsonOrWebhookEnvironmentDTO)) {
      webhookEnvironmentDTOCurrent = this._jsonObjectConverter.Deserialize<IWebhookEnvironmentDTO>(jsonOrWebhookEnvironmentDTO);
    } else {
      webhookEnvironmentDTOCurrent = jsonOrWebhookEnvironmentDTO;
    }

    if (webhookEnvironmentDTOCurrent == null) {
      return null;
    }

    return new WebhookEnvironment(webhookEnvironmentDTOCurrent, this._client);
  }

  public createWebhookEnvironmentSubscriptions(jsonOrWebhookEnvironmentSubscriptionsDTO: string | IWebhookEnvironmentSubscriptionsDTO): IWebhookEnvironmentSubscriptions {
    let webhookEnvironmentSubscriptionsDTOCurrent: IWebhookEnvironmentSubscriptionsDTO;
    if (Type.isString(jsonOrWebhookEnvironmentSubscriptionsDTO)) {
      webhookEnvironmentSubscriptionsDTOCurrent = this._jsonObjectConverter.Deserialize<IWebhookEnvironmentSubscriptionsDTO>(jsonOrWebhookEnvironmentSubscriptionsDTO);
    } else {
      webhookEnvironmentSubscriptionsDTOCurrent = jsonOrWebhookEnvironmentSubscriptionsDTO;
    }

    if (webhookEnvironmentSubscriptionsDTOCurrent == null) {
      return null;
    }

    return new WebhookEnvironmentSubscriptions(webhookEnvironmentSubscriptionsDTOCurrent, this._client);
  }

  public createTwitterConfiguration(json: string): ITwitterConfiguration {
    return this._jsonObjectConverter.Deserialize<ITwitterConfiguration>(json);
  }

  public createRateLimits(jsonOrCredentialsRateLimitsDTO: string | CredentialsRateLimitsDTO): ICredentialsRateLimits {
    let credentialsRateLimitsDTOCurrent: CredentialsRateLimitsDTO;
    if (Type.isString(jsonOrCredentialsRateLimitsDTO)) {
      credentialsRateLimitsDTOCurrent = this._jsonObjectConverter.Deserialize<CredentialsRateLimitsDTO>(jsonOrCredentialsRateLimitsDTO);
    } else {
      credentialsRateLimitsDTOCurrent = jsonOrCredentialsRateLimitsDTO;
    }

    if (credentialsRateLimitsDTOCurrent == null) {
      return null;
    }

    return new CredentialsRateLimits(credentialsRateLimitsDTOCurrent);
  }

  public createTwitterCredentials(json: string): ITwitterCredentials {
    return this._jsonObjectConverter.Deserialize<TwitterCredentials>(json);
  }

  public createConsumerCredentials(json: string): IConsumerOnlyCredentials {
    return this._jsonObjectConverter.Deserialize<ConsumerOnlyCredentials>(json);
  }

  public createMedia(json: string): IMedia {
    return this._jsonObjectConverter.Deserialize<Media>(json);
  }

  public createUploadedMediaInfo(json: string): IUploadedMediaInfo {
    return this._jsonObjectConverter.Deserialize<IUploadedMediaInfo>(json);
  }

  private isIGetMessageDTO(jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto: any):
    jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto is IGetMessageDTO {
    return (jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto as IGetMessageDTO).apps !== undefined;
  }

  private isICreateMessageDTO(jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto: any):
    jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto is ICreateMessageDTO {
    return (jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto as ICreateMessageDTO).messageEvent !== undefined;
  }

  private isIMessageEventDTO(jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto: any):
    jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto is IMessageEventDTO {
    return (jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto as IMessageEventDTO).messageCreate !== undefined;
  }

  private isIMessageEventWithAppDTO(jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto: any):
    jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto is IMessageEventWithAppDTO {
    return (jsonOrGetMessageDtoOrCreateMessageDtoOrMessageEventDtoOrMessageEverWithAppDto as IMessageEventWithAppDTO).app !== undefined;
  }
}
