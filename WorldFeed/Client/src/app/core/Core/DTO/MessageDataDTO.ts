import {IMessageEntities} from '../../Public/Models/Entities/IMessageEntities';
import {IMessageDataDTO} from "../../Public/Models/Interfaces/DTO/IMessageDataDTO";
import {IQuickReplyDTO} from "../../Public/Models/Interfaces/DTO/IQuickReplyDTO";
import {IQuickReplyResponse} from "../../Public/Models/Interfaces/IQuickReplyResponse";
import {IAttachmentDTO} from "../../Public/Models/Interfaces/DTO/IAttachmentDTO";

export class MessageDataDTO implements IMessageDataDTO {
  // [JsonProperty("text")]
  public text: string;

  // [JsonProperty("entities")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public entities: IMessageEntities;

  // [JsonProperty("quick_reply")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public quickReply: IQuickReplyDTO;

  // [JsonProperty("quick_reply_response")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public quickReplyResponse: IQuickReplyResponse;

  // [JsonProperty("attachment")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public attachment: IAttachmentDTO;
}
