import {Size} from './size.model';

export interface Media {
  id: number;
  id_str: string;
  indices: [];
  media_url: string;
  media_url_https: string;                                                                                         // the indices parameter
  url: string; // Wrapped URL for the media link. This corresponds with the URL embedded directly into the raw Tweet text, & the values for
  displayUrl: string;
  expandedUrl: string;
  type: string; // Type of uploaded media. Possible types include photo, video, and animated_gif. "type":"photo"
  sizes: Size;
  sourceStatusId?: number;
  source_status_id_str: string;
}
