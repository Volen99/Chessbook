namespace Sharebook.Message.Client.Requesters
{
    using System.Threading.Tasks;
    using Sharebook.Client;
    using Sharebook.Common.Client.Validators;
    using Sharebook.Common.Events;
    using Sharebook.Common.Iterators;
    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public;
    using Sharebook.Common.Public.Client.Requesters;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Common.Public.Parameters.MessageClient;
    using Sharebook.Common.Web;
    using Sharebook.Core.Controllers;

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