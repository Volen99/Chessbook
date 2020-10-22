import {ITweet} from "./ITweet";
import {ITweetFromSearchMetadata} from "./DTO/ITweetFromSearchMetadata";
import {InjectionToken} from "@angular/core";
import {TweetWithSearchMetadata} from "../../../../logic/TweetWithSearchMetadata";

export interface ITweetWithSearchMetadata extends ITweet {
  // Property containing search metadata.
  searchMetadata: ITweetFromSearchMetadata;
}

export const ITweetWithSearchMetadataToken = new InjectionToken<ITweetWithSearchMetadata>('ITweetWithSearchMetadata', {
  providedIn: 'root',
  factory: () => new TweetWithSearchMetadata(),
});
