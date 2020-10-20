import {IWebsiteEntity} from "../../../Public/Models/Entities/IWebsiteEntity";
import {IUrlEntity} from "../../../Public/Models/Entities/IUrlEntity";

export class WebsiteEntity implements IWebsiteEntity {
  // [JsonProperty("urls")]
  public urls: Array<IUrlEntity>;
}
