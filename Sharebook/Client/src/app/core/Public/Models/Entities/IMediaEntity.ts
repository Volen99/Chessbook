import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";
import Dictionary from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IVideoInformationEntity} from "./ExtendedEntities/IVideoInformationEntity";
import {IMediaEntitySize} from "./IMediaEntitySize";
import {InjectionToken} from "@angular/core";
import {MediaEntity} from "../../../Core/Models/TwitterEntities/MediaEntity";

// Media element posted in Twitter
export interface IMediaEntity extends IEquatable<IMediaEntity> {
  // Media Id
  id: number; // long?

  // Media Id as a string
  idStr: string;

  // Url of the media
  mediaURL: string;

  // Secured Url of the media
  mediaURLHttps: string;

  // URL information related with the entity
  URL: string;

  // URL displayed as it could be displayed as short url
  displayURL: string;

  // The expanded URL is the entire URL as opposed to shortened url (bitly...)
  expandedURL: string;

  // Type of Media
  mediaType: string;

  // Indicated the location of the entity, for example an URL entity can be located at the begining of the tweet
  indices: number[];

  // Dimensions related with the different possible views of a same Media element
  sizes: Dictionary<string, IMediaEntitySize>;

  // Video metadata
  videoDetails: IVideoInformationEntity;
}

export const IMediaEntityToken = new InjectionToken<IMediaEntity>('IMediaEntity', {
  providedIn: 'root',
  factory: () => new MediaEntity(),
});
