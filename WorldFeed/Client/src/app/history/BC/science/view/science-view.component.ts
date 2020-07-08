import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-history-BC-science-view',
  templateUrl: './science-view.component.html',
  styleUrls: ['./science-view.component.css'],
})
export class ScienceViewComponent implements OnInit {
  // So you should use constructor() to setup Dependency Injection and not much else.
  // ngOnInit() is better place to "start" - it's where/when components' bindings are resolved
  constructor() {
  }

  // ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component.
  // Called after the constructor and called  after the first ngOnChanges()
  ngOnInit() {
  }
}
