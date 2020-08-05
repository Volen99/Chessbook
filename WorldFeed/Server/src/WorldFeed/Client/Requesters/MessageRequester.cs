namespace WorldFeed.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.MessageClient;
    using WorldFeed.Common.Web;
    using WorldFeed.Core.Controllers;

    public class MessageRequester : BaseRequester, IMessageRequester
    {
        private readonly IMessageController messageController;
        private readonly IMessagesClientParametersValidator messagesClientParametersValidator;

        public MessageRequester(
            ITwitterClient client,
            IMessageController messageController,
            IMessagesClientParametersValidator messagesClientParametersValidator,
            ITwitterClientEvents twitterClientEvents)
            : base(client, twitterClientEvents)
        {
            this.messageController = messageController;
            this.messagesClientParametersValidator = messagesClientParametersValidator;
        }

        public Task<ITwitterResult<ICreateMessageDTO>> PublishMessageAsync(IPublishMessageParameters parameters)
        {
            this.messagesClientParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.messageController.PublishMessageAsync(parameters, request));
        }

        public Task<ITwitterResult> DestroyMessageAsync(IDeleteMessageParameters parameters)
        {
            this.messagesClientParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.messageController.DestroyMessageAsync(parameters, request));
        }

        public Task<ITwitterResult<IGetMessageDTO>> GetMessageAsync(IGetMessageParameters parameters)
        {
            this.messagesClientParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.messageController.GetMessageAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>> GetMessagesIterator(IGetMessagesParameters parameters)
        {
            this.messagesClientParametersValidator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.messageController.GetMessagesIterator(parameters, request);
        }
    }
}