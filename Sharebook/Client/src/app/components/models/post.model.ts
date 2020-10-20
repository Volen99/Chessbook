import {Media} from "../../shared/Feed/Entities/media/media.model";

export interface PostModel {
  id?: number;
  text: string;
  media: Array<Media>;
  createdOn?: Date;
  modifiedOn?: Date;
}
