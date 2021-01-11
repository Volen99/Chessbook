import {Inject, InjectionToken} from "@angular/core";

import {ISavedSearchDTO} from "./DTO/ISavedSearchDTO";
import {SavedSearch} from "../../../Core/Models/SavedSearch";
import {SavedSearchDTO} from "../../../Core/DTO/SavedSearchDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

// Twitter saved search.
export interface ISavedSearch {
  // Saved search backend data.
  savedSearchDTO: ISavedSearchDTO;

  // Saved search id.
  id: number;

  // Id as string.
  idStr: string;

  // Given name.
  name: string;

  // Query performed when executing the search.
  query: string;

  // Creation 1.
  createdAt: DateTime; // DateTimeOffset;
}

export const ISavedSearchToken = new InjectionToken<ISavedSearch>('ISavedSearch', {
  providedIn: 'root',
  factory: () => new SavedSearch(Inject(SavedSearchDTO)),
});
