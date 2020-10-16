import {ISearchResults} from "../../../Public/Models/Interfaces/ISearchResults";
import {ITweetWithSearchMetadata} from "../../../Public/Models/Interfaces/ITweetWithSearchMetadata";
import {ISearchMetadata} from "../../../Public/Models/Interfaces/DTO/ISearchMetadata";

export class SearchResults implements ISearchResults {
  constructor(tweets: Array<ITweetWithSearchMetadata>, searchMetadata: ISearchMetadata) {
    this.tweets = tweets;
    this.searchMetadata = searchMetadata;
  }

  public tweets: ITweetWithSearchMetadata[];
  public searchMetadata: ISearchMetadata;
}
