import {MediaModel} from './media.model';

export interface Post {
  id?: string;
  text: string;
  media: Array<MediaModel>;
  createdOn?: Date;
  modifiedOn?: Date;
}
