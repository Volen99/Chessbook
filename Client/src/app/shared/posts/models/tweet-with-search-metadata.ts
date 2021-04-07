import {IPost} from "./tweet";
import {ITweetFromSearchMetadata} from "./DTO/tweet-from-search-metadata";

export interface ITweetWithSearchMetadata extends IPost {
  // Property containing search metadata.
  searchMetadata: ITweetFromSearchMetadata;
}

