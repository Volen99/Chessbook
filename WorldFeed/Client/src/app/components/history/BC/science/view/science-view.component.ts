import { Component, OnInit } from '@angular/core';
import {SignalRScienceService} from '../../../../../core/history/BC/science/services/signalR-science-service';
import {PostModel} from '../../../../../core/history/BC/science/interfaces/post.model.';
import {environment} from '../../../../../../environments/environment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-history-BC-science-view',
  templateUrl: './science-view.component.html',
  styleUrls: ['./science-view.component.css'],
})
export class ScienceViewComponent implements OnInit {
  private microservicePath: string = environment.historyBCSciencePost;

  public signalRScienceService: SignalRScienceService;
  public posts: Array<PostModel>;

  // So you should use constructor() to setup Dependency Injection and not much else.
  // ngOnInit() is better place to "start" - it's where/when components' bindings are resolved
  constructor() {
  }

  // ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component.
  // Called after the constructor and called  after the first ngOnChanges()
  ngOnInit() {

  }

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  }

}
