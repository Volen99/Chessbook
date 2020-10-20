import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {AppState} from '../../../store/app.state';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {ScienceService} from '../science.service';
import {environment} from '../../../../environments/environment';
import {AddPost} from '../../../store/posts/actions/posts.actions';
import {Feed} from '../../../shared/Feed/feed.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from 'ngx-strongly-typed-forms';
import {MediaINITQueryParameters} from '../../models/uploads/upload-media-INIT-query-parameters.model';
import {MediaAPPENDQueryParameters} from '../../models/uploads/upload-media-APPEND-query-parameters.model';
import {MediaFINALIZEQueryParameters} from '../../models/uploads/upload-media-FINALIZE-query-parameters.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-science-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // Use @ViewChild to access the local reference
  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;
  // Use EventEmitter only for event binding between a child and parent component.
  // Do not subscribe to it. Do not call any of those methods. Only call .emit()
  @Output() public onUploadFinished = new EventEmitter();
  @Output() public OnPostCreated = new EventEmitter<Array<PostModel>>();
  @Output() public OnFileTextDropped = new EventEmitter<string>();

  private store: Store<AppState>;

  private http: HttpClient;
  private router: Router;
  private route: ActivatedRoute;

  private scienceService: ScienceService;
  private postForm: FormGroup<File>;

  constructor(
    store: Store<AppState>,
    http: HttpClient,
    scienceService: ScienceService,
    router: Router,
    route: ActivatedRoute) {

    this.store = store;
    this.http = http;
    this.router = router;
    this.scienceService = scienceService;
  }

  public color: string;
  public count = 1;

  public files: any[] = [];
  public progress: number;
  public message: string;

  public textFileContent: string;

  public isCreate: boolean;
  public name: string;
  public response: {
    data: [{
      text: string;
      length: number;
      paths: string,
    }],
  };

  public feed: Feed;

  ngOnInit(): void {
  }

  public uploadFinished = (event) => {
    this.response = event;
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    if ($event.length === 0) {
      return;
    }

    if (this.isTextMimeType($event[0].type)) {
      const reader = new FileReader();

      reader.onload = () => {
        this.textFileContent = (reader.result as string);
        this.OnFileTextDropped.emit(this.textFileContent);
      };

      reader.readAsText($event[0]);
      return;
    }

    const filesToUpload: File[] = $event;

    // One interesting thing to pay attention to is the use of the Array.from() function. Even though the
    // files variable contains all the selected files, it is not an array. So, in order to use the
    // map function, we are using the Array.from() syntax, which will convert the array-like object
    // into the new array copy.

    // Array.from(filesToUpload).map((file, index) => {
    //   return formData.append('file' + index, file, file.name);
    // });

    const filesArray = Array.from(filesToUpload);

    if (filesArray.length > 1 && (filesArray.some(f => f.type.startsWith('video') || f.type.endsWith('gif')))) {
      alert('Please upload video or gif alone');
      return;
    }

    for (const file of filesArray) {
      this.uploadFile(file);
    }
  }

  fileBrowseHandler(files) {
    this.onFileDropped(files);
  }


  // • Initialize the upload using the INIT command
  // • Upload each chunk of bytes using the APPEND command
  // • Complete the upload using the FINALIZE command
  uploadFile(file): File {
    if (file.size >= 512_000_000) {
      alert('Your file is too large. Files should be less than 512 MB'); // TODO: fix for different medias
      return;
    }

    const formData = new FormData();

    formData.append('file', file, file.name);

    const queryStringInit = this.getQueryUrl(file, 'INIT');
    if (file.type.includes('image')) { // :(

    } else if (file.type.includes('video')) {
      this.uploadVideoService.INIT(queryStringInit, formData)
        .subscribe(responseINIT => {
          debugger;
          const queryStringAppend = this.getQueryUrl(file, 'APPEND', responseINIT.mediaId, 0);
          this.uploadVideoService.APPEND(queryStringAppend, formData)
            .subscribe(responseAPPEND => {
              const queryStringFinalize = this.getQueryUrl(file, 'FINALIZE', responseINIT.mediaId);
              this.uploadVideoService.FINALIZE(queryStringFinalize, formData)
                .subscribe(responseFINALIZE => {

                });
            });
        });
    }

    // this.scienceService.upload(formData)
    //   .subscribe(event => {
    //     this.files = event.data;
    //
    //     this.onUploadFinished.emit(event); // Emits an event containing a given value.
    //   });
  }


  getQueryUrl(file: File, command: string, mediaId?: number, segmentIndex?: number) {
    let mediaQuery = {};

    if (command === 'INIT') {
      let mediaParameters: MediaINITQueryParameters;
      mediaParameters = {};

      mediaParameters.command = 'INIT';
      mediaParameters.totalBytes = file.size;
      mediaParameters.mediaType = file.type;
      mediaParameters.mediaCategory = 'tweet_' + file.type.split('/')[0];

      mediaQuery = mediaParameters;
    } else if (command === 'APPEND') {
      let mediaParameters: MediaAPPENDQueryParameters;
      mediaParameters = {};

      mediaParameters.command = 'APPEND';
      mediaParameters.mediaID = mediaId;
      mediaParameters.segmentIndex = segmentIndex;

      mediaQuery = mediaParameters;
    } else if (command === 'FINALIZE') {
      let mediaParameters: MediaFINALIZEQueryParameters;
      mediaParameters = {};
      mediaParameters.mediaID = mediaId;
      mediaParameters.command = 'FINALIZE';
      mediaParameters.allowAsync = true;

      mediaQuery = mediaParameters;
    }

    const params = new URLSearchParams();
    for (const key in mediaQuery) {
      if (!mediaQuery[key]) {
        continue;
      }
      params.append(key, mediaQuery[key]);
    }

    let query = params.toString();
    query = '?' + params;
    return query;
  }

  /**
   * Delete file from files list
   * @param index (File index)
   * @param mediaId (Media id)
   */
  deleteFile(index: number, mediaId: number) {
    // if (this.files[index].progress < 100) {
    //   console.log('Upload in progress.');
    //   return;
    // }

    this.scienceService.removeMedia(mediaId).subscribe();
    this.files.splice(index, 1);
  }


  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
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

  addPost(text: string) {
    this.post = {
      text,
      media: [],
    };

    // {"errors":null,"data":{"text":"Love ♥"},"isOk":true}
    if (this.response) {
      for (const media of this.response.data) {
        this.post.media.push(media);
      }
    }


    this.isCreate = false;

    this.scienceService.createText(text, this.post.media[0]?.postId || 0).subscribe(); // TODO: image.postId bug

    this.store.dispatch(new AddPost(this.post));

    this.scienceService.getAllPosts().subscribe(); // TODO: this is just for test, as this reloads all the feeds!!

    // this.user.post.medias[0]?.postId = undefined;
  }

  public createImgPath = (serverPath: string) => {
    return `${this.microservicePath}${serverPath}`;
  };

  public incrementCounter() {
    this.count++;
  }

  // I attempt to get the mime-type of the first file in drag event. Returns null if no
  // file types can be identified.
  // --
  // CAUTION: Not all browsers can access file type meta-data during a DRAG event.
  private getFileTypeFromDragEvent(event: DragEvent): string | null {

    // "Items" is the most modern interface spec.
    if (event.dataTransfer.items && event.dataTransfer.items.length) {

      for (const item of Array.from(event.dataTransfer.items)) {

        if (item.kind === 'file') {

          // CAUTION: DataTransferItem.getAsFile() returns "null" if this is a
          // "drag" event. I BELIEVE it only returns the file in the "drop"
          // event. As such, we have to use the "type" on the item itself.
          return (item.type);

        }

      }

      // If the "items" interface was defined, we don't want to fall-back to
      // checking the "files" interface. The "files" interface is legacy and
      // should only be consulted if "items" is unavailable.
      return (null);

    }

    // "Files" is an old interface spec.
    if (event.dataTransfer.files && event.dataTransfer.files.length) {

      return (event.dataTransfer.files[0].type);

    }

    return (null);

  }


  // I determine if the given mime-type represents a file that contains text content
  // that we can [likely] load into the application.
  private isTextMimeType(mimeType: string): boolean {
    if (mimeType.startsWith('text/')) {
      return true;
    }

    switch (mimeType) {
      case 'application/json':
      case 'application/x-json':
        return true;
        break;

      default:
        return false;
        break;
    }
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

// I am so fucking dumb!!!!!! 08.07.2020, Wednesday
