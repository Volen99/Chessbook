import IEnumerable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import {IUrlEntity} from "./IUrlEntity";
import {InjectionToken} from "@angular/core";
import {DescriptionEntity} from "../../../Core/Models/TwitterEntities/DescriptionEntity";

export interface IDescriptionEntity {
  // URLs found in a description.
  urls: IEnumerable<IUrlEntity>;
}

export const IDescriptionEntityToken = new InjectionToken<IDescriptionEntity>('IDescriptionEntity', {
  providedIn: 'root',
  factory: () => new DescriptionEntity(),
});
