import {CoursesState} from './courses/state/courses.state';
import {PostsState} from './posts/state/posts.state';

export interface AppState {
  readonly courses: CoursesState;
  readonly posts: PostsState;
}

