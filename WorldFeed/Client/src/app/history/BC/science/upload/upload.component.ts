import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {HttpEventType, HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';


class ImageSnippet {
  public src: string;
  public file: File;
  public pending: boolean = false;
  public status: string = 'init';

  constructor(src: string, file: File) {
    this.src = src;
    this.file = file;
  }
}

@Component({
  selector: 'app-history-BC-science-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private uploadPath: string = environment.historyBCScienceUpload + 'media' + '/upload';

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let filesToUpload: File[] = files;
    const formData = new FormData();

    // One interesting thing to pay attention to is the use of the Array.from() function. Even though the
    // files variable contains all the selected files, it is not an array. So, in order to use the
    // map function, we are using the Array.from() syntax, which will convert the array-like object
    // into the new array copy.
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http.post(this.uploadPath, formData, {
      reportProgress: true,
      observe: 'events',
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
}
