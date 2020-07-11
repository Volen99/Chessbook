import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import {CoursesState} from '../../../store/courses/state/courses.state';
import {RemoveCourse} from '../../../store/courses/actions/courses.actions';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {
  private store: Store<AppState>;

  constructor(store: Store<AppState>) {
    this.store = store;
  }

  public courses: Observable<CoursesState>; // was Observable<Course[]>

  ngOnInit(): void {
    // The only thing we have to do, to take care of the state, is:
    this.courses = this.store.select(state => state.courses); // or .select('courses');
    // This way written, means that every time the courses change in the store, we have subscribed here
    // and they will be updated here
  }

  delCourse(id) {
    this.store.dispatch(new RemoveCourse(id));
  }

}
