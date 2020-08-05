namespace WorldFeed.Client.Clients
{
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.MessageClient;
    using WorldFeed.Common.Web;

    public class MessagesClient : IMessagesClient
    {
        private readonly ITwitterClient client;
        private readonly IMessageRequester messageRequester;

        public MessagesClient(
            ITwitterClient client,
            IMessageRequester messageRequester)
        {
            this.client = client;
            this.messageRequester = messageRequester;
        }

        public IMessagesClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public Task<IMessage> PublishMessageAsync(string text, IUserIdentifier recipient)
        {
            return PublishMessageAsync(new PublishMessageParameters(text, recipient.Id));
        }

        public Task<IMessage> PublishMessageAsync(string text, long recipientId)
        {
            return PublishMessageAsync(new PublishMessageParameters(text, recipientId));
        }

        public async Task<IMessage> PublishMessageAsync(IPublishMessageParameters parameters)
        {
            var twitterResult = await this.messageRequester.PublishMessageAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateMessage(twitterResult?.Model);
        }

        public Task<IMessage> GetMessageAsync(long messageId)
        {
            return GetMessageAsync(new GetMessageParameters(messageId));
        }

        public async Task<IMessage> GetMessageAsync(IGetMessageParameters parameters)
        {
            var twitterResult = await this.messageRequester.GetMessageAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateMessage(twitterResult?.Model);
        }

        public Task<IMessage[]> GetMessagesAsync()
        {
            return GetMessagesAsync(new GetMessagesParameters());
        }

        public async Task<IMessage[]> GetMessagesAsync(IGetMessagesParameters parameters)
        {
            var iterator = GetMessagesIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<IMessage> GetMessagesIterator()
        {
            return GetMessagesIterator(new GetMessagesParameters());
        }

        public ITwitterIterator<IMessage> GetMessagesIterator(IGetMessagesParameters parameters)
        {
            var pageIterator = this.messageRequester.GetMessagesIterator(parameters);

            return new TwitterIteratorProxy<ITwitterResult<IMessageCursorQueryResultDTO>, IMessage>(pageIterator,
                twitterResult =>
                {
                    var messageEventDtos = twitterResult.Model.MessageEvents;
                    var messageDtos = messageEventDtos.Select(dto =>
                    {
                        var messageDto = new MessageEventWithAppDTO
                        {
                            MessageEvent = dto
                        };

                        var appId = dto.MessageCreate.SourceAppId;
                        if (appId != null && twitterResult.Model.Apps != null && twitterResult.Model.Apps.ContainsKey(appId.Value))
                        {
                            messageDto.App = twitterResult.Model.Apps[appId.Value];
                        }

                        return messageDto as IMessageEventWithAppDTO;
                    });

                    return this.client.Factories.CreateMessages(messageDtos);
                });
        }

        public Task DestroyMessageAsync(long messageId)
        {
            return DestroyMessageAsync(new DestroyMessageParameters(messageId));
        }

        public Task DestroyMessageAsync(IMessage message)
        {
            return DestroyMessageAsync(new DestroyMessageParameters(message));
        }

        public Task DestroyMessageAsync(IDeleteMessageParameters parameters)
        {
            return this.messageRequester.DestroyMessageAsync(parameters);
        }
    }
}