import {Resources} from "../../properties/resources";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {IPublishMessageParameters} from "../../core/Public/Parameters/MessageClient/PublishMessageParameters";
import {IDeleteMessageParameters} from "../../core/Public/Parameters/MessageClient/DestroyMessageParameters";
import {IGetMessageParameters} from "../../core/Public/Parameters/MessageClient/GetMessageParameters";
import {IGetMessagesParameters} from "../../core/Public/Parameters/MessageClient/GetMessagesParameters";
import {IQueryParameterGenerator} from "../Shared/QueryParameterGenerator";
import {ICreateMessageDTO} from "../../core/Public/Models/Interfaces/DTO/ICreateMessageDTO";
import {CreateMessageDTO} from "../../core/Core/DTO/CreateMessageDTO";
import {MessageEventDTO} from "../../core/Core/DTO/Events/MessageEventDTO";
import {EventType} from "../../core/Public/Models/Enum/EventType";
import TimeSpan from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import DateTime from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {MessageCreateDTO} from "../../core/Core/DTO/MessageCreateDTO";
import {MessageCreateTargetDTO} from "../../core/Core/DTO/MessageCreateTargetDTO";
import {MessageDataDTO} from "../../core/Core/DTO/MessageDataDTO";
import {AttachmentDTO} from "../../core/Core/DTO/AttachmentDTO";
import {AttachmentType} from "../../core/Public/Models/Enum/AttachmentType";
import {MediaEntity} from "../../core/Core/Models/TwitterEntities/MediaEntity";
import {QuickReplyDTO} from "../../core/Core/DTO/QuickReplyDTO";
import {QuickReplyType} from "../../core/Public/Models/Enum/QuickReplyType";

export class RequestWithPayload {
  public url: string;
  public content: HttpContent;
}

export interface IMessageQueryGenerator {
  getPublishMessageQuery(parameters: IPublishMessageParameters): RequestWithPayload;

  getDestroyMessageQuery(parameters: IDeleteMessageParameters): string;

  getMessageQuery(parameters: IGetMessageParameters): string;

  getMessagesQuery(parameters: IGetMessagesParameters): string;
}

export class MessageQueryGenerator implements IMessageQueryGenerator {
  private readonly _jsonContentFactory: JsonContentFactory;
  private readonly _queryParameterGenerator: IQueryParameterGenerator;

  constructor(jsonContentFactory: JsonContentFactory, queryParameterGenerator: IQueryParameterGenerator) {
    this._jsonContentFactory = jsonContentFactory;
    this._queryParameterGenerator = queryParameterGenerator;
  }

  public getPublishMessageQuery(parameters: IPublishMessageParameters): RequestWithPayload {
    let query = new StringBuilder(Resources.Message_Create);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    let content = this._jsonContentFactory.Create(this.getPublishMessageBody(parameters));

    let result = new RequestWithPayload();
    result.url = query.toString();
    result.content = content;

    return result;
  }

  public getDestroyMessageQuery(parameters: IDeleteMessageParameters): string {
    let query = new StringBuilder(Resources.Message_Destroy);
    query.addParameterToQuery("id", parameters.messageId);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getMessageQuery(parameters: IGetMessageParameters): string {
    let query = new StringBuilder(Resources.Message_Get);
    query.addParameterToQuery("id", parameters.messageId);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getMessagesQuery(parameters: IGetMessagesParameters): string {
    let query = new StringBuilder(Resources.Message_GetMessages);
    this._queryParameterGenerator.appendCursorParameters(query, parameters);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  private getPublishMessageBody(parameters: IPublishMessageParameters): ICreateMessageDTO {
    let createMessageDTO = new CreateMessageDTO();
    createMessageDTO.messageEvent = new MessageEventDTO();
    createMessageDTO.messageEvent.type = EventType.MessageCreate;
    createMessageDTO.messageEvent.createdAt = new DateTime(2000, 11, 22, 0, 0, 0, TimeSpan.zero);
    createMessageDTO.messageEvent.messageCreate = new MessageCreateDTO();
    createMessageDTO.messageEvent.messageCreate.target = new MessageCreateTargetDTO();
    createMessageDTO.messageEvent.messageCreate.target.recipientId = parameters.recipientId;
    createMessageDTO.messageEvent.messageCreate.messageData = new MessageDataDTO();
    createMessageDTO.messageEvent.messageCreate.messageData.text = parameters.text;

    // If there is media attached, include it
    if (parameters.mediaId != null) {
      createMessageDTO.messageEvent.messageCreate.messageData.attachment = new AttachmentDTO();
      createMessageDTO.messageEvent.messageCreate.messageData.attachment.type = AttachmentType.Media;
      createMessageDTO.messageEvent.messageCreate.messageData.attachment.media = new MediaEntity();
      createMessageDTO.messageEvent.messageCreate.messageData.attachment.media.id = parameters.mediaId;
    }

    // If there are quick reply options, include them
    if (parameters.quickReplyOptions != null && parameters.quickReplyOptions.length > 0) {
      createMessageDTO.messageEvent.messageCreate.messageData.quickReply = new QuickReplyDTO();
      createMessageDTO.messageEvent.messageCreate.messageData.quickReply.type = QuickReplyType.Options;
      createMessageDTO.messageEvent.messageCreate.messageData.quickReply.options = parameters.quickReplyOptions;

    }

    return createMessageDTO;
  }
}
