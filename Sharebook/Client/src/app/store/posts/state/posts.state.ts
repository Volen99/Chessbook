import {PostModel} from "../../../components/models/post.model";

export interface PostsState {
  readonly all: PostModel[];
  readonly create: PostModel;
}
