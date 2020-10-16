import {IQuickReplyOption} from "../../../Public/Models/Interfaces/IQuickReplyOption";

export class QuickReplyOption implements IQuickReplyOption {
  // [JsonProperty("label")]
  public label: string;

  // [JsonProperty("description")]
  public description: string;

  // [JsonProperty("metadata")]
  public metadata: string;
}
