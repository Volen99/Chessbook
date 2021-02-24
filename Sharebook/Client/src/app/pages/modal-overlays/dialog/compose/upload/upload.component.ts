import {Component, Input, OnDestroy, OnInit, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

import {FileUploader} from "./file-uploader.class";
import {UploadService} from "./upload.service";
import {PostsService} from "../../../../../shared/posts/posts.service";
import {PublishTweetParameters} from "../../../../../shared/posts/parameters/publish-tweet-parameters";
import {NbDialogRef} from "../../../../../sharebook-nebular/theme/components/dialog/dialog-ref";
import {ShowcaseDialogComponent} from "../../../../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import {WhoCanReplyComponent} from "../../../popovers/components/who-can-reply/who-can-reply.component";          // I am back!! 💙 06.11.2020, Friday

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnChanges, OnDestroy {
  @Input() title: string;

  public whoCanReplyComponent = WhoCanReplyComponent;

  private readonly defaultTweetBtnClassName = 'r-urgr8i';
  private readonly hoveredTweetBtnClassName = 'r-1q3imqu';

  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();

  @Input() textPlaceholder: string = `What's happening?`;

  constructor(private uploadService: UploadService,
              private postsService: PostsService,
              protected ref: NbDialogRef<ShowcaseDialogComponent>) {
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.uploader = new FileUploader({
      url: '',
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      autoUpload: true,
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
  }

  ngOnInit(): void {
    this.response = '';


    this.uploader.response.subscribe(res => {
      this.response = res;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger
  }

  ngOnDestroy(): void {
  }




  dismiss() {
    this.ref.close();
  }


  public helpVisible = true;

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean;
  public hasAnotherDropZoneOver: boolean;
  public response: string;


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public async fileDrop(files: File[]) {

  }

  public rurgr8iOrR1q3imqu = this.defaultTweetBtnClassName;

  public async tweetBtnMouseEnter(event: MouseEvent) {
    this.changeTweetBtnBackgroundColorClassName();
  }

  public async tweetBtnMouseLeave(event: MouseEvent) {
  }

  updateValue(value) {
    this.text = value.innerText;
    // this.textChange.emit(value.innerText);
  }

  public isCloseIconHovered = false;

  handleCloseIconHover(event: MouseEvent) {
    this.isCloseIconHovered = !this.isCloseIconHovered;
  }

  public async shareButtonHandler() {
    debugger
    if (this.uploader.queue.length || String(this.text).trim().length) {
      let fileCurrent = this.uploader.queue[0]._file;

      let mediaType = fileCurrent.type;
      let bytes = await fileCurrent.arrayBuffer();

      let uploadedImage = await this.uploadService.uploadTweetImageAsync(bytes, mediaType);
      let publishPostParameters = new PublishTweetParameters(this.text);
      publishPostParameters.medias = [ uploadedImage ];
      let postWithImage = await this.postsService.publishTweetAsync(publishPostParameters);

      this.text = '';
      this.uploader.queue = [];
    }
  }

  private changeTweetBtnBackgroundColorClassName(): void {
    if (this.rurgr8iOrR1q3imqu === this.defaultTweetBtnClassName) {
      this.rurgr8iOrR1q3imqu = this.hoveredTweetBtnClassName;
    } else {
      this.rurgr8iOrR1q3imqu = this.defaultTweetBtnClassName;
    }
  }
}
