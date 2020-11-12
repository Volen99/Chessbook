import {IApp} from "../../Public/Models/Interfaces/IApp";
import {IGetMessageDTO} from "../../Public/Models/Interfaces/DTO/IGetMessageDTO";
import {IMessageEventDTO} from "../../Public/Models/Interfaces/DTO/Events/IMessageEventDTO";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export class GetMessageDTO implements IGetMessageDTO {
  // [JsonProperty("event")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public messageEvent: IMessageEventDTO;

  // [JsonProperty("apps")]
  public apps: Dictionary<number, IApp>;
}
