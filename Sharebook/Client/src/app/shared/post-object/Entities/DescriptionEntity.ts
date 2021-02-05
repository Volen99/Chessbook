import {IDescriptionEntity} from "./interfaces/IDescriptionEntity";
import {IUrlEntity} from "./interfaces/IUrlEntity";

export class DescriptionEntity implements IDescriptionEntity {
  // [JsonProperty("urls")];
  public urls: Array<IUrlEntity>;
}
