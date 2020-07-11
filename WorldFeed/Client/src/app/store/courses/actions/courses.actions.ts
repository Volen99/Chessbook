import { Action } from '@ngrx/store';
import { Course } from '../../../core/interfaces/course.model';

// Names of the actions I want to dispatch. The idea is, those names to be unique.
// Those names will be used in the components. Like Dispatch 'ADD_COURSE'
//
export const ADD_COURSE = '[COURSE] Add';
export const REMOVE_COURSE = '[COURSE] Remove';


export class AddCourse implements Action {
  readonly type: string = ADD_COURSE;

  // Когато добавям курс, имам ли payload? Имам. playload-a е курса, който искам да добавя.
  constructor(payload: Course) {
    this.payload = payload;
  }

  public payload: Course;
}

export class RemoveCourse implements Action {
  readonly type: string = REMOVE_COURSE;

  constructor(payload: number) {
    this.payload = payload;
  }

  public payload: number;
}


export type Types = AddCourse | RemoveCourse;
