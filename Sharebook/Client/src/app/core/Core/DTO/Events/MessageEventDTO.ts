import {EventType} from "../../../Public/Models/Enum/EventType";
import {IMessageEventDTO} from "../../../Public/Models/Interfaces/DTO/Events/IMessageEventDTO";
import {IEventInitiatedViaDTO} from "../../../Public/Models/Interfaces/DTO/IEventInitiatedViaDTO";
import {IMessageCreateDTO} from "../../../Public/Models/Interfaces/DTO/IMessageCreateDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export class MessageEventDTO implements IMessageEventDTO {
  // [JsonProperty("type")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public type: EventType;

  // [JsonProperty("id")]
  public id: number;

  // [JsonProperty("created_timestamp")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public createdAt: DateTime; // DateTimeOffset

  // [JsonProperty("initiated_via")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public initiatedVia: IEventInitiatedViaDTO;

  // [JsonProperty("message_create")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public messageCreate: IMessageCreateDTO;
}
