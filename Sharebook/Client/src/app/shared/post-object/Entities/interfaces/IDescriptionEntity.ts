import {IUrlEntity} from "./IUrlEntity";

export interface IDescriptionEntity {
  // URLs found in a description.
  urls: Iterable<IUrlEntity>;
}
