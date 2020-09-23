namespace WorldFeed.Message.API.Controllers.Message
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Enums;

    public interface IMessageQueryExecutor
    {
        // Publish Message
        Task<ITwitterResult<ICreateMessageDTO>> PublishMessageAsync(IPublishMessageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> DestroyMessageAsync(IDeleteMessageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IGetMessageDTO>> GetMessageAsync(IGetMessageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IMessageCursorQueryResultDTO>> GetMessagesAsync(IGetMessagesParameters parameters, TwitterRequest request);
    }

    public class MessageQueryExecutor : IMessageQueryExecutor
    {
        private readonly ITwitterAccessor twitterAccessor;
        private readonly IMessageQueryGenerator messageQueryGenerator;

        public MessageQueryExecutor(ITwitterAccessor twitterAccessor, IMessageQueryGenerator messageQueryGenerator)
        {
            this.twitterAccessor = twitterAccessor;
            this.messageQueryGenerator = messageQueryGenerator;
        }

        public Task<ITwitterResult<ICreateMessageDTO>> PublishMessageAsync(IPublishMessageParameters parameters, ITwitterRequest request)
        {
            var requestWithPayload = this.messageQueryGenerator.GetPublishMessageQuery(parameters);

            request.Query.Url = requestWithPayload.Url;
            request.Query.HttpMethod = HttpMethod.POST;
            request.Query.HttpContent = requestWithPayload.Content;

            return this.twitterAccessor.ExecuteRequestAsync<ICreateMessageDTO>(request);
        }

        public Task<ITwitterResult> DestroyMessageAsync(IDeleteMessageParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.messageQueryGenerator.GetDestroyMessageQuery(parameters);
            request.Query.HttpMethod = HttpMethod.DELETE;
            return this.twitterAccessor.ExecuteRequestAsync(request);
        }

        public Task<ITwitterResult<IGetMessageDTO>> GetMessageAsync(IGetMessageParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.messageQueryGenerator.GetMessageQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IGetMessageDTO>(request);
        }

        public Task<ITwitterResult<IMessageCursorQueryResultDTO>> GetMessagesAsync(IGetMessagesParameters parameters, TwitterRequest request)
        {
            request.Query.Url = this.messageQueryGenerator.GetMessagesQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IMessageCursorQueryResultDTO>(request);
        }
    }
}
