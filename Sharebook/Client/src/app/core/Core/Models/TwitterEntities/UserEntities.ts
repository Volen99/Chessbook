import {IUserEntities} from "../../../Public/Models/Entities/IUserEntities";
import {IWebsiteEntity} from "../../../Public/Models/Entities/IWebsiteEntity";
import {IDescriptionEntity} from "../../../Public/Models/Entities/IDescriptionEntity";

export class UserEntities implements IUserEntities {
  // [JsonProperty("url")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public website: IWebsiteEntity;

  // [JsonProperty("description")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public description: IDescriptionEntity;
}
