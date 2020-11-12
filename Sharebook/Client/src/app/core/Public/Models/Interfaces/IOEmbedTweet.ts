import {Inject, InjectionToken} from "@angular/core";

import {IOEmbedTweetDTO} from "./DTO/IOembedTweetDTO";
import {OEmbedTweet} from "../../../Core/Models/OEmbedTweet";
import {OEmbedTweetDTO} from "../../../Core/DTO/OembedTweetDTO";

export interface IOEmbedTweet {
  // Author of the tweet.
  authorName: string;

  // Hyperlink to the author public page.
  authorURL: string;

  // HTML generated to display the tweet on your website.
  HTML: string;

  // Hyperlink to the tweet.
  URL: string;

  providerURL: string;

  // Width of the div containing the embedded tweet.
  width: number;

  // Width of the div containing the embedded tweet.
  height: number;
  version: string;
  type: string;
  cacheAge: string;
  oembedTweetDTO: IOEmbedTweetDTO;
}

export const IOEmbedTweetToken = new InjectionToken<IOEmbedTweet>('IOEmbedTweet', {
  providedIn: 'root',
  factory: () => new OEmbedTweet(inject(OEmbedTweetDTO)),
});
