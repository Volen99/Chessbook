import {IDescriptionEntity} from "./IDescriptionEntity";
import {IWebsiteEntity} from "./IWebsiteEntity";

export interface IUserEntities {
  // Website metadata
  website: IWebsiteEntity;

  // User description
  description: IDescriptionEntity;
}
