import {Course} from '../../../models/course.model';
import * as CoursesActions from '../actions/courses.actions';

const initialState: Course[] = [
  {name: 'Planets', url: 'https://www.nasa.gov'},
  {name: 'Astronomy', url: 'https://www.google.com'}
];

// pure function
function addCourse(state: Course[], course) {
  return [...state, course]; // take all data from 'state' with '...' then add 'course' and create new array
}

function removeCourse(state: Course[], id) {
  const courseToRemove = state[id];
  return [...state.filter(c => c !== courseToRemove)];
}

export function coursesReducer(state: Course[] = initialState, action: CoursesActions.Types) {
    // Analyze action
    switch (action.type) {
      case CoursesActions.ADD_COURSE:
        return addCourse(state, action.payload);

      case CoursesActions.REMOVE_COURSE:
        return removeCourse(state, action.payload);

      default:
        return state;
    }
 }
