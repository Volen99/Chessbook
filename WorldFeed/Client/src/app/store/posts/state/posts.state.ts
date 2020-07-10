import {Post} from '../../../history/BC/science/interfaces/post';

export interface PostsState {
  readonly all: Post[];
  readonly create: Post;
}
