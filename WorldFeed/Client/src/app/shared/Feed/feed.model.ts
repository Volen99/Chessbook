// 13.07.2020, Monday, I am the stupidest person in the world

import { User } from '../user/user.model';
import { Entities } from './Entities/entities.model';
import { Place } from './Entities/location/place.model';
import {BoundingBox} from './Entities/location/bounding-box.model';

export interface Feed {
  createdAt: string; // UTC time when this Tweet was created
  id: number;
  id_str: string;
  fullText: string;
  truncated: boolean; // Indicates whether the value of the text parameter was truncated...
  entities: Entities;
  extended_entities: {};
  source: string; // Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web
  inReplyToStatusId?: number; // If the represented Tweet is a reply, this field will contain the integer representation of the original ID
  in_reply_to_status_id_str?: string;
  inReplyToUserId?: number; // If the represented Tweet is a reply, it will contain the integer representation of the original author ID
  in_reply_to_user_id_str?: string;
  inReplyToScreenName?: string; // If the represented Tweet is a reply, it will contain the screen name of the original Tweet’s author
  user: User; // The user who posted this Tweet

  geo: string;
  coordinates: BoundingBox;
  place: Place;
  contributors: string;
  isQuoteStatus: boolean;
  retweetCount: number;
  favoriteCount: number;
  replyCount: number;
  quoteCount: number;
  favorited: boolean;
  retweeted: boolean;
  possiblySensitive: boolean;
  possiblySensitiveEditable: boolean;
  lang: string;
  supplementalLanguage: null;

}
