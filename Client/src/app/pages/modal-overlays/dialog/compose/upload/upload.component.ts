// I am back!! 💙 06.11.2020, Friday
import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

import {FileUploader} from "./file-uploader.class";
import {UploadService} from "./upload.service";
import {PostsService} from "../../../../../shared/posts/posts.service";
import {PublishTweetParameters} from "../../../../../shared/posts/parameters/publish-tweet-parameters";
import {NbDialogRef} from "../../../../../sharebook-nebular/theme/components/dialog/dialog-ref";
import {ShowcaseDialogComponent} from "../../../../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import {WhoCanReplyComponent} from "../../../popovers/components/who-can-reply/who-can-reply.component";
import {PostPrivacy} from "../../../../../shared/models/enums/post-privacy";
import {PostDetails} from "../../../../../shared/shared-main/post/post-details.model";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {
  faGlobeAfrica,
  faGlobeAmericas,
  faGlobeAsia,
  faGlobeEurope,
  faImagePolaroid,
  faPoll,
  faAtom,
  faCode,
} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnChanges, OnDestroy {
  @Input() title: string;

  @Input() replyPost: PostDetails;

  initialPoll: any = {
    options: ['', ''],
    expires_in: 24 * 3600,
    multiple: false,
  };

  public whoCanReplyComponent = WhoCanReplyComponent;

  privacy: PostPrivacy = PostPrivacy.EVERYONE;
  privacyClient: string = 'Everyone can reply';

  private readonly defaultTweetBtnClassName = 'r-urgr8i';
  private readonly hoveredTweetBtnClassName = 'r-1q3imqu';

  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();

  isPoll: boolean = false;

  textPlaceholder: string;

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

    this.textPlaceholder = this.isPoll ? 'Ask a question...' : this.replyPost ? 'Post your reply' : `What's happening?`;


    this.uploader.response.subscribe(res => {
      this.response = res;
    });

    this.getGlobe();

  }

  private globes: IconDefinition[] = [faGlobeEurope, faGlobeAsia, faGlobeAmericas, faGlobeAfrica];

  globeCurrent: IconDefinition;

  getGlobe() {
    this.globeCurrent = this.globes[this.globes.length * Math.random() | 0];
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.initialPoll.options.length > 2) {
      this.isPoll = true;
    }
  }

  ngOnDestroy(): void {
  }

  faPoll = faPoll;
  faAtom = faAtom;
  faCode = faCode;

  // omg :D
  svgStyles = {
    'display': 'inline-block',
    'fill': 'currentcolor',
    'flex-shrink': '0',
    'width': '1.5em',
    'height': '1.5em',
    'max-width': '100% ',
    'position': 'relative',
    'vertical-align': 'text-bottom',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
  };


  faImagePolaroid = faImagePolaroid;


  dismiss() {
    debugger
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
    if (this.replyPost) {
      if (this.text) {
        this.text = this.replyPost.user.screenName + ' ' + this.text;
      } else {
        this.text = this.replyPost.user.screenName;
      }
    }

    let publishPostParameters = new PublishTweetParameters(this.text);
    if (this.uploader.queue.length) {
      let fileCurrent = this.uploader.queue[0]._file;

      let mediaType = fileCurrent.type;
      let bytes = await fileCurrent.arrayBuffer();

      let uploadedImage = await this.uploadService.uploadTweetImageAsync(bytes, mediaType);
      publishPostParameters.medias = [uploadedImage];

      if (this.replyPost) {
        publishPostParameters.inReplyToTweet = this.replyPost;
        publishPostParameters.addCustomQueryParameter('in_reply_to_screen_name', this.replyPost.user.screenName);
      }

      let postWithImage = await this.postsService.publishTweetAsync(publishPostParameters);
    } else if (this.isPoll) {
      publishPostParameters.poll = this.initialPoll;
      publishPostParameters.hasPoll = true;

      await this.postsService.publishTweetAsync(publishPostParameters);
    } else if (String(this.text).trim().length) {
      await this.postsService.publishTweetAsync(publishPostParameters);
    }


    this.text = '';
    this.uploader.queue = [];
    this.isPoll = false;

    this.dismiss();
  }

  pollButtonHandler() {
    this.isPoll = !this.isPoll;

    this.textPlaceholder = !this.isPoll ? `What's happening?` : 'Ask a question...';
  }

  private changeTweetBtnBackgroundColorClassName(): void {
    if (this.rurgr8iOrR1q3imqu === this.defaultTweetBtnClassName) {
      this.rurgr8iOrR1q3imqu = this.hoveredTweetBtnClassName;
    } else {
      this.rurgr8iOrR1q3imqu = this.defaultTweetBtnClassName;
    }
  }
}
