import {TweetWithSearchMetadataDTO} from "../../../../Core/DTO/TweetWithSearchMetadataDTO";
import {ISearchMetadata} from "./ISearchMetadata";

export interface ISearchResultsDTO {
  tweetDTOs: TweetWithSearchMetadataDTO[];
  searchMetadata: ISearchMetadata;
}
