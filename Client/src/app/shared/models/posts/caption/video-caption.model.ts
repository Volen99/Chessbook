import {IPostConstant} from "../../../posts/models/post-constant.model";

export interface VideoCaption {
  language: IPostConstant<string>;
  captionPath: string;
}
