import {IMessageEventDTO} from "../../Public/Models/Interfaces/DTO/Events/IMessageEventDTO";
import {ICreateMessageDTO} from "../../Public/Models/Interfaces/DTO/ICreateMessageDTO";

export class CreateMessageDTO implements ICreateMessageDTO {
  // [JsonProperty("event")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public messageEvent: IMessageEventDTO;
}
