import {ITweetDTO} from "./ITweetDTO";
import {ITweetFromSearchMetadata} from "./ITweetFromSearchMetadata";

export interface ITweetWithSearchMetadataDTO extends ITweetDTO {
  tweetFromSearchMetadata: ITweetFromSearchMetadata;
}
