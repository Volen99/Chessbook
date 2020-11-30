import {Inject, InjectionToken} from "@angular/core";

import {ITweetWithSearchMetadata} from "./ITweetWithSearchMetadata";
import {ISearchMetadata} from "./DTO/ISearchMetadata";
import { SearchResults } from 'src/app/core/Core/Models/Properties/SearchResults';
import {SearchMetadata} from "../../../Core/DTO/SearchMetadata";
import {TweetWithSearchMetadata} from "../../../../logic/TweetWithSearchMetadata";
import {AppInjector} from "../../../../sharebook/Injectinvi/app-injector";

export interface ISearchResults {
  // All the tweets returned by the Twitter Request
  tweets: ITweetWithSearchMetadata[];

  // Search Metadata Information
  searchMetadata: ISearchMetadata;
}

export const ISearchResultsToken = new InjectionToken<ISearchResults>('ISearchResults', {
  providedIn: 'root',
  factory: () => AppInjector.get(SearchResults),
});
