namespace Sharebook.Message.API.Controllers.Message
{
    using System.Net.Http;
    using System.Text;

    using Sharebook.Common.DTO;
    using Sharebook.Common.DTO.Events;
    using Sharebook.Common.Extensions;
    using Sharebook.Common.Public.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Parameters.MessageClient;
    using Sharebook.Common.Web;
    using Sharebook.Message.Properties;

    public class RequestWithPayload
    {
        public string Url { get; set; }

        public HttpContent Content { get; set; }
    }

    public interface IMessageQueryGenerator
    {
        RequestWithPayload GetPublishMessageQuery(IPublishMessageParameters parameters);

        string GetDestroyMessageQuery(IDeleteMessageParameters parameters);

        string GetMessageQuery(IGetMessageParameters parameters);

        string GetMessagesQuery(IGetMessagesParameters parameters);
    }

    public class MessageQueryGenerator : IMessageQueryGenerator
    {
        private readonly JsonContentFactory jsonContentFactory;
        private readonly IQueryParameterGenerator queryParameterGenerator;

        public MessageQueryGenerator(JsonContentFactory jsonContentFactory, IQueryParameterGenerator queryParameterGenerator)
        {
            this.jsonContentFactory = jsonContentFactory;
            this.queryParameterGenerator = queryParameterGenerator;
        }

        public RequestWithPayload GetPublishMessageQuery(IPublishMessageParameters parameters)
        {
            var query = new StringBuilder(Resources.Message_Create);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            var content = this.jsonContentFactory.Create(GetPublishMessageBody(parameters));

            return new RequestWithPayload
            {
                Url = query.ToString(),
                Content = content
            };
        }

        public string GetDestroyMessageQuery(IDeleteMessageParameters parameters)
        {
            var query = new StringBuilder(Resources.Message_Destroy);
            query.AddParameterToQuery("id", parameters.MessageId);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetMessageQuery(IGetMessageParameters parameters)
        {
            var query = new StringBuilder(Resources.Message_Get);
            query.AddParameterToQuery("id", parameters.MessageId);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetMessagesQuery(IGetMessagesParameters parameters)
        {
            var query = new StringBuilder(Resources.Message_GetMessages);
            this.queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        private ICreateMessageDTO GetPublishMessageBody(IPublishMessageParameters parameters)
        {
            var createMessageDTO = new CreateMessageDTO
            {
                MessageEvent = new MessageEventDTO
                {
                    Type = EventType.MessageCreate,
                    MessageCreate = new MessageCreateDTO
                    {
                        Target = new MessageCreateTargetDTO
                        {
                            RecipientId = parameters.RecipientId
                        },
                        MessageData = new MessageDataDTO
                        {
                            Text = parameters.Text
                        }
                    },
                }
            };

            // If there is media attached, include it
            if (parameters.MediaId != null)
            {
                createMessageDTO.MessageEvent.MessageCreate.MessageData.Attachment = new AttachmentDTO
                {
                    Type = AttachmentType.Media,
                    Media = new MediaEntity { Id = parameters.MediaId }
                };
            }

            // If there are quick reply options, include them
            if (parameters.QuickReplyOptions != null && parameters.QuickReplyOptions.Length > 0)
            {
                createMessageDTO.MessageEvent.MessageCreate.MessageData.QuickReply = new QuickReplyDTO
                {
                    Type = QuickReplyType.Options,
                    Options = parameters.QuickReplyOptions,
                };
            }

            return createMessageDTO;
        }
    }
}
