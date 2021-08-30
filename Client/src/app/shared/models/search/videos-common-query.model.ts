import {BooleanBothQuery} from './boolean-both-query.model';
import {PostFilter} from "../../posts/models/post-query.type";

// These query parameters can be used with any endpoint that list videos
export interface VideosCommonQuery {
  start?: number;
  count?: number;
  sort?: string;

  nsfw?: BooleanBothQuery;

  isLive?: boolean;

  categoryOneOf?: number[];

  licenceOneOf?: number[];

  languageOneOf?: string[];

  tagsOneOf?: string[];
  tagsAllOf?: string[];

  filter?: PostFilter;

  skipCount?: boolean;
}

export interface VideosCommonQueryAfterSanitize extends VideosCommonQuery {
  start: number;
  count: number;
  sort: string;
}

export interface VideosWithSearchCommonQuery extends VideosCommonQuery {
  search?: string;
}
