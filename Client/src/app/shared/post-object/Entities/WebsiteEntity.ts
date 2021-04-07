import {IWebsiteEntity} from "./interfaces/IWebsiteEntity";
import {IUrlEntity} from "./interfaces/IUrlEntity";

export class WebsiteEntity implements IWebsiteEntity {
  public urls: Array<IUrlEntity>;
}
