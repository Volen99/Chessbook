import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScienceService} from '../science.service';
import {TwitterClient} from "../../../worldfeed/TwitterClient";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-science-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  // Use @ViewChild to access the local reference
  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;
  // Use EventEmitter only for event binding between a child and parent component.
  // Do not subscribe to it. Do not call any of those methods. Only call .emit()
  @Output() public onUploadFinished = new EventEmitter();

  private http: HttpClient;
  private scienceService: ScienceService;

  constructor(http: HttpClient, scienceService: ScienceService) {
    this.http = http;
    this.scienceService = scienceService;
  }

  public files: any[] = [];
  public progress: number;
  public message: string;

  ngOnInit() {

  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.uploadFile($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.uploadFile(files);
  }

  public uploadFile = async (files) => {
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

    const filesArray = Array.from(filesToUpload);

    if (filesArray.some(f => f.size >= 512_000_000)) {
      alert('Your video file is too large. Videos should be less than 512 MB');
      return;
    }

    if (filesArray.length > 1 && (filesArray.some(f => f.type.startsWith('video') || f.type.endsWith('gif')))) {
      alert('Please upload video or gif alone');
      return;
    }

    let client = new TwitterClient();

    let res = await client.Upload.uploadBinaryAsync(filesArray[0].);

    this.scienceService.upload(formData)
      .subscribe(event => {
        this.files = event.data;

        this.onUploadFinished.emit(event); // Emits an event containing a given value.
      });
  };

  /**
   * Delete file from files list
   * @param index (File index)
   * @param mediaId (Media id)
   */
  deleteFile(index: number, mediaId: number) {
    this.scienceService.removeMedia(mediaId).subscribe();
    this.files.splice(index, 1);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  }
}

class ImageSnippet {
  public src: string;
  public file: File;

  constructor(src: string, file: File) {
    this.src = src;
    this.file = file;
  }
}
