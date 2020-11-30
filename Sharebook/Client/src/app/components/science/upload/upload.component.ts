// import {Component, HostListener, OnInit} from '@angular/core';
//
// import {FileUploader} from "../../../global-modules/upload/file-uploader.class";
// import {Resources} from "../../../properties/resources"; // I am back!! 💙 06.11.2020, Friday
//
// // const URL = '/api/';
// const URL = Resources.Upload_URL;
//
// @Component({
//   selector: 'app-science-upload',
//   templateUrl: './upload.component.html',
//   styleUrls: ['./upload.component.css'],
// })
// export class UploadComponent implements OnInit {
//   constructor() {
//     // this.uploader = new FileUploader({
//     //   url: URL,
//     //   disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
//     //   formatDataFunctionIsAsync: true,
//     //   formatDataFunction: async (item) => {
//     //     return new Promise((resolve, reject) => {
//     //       resolve({
//     //         name: item._file.name,
//     //         length: item._file.size,
//     //         contentType: item._file.type,
//     //         date: new Date()
//     //       });
//     //     });
//     //   }
//     // });
//     //
//     // this.hasBaseDropZoneOver = false;
//     // this.hasAnotherDropZoneOver = false;
//     //
//     // this.response = '';
//     //
//     // this.uploader.response.subscribe(res => this.response = res);
//   }
//
//   ngOnInit(): void {
//
//   }
//
//   @HostListener('click', ['$event'])
//   handleKeyDown(event: MouseEvent) {
//     debugger
//
//   }
//
//   // public uploader: FileUploader;
//   // public hasBaseDropZoneOver: boolean;
//   // public hasAnotherDropZoneOver: boolean;
//   // public response: string;
//   //
//   //
//   // public fileOverBase(e: any): void {
//   //   this.hasBaseDropZoneOver = e;
//   // }
//   //
//   // public fileOverAnother(e: any): void {
//   //   this.hasAnotherDropZoneOver = e;
//   // }
// }
//
// //   // FileUploadSectionComponent
// //
// //   public name: string = 'File Upload';
// //   public currentHeading: string = 'Simple';
// //   public doc: string = doc;
// //   public tabs: any = tabDesc;
// //
// //   public select(e: any): void {
// //     if (e.heading) {
// //       this.currentHeading = e.heading;
// //     }
// //   }
// // }
