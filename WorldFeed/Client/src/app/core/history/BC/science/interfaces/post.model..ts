import { Media } from '../../../../shared-core/Feed/Entities/media/media.model';

export interface PostModel {
  id?: number;
  text: string;
  media: Array<Media>;
  createdOn?: Date;
  modifiedOn?: Date;
}
