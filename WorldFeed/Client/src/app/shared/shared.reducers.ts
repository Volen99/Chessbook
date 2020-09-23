import {postsReducer} from '../store/posts/reducers/posts.reducer';
import {coursesReducer} from '../store/courses/reducers/courses.reducer';

export const sharedReducers = {
  // И тука трябва да опишем самия state, коя част state-a кой reducer се грижи за него.
  // Тоест, за курсовете се грижи 'courses.reducer.ts'
  courses: coursesReducer,
  posts: postsReducer,
};
