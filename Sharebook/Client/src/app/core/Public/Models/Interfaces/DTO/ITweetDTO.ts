﻿import {InjectionToken} from "@angular/core";

import {ITweetIdentifier} from "../ITweetIdentifier";
import Dictionary from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IPlace} from "../IPlace";
import {IExtendedTweet} from './IExtendedTweet';
import {ICoordinates} from "../ICoordinates";
import {ITweetEntities} from "../../Entities/ITweetEntities";
import {IUserDTO} from "./IUserDTO";
import { Language } from '../../Enum/Language';
import DateTime from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {TweetDTO} from "../../../../Core/DTO/TweetDTO";

export interface ITweetDTO extends ITweetIdentifier {
  text: string;

  fullText: string;

  displayTextRange: number[];

  extendedTweet: IExtendedTweet;

  favorited: boolean;

  favoriteCount?: number;

  createdBy: IUserDTO;

  currentUserRetweetIdentifier: ITweetIdentifier;

  coordinates: ICoordinates;

  entities: ITweetEntities;

  legacyEntities: ITweetEntities;

  createdAt: DateTime; // DateTimeOffset;

  truncated: boolean;

  // This property is only available with the Premium and Enterprise tier products.
  replyCount?: number;

  inReplyToStatusId?: number;

  inReplyToStatusIdStr: string;

  inReplyToUserId?: number;

  inReplyToUserIdStr: string;

  inReplyToScreenName: string;

  retweetCount: number;

  retweeted: boolean;

  retweetedTweetDTO: ITweetDTO;

  // This property is only available with the Premium and Enterprise tier products.
  quoteCount?: number;

  quotedStatusId?: number;

  quotedStatusIdStr: string;

  quotedTweetDTO: ITweetDTO;

  language?: Language;

  possiblySensitive: boolean;

  contributorsIds: number[];

  contributors: Iterable<number>;

  source: string;

  scopes: Dictionary<string, object>;

  filterLevel: string;

  withheldCopyright: boolean;

  withheldInCountries: Iterable<string>;

  withheldScope: string;

  place: IPlace;
}

export const ITweetDTOToken = new InjectionToken<ITweetDTO>('ITweetDTO', {
  providedIn: 'root',
  factory: () => new TweetDTO(),
});
