import {IApp} from "../../Public/Models/Interfaces/IApp";
import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IGetMessageDTO} from "../../Public/Models/Interfaces/DTO/IGetMessageDTO";
import {IMessageEventDTO} from "../../Public/Models/Interfaces/DTO/Events/IMessageEventDTO";

export class GetMessageDTO implements IGetMessageDTO {
  // [JsonProperty("event")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public messageEvent: IMessageEventDTO;

  // [JsonProperty("apps")]
  public apps: Dictionary<number, IApp>;
}
