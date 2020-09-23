import {Indices} from './indices.model';

export interface UrlModel {
  urlPath: string;
  expandedUrl: string;
  displayUrl: string;
  indices: Indices;
}
