import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {StorageService} from '../../shared/services/storage.service';
import {PostModel} from "../models/post.model";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-science-view',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.css'],
})
export class ScienceComponent implements OnInit {
  private storageService: StorageService;

  // So you should use constructor() to setup Dependency Injection and not much else.
  // ngOnInit() is better place to "start" - it's where/when components' bindings are resolved
  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  public isAuthorized: boolean;
  public posts: Array<PostModel>;

  // ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component.
  // Called after the constructor and called  after the first ngOnChanges()
  ngOnInit() {
    this.isAuthorized = this.storageService.retrieve('isAuthorized');
  }

  // public createImgPath = (serverPath: string) => {
  //   return `${this.microservicePath}${serverPath}`;
  // }
}
