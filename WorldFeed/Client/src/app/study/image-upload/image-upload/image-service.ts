// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {Injectable} from '@angular/core';
// import { environment } from 'src/environments/environment';
//
// @Injectable()
// export class ImageService {
//   private uploadPath: string = environment.historyBCScienceUpload + 'photo' + '/uploadphoto';
//
//   constructor(private http: HttpClient) {
//
//   }
//
//   public uploadImage(image: File): Observable<any> {
//     const formData = new FormData();
//
//     formData.append('image', image);
//
//     return this.http.post(this.uploadPath, formData, {
//       headers: new HttpHeaders().set('content-type', 'multipart/form-data')
//     });
//   }
// }
