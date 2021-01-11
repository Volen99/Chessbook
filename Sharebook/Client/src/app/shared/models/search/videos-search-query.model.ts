import { NSFWQuery } from './nsfw-query.model';
import { SearchTargetQuery } from './search-target-query.model';
import {VideoFilter} from "../videos/video-query.type";

export interface VideosSearchQuery extends SearchTargetQuery {
  search?: string;

  start?: number;
  count?: number;
  sort?: string;

  startDate?: string; // ISO 8601
  endDate?: string; // ISO 8601

  originallyPublishedStartDate?: string; // ISO 8601
  originallyPublishedEndDate?: string; // ISO 8601

  nsfw?: NSFWQuery;

  categoryOneOf?: number[];

  licenceOneOf?: number[];

  languageOneOf?: string[];

  tagsOneOf?: string[];
  tagsAllOf?: string[];

  durationMin?: number; // seconds
  durationMax?: number; // seconds

  filter?: VideoFilter;
}
