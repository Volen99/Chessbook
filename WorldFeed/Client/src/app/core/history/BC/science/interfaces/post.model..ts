import {MediaModel} from './media.model';

export interface PostModel {
  id?: number;
  text: string;
  media: Array<MediaModel>;
  createdOn?: Date;
  modifiedOn?: Date;
}
