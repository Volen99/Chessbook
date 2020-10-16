import {IDescriptionEntity} from "../../../Public/Models/Entities/IDescriptionEntity";
import IEnumerable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import {IUrlEntity} from "../../../Public/Models/Entities/IUrlEntity";

export class DescriptionEntity implements IDescriptionEntity {
  // [JsonProperty("urls")];
  public urls: IEnumerable<IUrlEntity>;
}
