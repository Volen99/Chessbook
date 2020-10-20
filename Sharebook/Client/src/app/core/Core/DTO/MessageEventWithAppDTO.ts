import {IApp} from "../../Public/Models/Interfaces/IApp";
import {IMessageEventDTO} from "../../Public/Models/Interfaces/DTO/Events/IMessageEventDTO";
import {IMessageEventWithAppDTO} from "../../Public/Models/Interfaces/DTO/IMessageEventWithAppDTO";

export class MessageEventWithAppDTO implements IMessageEventWithAppDTO {
  // [JsonProperty("event")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public messageEvent: IMessageEventDTO;

  // [JsonProperty("app")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public app: IApp;
}
