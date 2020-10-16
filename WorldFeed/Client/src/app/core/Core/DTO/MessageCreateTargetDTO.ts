import {IMessageCreateTargetDTO} from "../../Public/Models/Interfaces/DTO/IMessageCreateTargetDTO";

export class MessageCreateTargetDTO implements IMessageCreateTargetDTO {
  // [JsonProperty("recipient_id")]
  public recipientId: number;
}
