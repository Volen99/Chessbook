import {Inject, InjectionToken} from "@angular/core";

import {ITweet} from "./ITweet";
import {ITweetFromSearchMetadata} from "./DTO/ITweetFromSearchMetadata";
import {TweetWithSearchMetadata} from "../../../../logic/TweetWithSearchMetadata";
import {TweetMode} from "../../Settings/SharebookSettings";
import {TweetWithSearchMetadataDTO} from "../../../Core/DTO/TweetWithSearchMetadataDTO";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface ITweetWithSearchMetadata extends ITweet {
  // Property containing search metadata.
  searchMetadata: ITweetFromSearchMetadata;
}

export const ITweetWithSearchMetadataToken = new InjectionToken<ITweetWithSearchMetadata>('ITweetWithSearchMetadata', {
  providedIn: 'root',
  factory: () => new TweetWithSearchMetadata(Inject(TweetWithSearchMetadataDTO), Inject(TweetMode), Inject(TwitterClient)),
});
