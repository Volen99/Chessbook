import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {StorageService} from '../../shared/services/storage.service';
import {PostModel} from "../models/post.model";
import {FileUploader} from "../../global-modules/upload/file-uploader.class";

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-science-view',
  templateUrl: './science.component.html',
  styleUrls: ['../../../assets/css/site.css', './science.component.css'],
})
export class ScienceComponent {

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor() {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => this.response = res);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}


// private storageService: StorageService;
//
// // So you should use constructor() to setup Dependency Injection and not much else.
// // ngOnInit() is better place to "start" - it's where/when components' bindings are resolved
// constructor(storageService: StorageService) {
//   this.storageService = storageService;
// }
//
// public isAuthorized: boolean;
// public posts: Array<PostModel>;
//
// // ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component.
// // Called after the constructor and called  after the first ngOnChanges()
// ngOnInit() {
//   this.isAuthorized = this.storageService.retrieve('isAuthorized');
// }
//
// // public createImgPath = (serverPath: string) => {
// //   return `${this.microservicePath}${serverPath}`;
// // }
