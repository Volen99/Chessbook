import IEnumerable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import {IUrlEntity} from "./IUrlEntity";

export interface IDescriptionEntity {
  // URLs found in a description.
  urls: IEnumerable<IUrlEntity>;
}
