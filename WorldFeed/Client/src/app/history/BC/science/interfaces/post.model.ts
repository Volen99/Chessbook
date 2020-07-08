import {MediaModel} from './media.model';

export interface PostModel {
  id?: string;
  text: string;
  media: Array<MediaModel>;
  createdOn: Date;
  modifiedOn?: Date;
}
