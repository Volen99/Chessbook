import {IDescriptionEntity} from "../../../Public/Models/Entities/IDescriptionEntity";
import {IUrlEntity} from "../../../Public/Models/Entities/IUrlEntity";

export class DescriptionEntity implements IDescriptionEntity {
  // [JsonProperty("urls")];
  public urls: Array<IUrlEntity>;
}
