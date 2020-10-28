import {ITweetWithSearchMetadata} from "./ITweetWithSearchMetadata";
import {ISearchMetadata} from "./DTO/ISearchMetadata";
import {Inject, InjectionToken} from "@angular/core";
import { SearchResults } from 'src/app/core/Core/Models/Properties/SearchResults';
import {SearchMetadata} from "../../../Core/DTO/SearchMetadata";
import {TweetWithSearchMetadata} from "../../../../logic/TweetWithSearchMetadata";

export interface ISearchResults {
  // All the tweets returned by the Twitter Request
  tweets: ITweetWithSearchMetadata[];

  // Search Metadata Information
  searchMetadata: ISearchMetadata;
}

export const ISearchResultsToken = new InjectionToken<ISearchResults>('ISearchResults', {
  providedIn: 'root',
  factory: () => new SearchResults(Inject(Array<TweetWithSearchMetadata>()), Inject(SearchMetadata)),
});
