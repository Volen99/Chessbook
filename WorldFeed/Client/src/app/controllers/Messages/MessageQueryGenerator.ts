import {Resources} from "../../properties/resources";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";

export class RequestWithPayload {
  public Url: string;
  public Content: HttpContent;
}

export interface IMessageQueryGenerator {
  GetPublishMessageQuery(parameters: IPublishMessageParameters): RequestWithPayload;

  GetDestroyMessageQuery(parameters: IDeleteMessageParameters): string;

  GetMessageQuery(parameters: IGetMessageParameters): string;

  GetMessagesQuery(parameters: IGetMessagesParameters): string;
}

    export class MessageQueryGenerator implements IMessageQueryGenerator
    {
        private readonly _jsonContentFactory: JsonContentFactory;
        private readonly _queryParameterGenerator: IQueryParameterGenerator;

        constructor(jsonContentFactory: JsonContentFactory, queryParameterGenerator: IQueryParameterGenerator)
        {
            this._jsonContentFactory = jsonContentFactory;
            this._queryParameterGenerator = queryParameterGenerator;
        }

        public  GetPublishMessageQuery(parameters: IPublishMessageParameters): RequestWithPayload
        {
            var query = new StringBuilder(Resources.Message_Create);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            var content = this._jsonContentFactory.Create(GetPublishMessageBody(parameters));

            return new RequestWithPayload
            {
                Url = query.ToString(),
                Content = content
            };
        }

        public  GetDestroyMessageQuery(parameters: IDeleteMessageParameters): string
        {
            var query = new StringBuilder(Resources.Message_Destroy);
            query.addParameterToQuery("id", parameters.messageId);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public  GetMessageQuery(parameters: IGetMessageParameters): string
        {
            var query = new StringBuilder(Resources.Message_Get);
            query.addParameterToQuery("id", parameters.messageId);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public  GetMessagesQuery(parameters: IGetMessagesParameters): string
        {
            var query = new StringBuilder(Resources.Message_GetMessages);
            this._queryParameterGenerator.AppendCursorParameters(query, parameters);
            query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        private  GetPublishMessageBody(parameters: IPublishMessageParameters): ICreateMessageDTO
        {
            var createMessageDTO = new CreateMessageDTO
            {
                MessageEvent = new MessageEventDTO
                {
                    Type = EventType.MessageCreate,
                    CreatedAt = new DateTimeOffset(2000, 11, 22, 0,0,0, TimeSpan.Zero),
                    MessageCreate = new MessageCreateDTO
                    {
                        Target = new MessageCreateTargetDTO
                        {
                            RecipientId = parameters.recipientId
                        },
                        MessageData = new MessageDataDTO
                        {
                            Text = parameters.text
                        }
                    },
                }
            };

            // If there is media attached, include it
            if (parameters.mediaId != null)
            {
                createMessageDTO.MessageEvent.MessageCreate.MessageData.Attachment = new AttachmentDTO
                {
                    Type = AttachmentType.Media,
                    Media = new MediaEntity { Id = parameters.mediaId }
                };
            }

            // If there are quick reply options, include them
            if (parameters.quickReplyOptions != null && parameters.quickReplyOptions.Length > 0)
            {
                createMessageDTO.MessageEvent.MessageCreate.MessageData.QuickReply = new QuickReplyDTO
                {
                    Type = QuickReplyType.Options,
                    Options = parameters.quickReplyOptions,
                };
            }

            return createMessageDTO;
        }
    }
