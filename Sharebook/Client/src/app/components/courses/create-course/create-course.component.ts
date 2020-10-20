import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import {AddCourse} from '../../../store/courses/actions/courses.actions';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  private store: Store<AppState>;

  constructor(store: Store<AppState>) {
    this.store = store;
  }

  ngOnInit(): void {
  }

  addCourse(name, url) {
    this.store.dispatch(new AddCourse({name, url}));
  }

}
