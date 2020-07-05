import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpEventType, HttpClient, HttpHeaders} from '@angular/common/http';
import {ScienceService} from '../science.service';
import {environment} from '../../../../../environments/environment';
import {UserToCreate} from '../../../../_interfaces/userToCreate.model';


class ImageSnippet {
  public src: string;
  public file: File;
  public pending = false;
  public status = 'init';

  constructor(src: string, file: File) {
    this.src = src;
    this.file = file;
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-history-BC-science-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  @Output() public onUploadFinished = new EventEmitter();

  private http: HttpClient;
  private scienceService: ScienceService;

  public progress: number;
  public message: string;

  constructor(http: HttpClient, scienceService: ScienceService) {
    this.http = http;
    this.scienceService = scienceService;
  }

  ngOnInit() {

  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    const filesToUpload: File[] = files;
    const formData = new FormData();

    // One interesting thing to pay attention to is the use of the Array.from() function. Even though the
    // files variable contains all the selected files, it is not an array. So, in order to use the
    // map function, we are using the Array.from() syntax, which will convert the array-like object
    // into the new array copy.
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.scienceService.upload(formData)
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
