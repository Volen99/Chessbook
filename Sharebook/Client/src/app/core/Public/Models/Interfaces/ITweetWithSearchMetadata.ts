import {ITweet} from "./ITweet";
import {ITweetFromSearchMetadata} from "./DTO/ITweetFromSearchMetadata";

export interface ITweetWithSearchMetadata extends ITweet {
  // Property containing search metadata.
  searchMetadata: ITweetFromSearchMetadata;
}
