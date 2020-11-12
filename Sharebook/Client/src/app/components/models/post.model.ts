import {Media} from "../../core/Core/Models/Media";

export interface PostModel {
  id?: number;
  text: string;
  media: Array<Media>;
  createdOn?: Date;
  modifiedOn?: Date;
}
