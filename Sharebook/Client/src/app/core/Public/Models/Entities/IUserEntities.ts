import {InjectionToken} from "@angular/core";

import {IDescriptionEntity} from "./IDescriptionEntity";
import {IWebsiteEntity} from "./IWebsiteEntity";
import {UserEntities} from "../../../Core/Models/TwitterEntities/UserEntities";

export interface IUserEntities {
  // Website metadata
  website: IWebsiteEntity;

  // User description
  description: IDescriptionEntity;
}

export const IUserEntitiesToken = new InjectionToken<IUserEntities>('IUserEntities', {
  providedIn: 'root',
  factory: () => new UserEntities(),
});
