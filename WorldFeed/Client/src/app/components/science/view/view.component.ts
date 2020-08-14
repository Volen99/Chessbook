import {Component, OnInit} from '@angular/core';
import {SignalRScienceService} from '../../../core/science/services/signalR-science-service';
import {PostModel} from '../../../core/science/interfaces/post.model.';
import {environment} from '../../../../environments/environment';
import {StorageService} from '../../../core/shared-core/services/storage.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-science-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  private microservicePath: string = environment.scienceApiUrl;
  private storageService: StorageService;

  // So you should use constructor() to setup Dependency Injection and not much else.
  // ngOnInit() is better place to "start" - it's where/when components' bindings are resolved
  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  public isAuthorized: boolean;
  public signalRScienceService: SignalRScienceService;
  public posts: Array<PostModel>;

  // ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component.
  // Called after the constructor and called  after the first ngOnChanges()
  ngOnInit() {
    this.isAuthorized = this.storageService.retrieve('IsAuthorized');
  }

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  }
}
