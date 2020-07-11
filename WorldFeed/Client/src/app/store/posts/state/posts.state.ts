import {PostModel} from '../../../core/history/BC/science/interfaces/post.model.';

export interface PostsState {
  readonly all: PostModel[];
  readonly create: PostModel;
}
