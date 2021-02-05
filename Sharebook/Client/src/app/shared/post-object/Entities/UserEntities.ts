import {IUserEntities} from "./interfaces/IUserEntities";
import {IWebsiteEntity} from "./interfaces/IWebsiteEntity";
import {IDescriptionEntity} from "./interfaces/IDescriptionEntity";

export class UserEntities implements IUserEntities {
  // [JsonProperty("url")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public website: IWebsiteEntity;

  // [JsonProperty("description")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public description: IDescriptionEntity;
}
