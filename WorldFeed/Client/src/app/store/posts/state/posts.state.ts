import {PostModel} from '../../../core/science/interfaces/post.model.';

export interface PostsState {
  readonly all: PostModel[];
  readonly create: PostModel;
}
