import {InjectionToken} from "@angular/core";

import {IUrlEntity} from "./IUrlEntity";
import {DescriptionEntity} from "../../../Core/Models/TwitterEntities/DescriptionEntity";

export interface IDescriptionEntity {
  // URLs found in a description.
  urls: Iterable<IUrlEntity>;
}

export const IDescriptionEntityToken = new InjectionToken<IDescriptionEntity>('IDescriptionEntity', {
  providedIn: 'root',
  factory: () => new DescriptionEntity(),
});
