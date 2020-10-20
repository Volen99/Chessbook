import {QuickReplyType} from "../../../Public/Models/Enum/QuickReplyType";
import {IQuickReplyResponse} from "../../../Public/Models/Interfaces/IQuickReplyResponse";

export class QuickReplyResponse implements IQuickReplyResponse {
  // [JsonProperty("type")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public type: QuickReplyType;

  // [JsonProperty("metadata")]
  public metadata: string;
}
