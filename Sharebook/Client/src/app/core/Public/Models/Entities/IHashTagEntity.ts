import {InjectionToken} from "@angular/core";

import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";
import {HashtagEntity} from "../../../Core/Models/TwitterEntities/HashTagEntity";

// A hashtag is a keyword prefixed by # and representing a category of tweet
export interface IHashtagEntity extends IEquatable<IHashtagEntity> {
  // Name of the hashtag, minus the leading ‘#’ character
  text: string;

  // The character positions the Hashtag was extracted from
  // An array of integers indicating the offsets within the Tweet text where the hashtag begins and ends
  indices: number[];
}

export const IHashtagEntityToken = new InjectionToken<IHashtagEntity>('IHashtagEntity', {
  providedIn: 'root',
  factory: () => new HashtagEntity(),
});
