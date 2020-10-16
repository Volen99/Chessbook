﻿import {ISavedSearchDTO} from "./DTO/ISavedSearchDTO";
import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

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

  // Creation date.
  createdAt: DateTime; // DateTimeOffset;
}