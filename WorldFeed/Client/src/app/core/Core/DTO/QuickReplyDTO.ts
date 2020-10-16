import {QuickReplyType} from "../../Public/Models/Enum/QuickReplyType";
import {IQuickReplyOption} from "../../Public/Models/Interfaces/IQuickReplyOption";
import {IQuickReplyDTO} from "../../Public/Models/Interfaces/DTO/IQuickReplyDTO";

export class QuickReplyDTO implements IQuickReplyDTO {
  // [JsonProperty("type")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public type: QuickReplyType;

  // [JsonProperty("options")]
  public options: IQuickReplyOption[];
}
