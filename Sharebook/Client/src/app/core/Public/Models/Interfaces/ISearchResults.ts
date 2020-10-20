import {ITweetWithSearchMetadata} from "./ITweetWithSearchMetadata";
import {ISearchMetadata} from "./DTO/ISearchMetadata";

export interface ISearchResults {
  // All the tweets returned by the Twitter Request
  tweets: ITweetWithSearchMetadata[];

  // Search Metadata Information
  searchMetadata: ISearchMetadata;
}
