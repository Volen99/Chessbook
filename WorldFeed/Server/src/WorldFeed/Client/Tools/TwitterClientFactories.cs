namespace WorldFeed.Client.Tools
{
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.DTO.Webhooks;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Models.TwitterEntities;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Tools;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;
    using WorldFeed.Common.Public.Models.RateLimits;
    using WorldFeed.Logic;

    public class TwitterClientFactories : ITwitterClientFactories
    {
        private readonly ITwitterClient client;
        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitterClientFactories(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            this.client = client;
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public IAccountSettings CreateAccountSettings(IAccountSettingsDTO dto)
        {
            if (dto == null)
            {
                return null;
            }

            return new AccountSettings(dto);
        }

        public ITwitterList CreateTwitterList(string json)
        {
            var listDTO = this.jsonObjectConverter.Deserialize<ITwitterListDTO>(json);
            return CreateTwitterList(listDTO);
        }

        public ITwitterList CreateTwitterList(ITwitterListDTO twitterListDTO)
        {
            if (twitterListDTO == null)
            {
                return null;
            }

            return new TwitterList(twitterListDTO, this.client);
        }

        public ITwitterList[] CreateTwitterLists(IEnumerable<ITwitterListDTO> listDTOs)
        {
            return listDTOs?.Select(CreateTwitterList).ToArray();
        }

        public IMessage CreateMessage(IMessageEventWithAppDTO messageEventWithAppDTO)
        {
            return new Message(messageEventWithAppDTO.MessageEvent, messageEventWithAppDTO.App, this.client);
        }

        public IMessage[] CreateMessages(IEnumerable<IMessageEventWithAppDTO> eventWithAppDTOs)
        {
            return eventWithAppDTOs?.Select(CreateMessage).ToArray();
        }

        public IMessage CreateMessage(IGetMessageDTO getMessageDTO)
        {
            return _buildMessage(getMessageDTO.MessageEvent, getMessageDTO.Apps);
        }

        public IMessage CreateMessage(ICreateMessageDTO createMessageDTO)
        {
            return CreateMessage(createMessageDTO?.MessageEvent);
        }

        public IMessage CreateMessage(IMessageEventDTO messageEventDTO)
        {
            if (messageEventDTO == null)
            {
                return null;
            }

            return new Message(messageEventDTO, null, this.client);
        }

        public IMessage CreateMessage(IMessageEventDTO messageEventDTO, IApp app)
        {
            if (messageEventDTO == null)
            {
                return null;
            }

            return new Message(messageEventDTO, app, this.client);
        }

        public IMessage CreateMessage(string json)
        {
            var eventWithAppDTO = this.jsonObjectConverter.Deserialize<IMessageEventDTO>(json);
            return CreateMessage(eventWithAppDTO);
        }

        public IMessage CreateMessageFromMessageEventWithApp(string json)
        {
            var eventWithAppDTO = this.jsonObjectConverter.Deserialize<IMessageEventWithAppDTO>(json);

            if (eventWithAppDTO.MessageEvent == null)
            {
                return null;
            }

            return CreateMessage(eventWithAppDTO);
        }

        private IMessage _buildMessage(IMessageEventDTO messageEventDTO, IDictionary<long, IApp> apps)
        {
            if (messageEventDTO.Type != EventType.MessageCreate)
            {
                return null;
            }

            // Get the app that was used to send this message.
            //  Note that we don't always get the App ID.
            //  Also assume that some apps could be missing from the dictionary.
            IApp app = null;
            if (messageEventDTO.MessageCreate.SourceAppId != null)
            {
                apps.TryGetValue(messageEventDTO.MessageCreate.SourceAppId.Value, out app);
            }

            return new Message(messageEventDTO, app, this.client);
        }

        public IRelationshipState CreateRelationshipState(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<IRelationshipStateDTO>(json);
            return CreateRelationshipState(dto);
        }

        public IRelationshipState CreateRelationshipState(IRelationshipStateDTO relationshipStateDTO)
        {
            return relationshipStateDTO == null ? null : new RelationshipState(relationshipStateDTO);
        }

        public IRelationshipState[] CreateRelationshipStates(IRelationshipStateDTO[] relationshipStateDTOs)
        {
            if (relationshipStateDTOs == null)
            {
                return new IRelationshipState[0];
            }

            return relationshipStateDTOs.Select(dto => this.client.Factories.CreateRelationshipState(dto)).ToArray();
        }

        public IRelationshipDetails CreateRelationshipDetails(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<IRelationshipDetailsDTO>(json);
            return CreateRelationshipDetails(dto);
        }

        public IRelationshipDetails CreateRelationshipDetails(IRelationshipDetailsDTO dto)
        {
            return dto == null ? null : new RelationshipDetails(dto);
        }

        public ISavedSearch CreateSavedSearch(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<ISavedSearchDTO>(json);
            return CreateSavedSearch(dto);
        }

        public ISavedSearch CreateSavedSearch(ISavedSearchDTO savedSearchDTO)
        {
            return savedSearchDTO == null ? null : new SavedSearch(savedSearchDTO);
        }

        public ISearchResults CreateSearchResult(ISearchResultsDTO searchResultsDTO)
        {
            var tweets = searchResultsDTO?.TweetDTOs?.Select(CreateTweetWithSearchMetadata);
            return new SearchResults(tweets, searchResultsDTO?.SearchMetadata);
        }

        public ITweet CreateTweet(string json)
        {
            var tweetDTO = this.jsonObjectConverter.Deserialize<ITweetDTO>(json);
            return CreateTweet(tweetDTO);
        }

        public ITweet CreateTweet(ITweetDTO tweetDTO)
        {
            if (tweetDTO == null)
            {
                return null;
            }

            return new Tweet(tweetDTO, this.client.Config.TweetMode, this.client);
        }

        public ITweet[] CreateTweets(IEnumerable<ITweetDTO> tweetDTOs)
        {
            return tweetDTOs?.Select(CreateTweet).ToArray();
        }

        public ITweetWithSearchMetadata CreateTweetWithSearchMetadata(ITweetWithSearchMetadataDTO tweetWithSearchMetadataDTO)
        {
            if (tweetWithSearchMetadataDTO == null)
            {
                return null;
            }

            return new TweetWithSearchMetadata(tweetWithSearchMetadataDTO, this.client.Config.TweetMode, this.client);
        }

        public IOEmbedTweet CreateOEmbedTweet(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<IOEmbedTweetDTO>(json);
            return CreateOEmbedTweet(dto);
        }

        public IOEmbedTweet CreateOEmbedTweet(IOEmbedTweetDTO oEmbedTweetDTO)
        {
            if (oEmbedTweetDTO == null)
            {
                return null;
            }

            return new OEmbedTweet(oEmbedTweetDTO);
        }

        public IUser CreateUser(string json)
        {
            var tweetDTO = this.jsonObjectConverter.Deserialize<IUserDTO>(json);
            return CreateUser(tweetDTO);
        }

        public IUser CreateUser(IUserDTO userDTO)
        {
            if (userDTO == null)
            {
                return null;
            }

            return new User(userDTO, this.client);
        }

        public IUser[] CreateUsers(IEnumerable<IUserDTO> usersDTO)
        {
            return usersDTO?.Select(CreateUser).ToArray();
        }

        public IAuthenticatedUser CreateAuthenticatedUser(string json)
        {
            var tweetDTO = this.jsonObjectConverter.Deserialize<IUserDTO>(json);
            return CreateAuthenticatedUser(tweetDTO);
        }

        public IAuthenticatedUser CreateAuthenticatedUser(IUserDTO userDTO)
        {
            if (userDTO == null)
            {
                return null;
            }

            return new AuthenticatedUser(userDTO, this.client);
        }

        public IWebhook CreateWebhook(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<WebhookDTO>(json);
            return CreateWebhook(dto);
        }

        public IWebhook CreateWebhook(IWebhookDTO webhookDTO)
        {
            if (webhookDTO == null)
            {
                return null;
            }

            return new Webhook(webhookDTO);
        }

        public IWebhookEnvironment CreateWebhookEnvironment(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<WebhookEnvironmentDTO>(json);
            return CreateWebhookEnvironment(dto);
        }

        public IWebhookEnvironment CreateWebhookEnvironment(IWebhookEnvironmentDTO webhookEnvironmentDTO)
        {
            if (webhookEnvironmentDTO == null)
            {
                return null;
            }

            return new WebhookEnvironment(webhookEnvironmentDTO, this.client);
        }

        public IWebhookEnvironmentSubscriptions CreateWebhookEnvironmentSubscriptions(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<WebhookEnvironmentSubscriptionsDTO>(json);
            return CreateWebhookEnvironmentSubscriptions(dto);
        }

        public IWebhookEnvironmentSubscriptions CreateWebhookEnvironmentSubscriptions(IWebhookEnvironmentSubscriptionsDTO webhookEnvironmentSubscriptionsDTO)
        {
            if (webhookEnvironmentSubscriptionsDTO == null)
            {
                return null;
            }

            return new WebhookEnvironmentSubscriptions(webhookEnvironmentSubscriptionsDTO, this.client);
        }

        public ITwitterConfiguration CreateTwitterConfiguration(string json)
        {
            return this.jsonObjectConverter.Deserialize<ITwitterConfiguration>(json);
        }

        public ICredentialsRateLimits CreateRateLimits(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<CredentialsRateLimitsDTO>(json);
            return CreateRateLimits(dto);
        }

        public ICredentialsRateLimits CreateRateLimits(CredentialsRateLimitsDTO dto)
        {
            if (dto == null)
            {
                return null;
            }

            return new CredentialsRateLimits(dto);
        }

        public ITwitterCredentials CreateTwitterCredentials(string json)
        {
            return this.jsonObjectConverter.Deserialize<TwitterCredentials>(json);
        }

        public IConsumerOnlyCredentials CreateConsumerCredentials(string json)
        {
            return this.jsonObjectConverter.Deserialize<ConsumerOnlyCredentials>(json);
        }

        public IMedia CreateMedia(string json)
        {
            return this.jsonObjectConverter.Deserialize<Media>(json);
        }

        public IUploadedMediaInfo CreateUploadedMediaInfo(string json)
        {
            return this.jsonObjectConverter.Deserialize<IUploadedMediaInfo>(json);
        }

        public ISearchResults CreateSearchResult(string json)
        {
            var searchResultDto = this.jsonObjectConverter.Deserialize<SearchResultsDTO>(json);
            return CreateSearchResult(searchResultDto);
        }

        public IAccountSettings CreateAccountSettings(string json)
        {
            var accountSettingsDTO = this.jsonObjectConverter.Deserialize<IAccountSettingsDTO>(json);

            if (accountSettingsDTO == null)
            {
                return null;
            }

            return new AccountSettings(accountSettingsDTO);
        }
    }
}