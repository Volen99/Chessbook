import {IMessageCreateTargetDTO} from "../../Public/Models/Interfaces/DTO/IMessageCreateTargetDTO";
import {IMessageCreateDTO} from "../../Public/Models/Interfaces/DTO/IMessageCreateDTO";
import {IMessageDataDTO} from "../../Public/Models/Interfaces/DTO/IMessageDataDTO";

export class MessageCreateDTO implements IMessageCreateDTO {
  // Twitter fields

  // [JsonProperty("target")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public target: IMessageCreateTargetDTO;

  // [JsonProperty("sender_id")]
  public senderId: number;

  // [JsonProperty("source_app_id")]
  public sourceAppId?: number;

  // [JsonProperty("message_data")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public messageData: IMessageDataDTO;
}
