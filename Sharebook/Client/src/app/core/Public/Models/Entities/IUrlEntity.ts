import {InjectionToken} from "@angular/core";

import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";
import {UrlEntity} from "../../../Core/Models/TwitterEntities/UrlEntity";

// Information related with an URL in twitter
export interface IUrlEntity extends IEquatable<IUrlEntity> {
  // Real url: "url":"https://t.co/yzocNFvJuL"
  // Wrapped URL, corresponding to the value embedded directly into the raw Tweet text, & the values for the indices parameter
  URL: string;

  // Message displayed instead of the url
  // URL pasted/typed into Tweet: "display_url":"bit.ly/2so49n2"
  displayedURL: string;

  // The fully resolved URL
  // Expanded version of `` display_url``: "expanded_url":"http://bit.ly/2so49n2"
  expandedURL: string;

  // The character positions the url was extracted from
  indices: number[];

  // If you are using the Expanded and/or Enhanced URL enrichments, the following metadata is available under the unwound attribute
  /*unwound: {
    url: string; // The fully unwound version of the link included in the Tweet
    status: number; // Final HTTP status of the unwinding process, a '200' indicating success
    title: string; // HTML title for the link. Example
    description: string; // HTML description for the link
  };*/
}


export const IUrlEntityToken = new InjectionToken<IUrlEntity>('IUrlEntity', {
  providedIn: 'root',
  factory: () => new UrlEntity(),
});
