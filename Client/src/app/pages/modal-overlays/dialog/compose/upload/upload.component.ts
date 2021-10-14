// I am back!! 💙 06.11.2020, Friday
import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {length} from 'stringz';
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {
  faGlobeAfrica,
  faGlobeAmericas,
  faGlobeAsia,
  faGlobeEurope,
  faImagePolaroid,
  faPoll,
  faTimes,
  faSmileWink,
  faCalendarDay,
} from '@fortawesome/pro-light-svg-icons';

import {FileUploader} from "./file-uploader.class";
import {UploadService} from "./upload.service";
import {PostsService} from "../../../../../shared/posts/posts.service";
import {PublishTweetParameters} from "../../../../../shared/posts/parameters/publish-tweet-parameters";
import {NbDialogRef} from "../../../../../sharebook-nebular/theme/components/dialog/dialog-ref";
import {ShowcaseDialogComponent} from "../../showcase-dialog/showcase-dialog.component";
import {WhoCanReplyComponent} from "../../../popovers/components/who-can-reply/who-can-reply.component";
import {PostPrivacy} from "../../../../../shared/models/enums/post-privacy";
import {PostDetails} from "../../../../../shared/shared-main/post/post-details.model";
import {countableText} from "../../../../../features/compose/util/counter";
import {UserStore} from "../../../../../core/stores/user.store";
import {IUser} from "../../../../../core/interfaces/common/users";
import {NbToastrService} from "../../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {Post} from "../../../../../shared/shared-main/post/post.model";
import {PostSend} from "../../../../../shared/posts/post-send";
import {FormValidatorService} from 'app/shared/shared-forms/form-validator.service';
import {CanComponentDeactivateResult} from "../../../../../core/routing/can-deactivate-guard.service";
import {FormGroup, Validators} from '@angular/forms';
import {map} from "rxjs/operators";
import {
  VIDEO_PRIVACY_VALIDATOR,
  VIDEO_TAGS_ARRAY_VALIDATOR
} from "../../../../../shared/shared-forms/form-validators/video-validators";
import { FormReactiveValidationMessages } from 'app/shared/shared-forms/form-reactive';
import {IsVideoPipe} from "../../../../../shared/shared-main/angular/pipes/is-video.pipe";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss', './post-send.scss'],
})
export class UploadComponent extends PostSend implements OnInit, OnChanges, OnDestroy {
  @Output() textChange = new EventEmitter<string>();

  @Input() title: string;
  @Input() text: string = '';
  @Input() replyPost: Post;

  @Input() form: FormGroup;
  @Input() formErrors: { [id: string]: string } = {};
  @Input() validationMessages: FormReactiveValidationMessages = {};

  private globes: IconDefinition[] = [faGlobeEurope, faGlobeAsia, faGlobeAmericas, faGlobeAfrica];
  private firstPatchDone = false;

  constructor(private uploadService: UploadService,
              protected postsService: PostsService,
              protected ref: NbDialogRef<ShowcaseDialogComponent>,
              private userStore: UserStore,
              protected notifier: NbToastrService,
              protected formValidatorService: FormValidatorService) {
    super();

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

  updateForm() {
    const defaultValues: any = {
      nsfw: 'false',
      commentsEnabled: 'true',
      downloadEnabled: 'true',
      waitTranscoding: 'true',
      tags: []
    };

    const obj: any = {
      privacy: VIDEO_PRIVACY_VALIDATOR,
      tags: VIDEO_TAGS_ARRAY_VALIDATOR,
    };

    this.formValidatorService.updateForm(
      this.form,
      this.formErrors,
      this.validationMessages,
      obj,
      defaultValues
    );

    this.trackPrivacyChange();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialPoll.options.length > 2) {
      this.isPoll = true;
    }
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.updateForm();

    this.response = '';

    this.user = this.userStore.getUser();

    this.textPlaceholder = this.isPoll ? 'Ask a question...' : this.replyPost ? 'Post your reply' : `What's happening?`;


    this.uploader.response.subscribe(res => {
      this.response = res;
    });

    this.getGlobe();
  }

  ngOnDestroy(): void {
  }

  public videoId: string;

  initialPoll: any = {
    options: ['', ''],
    expiresIn: 24 * 3600,
    multiple: false,
  };

  user: IUser;
  isPoll: boolean = false;
  textPlaceholder: string;
  privacy: PostPrivacy = PostPrivacy.PUBLIC;

  public whoCanReplyComponent = WhoCanReplyComponent;

  anyMedia: boolean;

  globeCurrent: IconDefinition;

  faPoll = faPoll;
  faTimes = faTimes;
  faCalendarDay = faCalendarDay;
  faSmileWink = faSmileWink;

  faImagePolaroid = faImagePolaroid;

  helpVisible = true;

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

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


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public async fileDrop(files: File[]) {
  }

  canSubmit() {
    this.anyMedia = this.uploader.queue.length > 0;

    const fulltext = this.getFulltextForCharacterCounting();
    const isOnlyWhitespace = fulltext.length !== 0 && fulltext.trim().length === 0;

    return !(length(fulltext) > 440 || (isOnlyWhitespace && !this.anyMedia) || !this.form.valid);
  }

  getFulltextForCharacterCounting = () => {
    return ['', countableText(this.text)].join('');
  };


  dismiss() {
    this.ref.close();
  }

  updateValue(value) {
    this.text = value.innerText;

    this.getFulltextForCharacterCounting();
    // this.textChange.emit(value.innerText);
  }

  public async shareButtonHandler() {
    if (!this.canSubmit()) {
      return;
    }

    if (this.replyPost) {
      if (this.text) {
        this.text = this.replyPost.user.screenName + ' ' + this.text;
      } else {
        this.text = this.replyPost.user.screenName;
      }
    }

    let publishPostParameters = new PublishTweetParameters(this.text);
    let medias = [];

    let tags = this.form.get('tags').value ?? [];
    let privacy = this.firstStepPrivacyId;
    let publishPostBody: any = {
      tags: tags,
      privacy: privacy,
    };
    if (this.uploader.queue.length) {
      for (const file of this.uploader.queue) {
        let fileCurrent = file._file;

        let formData = new FormData();
        formData.append(fileCurrent.name, fileCurrent);

        await this.uploadService.uploadImage(formData).toPromise()
          .then((data) => {
            medias.push(data);
          });

        // let mediaType = fileCurrent.type;
        // let bytes = await fileCurrent.arrayBuffer();
        //
        // let uploadedImage = await this.uploadService.uploadBinaryAsync(bytes, mediaType)
        //   .then((data) => {
        //     medias.push(data);
        //   });
      }

      if (this.replyPost) {
        publishPostParameters.inReplyToTweet = this.replyPost;
        publishPostParameters.addCustomQueryParameter('in_reply_to_screen_name', this.replyPost.user.screenName);
      }

      publishPostParameters.medias = medias;

      let postWithImage = await this.postsService.publishTweetAsync(publishPostParameters, publishPostBody);
    } else if (this.isPoll) {
      publishPostBody.poll = this.initialPoll;

      await this.postsService.publishTweetAsync(publishPostParameters, publishPostBody);
    } else if (String(this.text).trim().length) {
      await this.postsService.publishTweetAsync(publishPostParameters, publishPostBody);
    }

    this.text = '';
    this.uploader.queue = [];
    this.isPoll = false;

    this.dismiss();
  }

  private expiresInFromExpiresAt (expires_at) {
    if (!expires_at) return 24 * 3600;
    const delta = (new Date(expires_at).getTime() - Date.now()) / 1000;
    return [300, 1800, 3600, 21600, 86400, 259200, 604800].find(expires_in => expires_in >= delta) || 24 * 3600;
  }

  pollButtonHandler() {
    this.isPoll = !this.isPoll;

    this.textPlaceholder = !this.isPoll ? `What's happening?` : 'Ask a question...';
  }

  emojiButtonHandler() {
    this.notifier.warning('', 'Coming out soon');
    return;
  }

  scheduleButtonHandler() {
    this.notifier.warning('', 'Coming out soon');
    return;
  }


  getGlobe() {
    this.globeCurrent = this.globes[this.globes.length * Math.random() | 0];
  }

  firstStepDone: EventEmitter<string>;
  firstStepError: EventEmitter<void>;

  canDeactivate(): CanComponentDeactivateResult {
    return undefined;
  }

  changePrivacy(newPrivacyId: number) {
    this.firstStepPrivacyId = newPrivacyId;
  }

  embedUrl: string;
  public getVideoEmbedLink() {
    if (IsVideoPipe.isYoutube(this.text)) {
      const parts = IsVideoPipe._youtubeRegEx.exec(this.text);
      if (this.videoId && this.videoId === parts[5]) {
        return true;
      }

      this.videoId = parts[5];
      this.embedUrl = IsVideoPipe.getYoutubeEmbedLink(this.text);
      return true;
    } else if (IsVideoPipe.isTwitch(this.text)) {
      const parts = IsVideoPipe._twitchRegEx.exec(this.text);
      if (this.videoId && this.videoId === parts[3]) {
        return true;
      }

      this.videoId = parts[3];
      this.embedUrl = IsVideoPipe.getTwitchEmbedLink(this.text);
      return true;
    } else if (IsVideoPipe.isTwitchClip(this.text)) {
      const parts = IsVideoPipe._twitchClipRegEx.exec(this.text);
      if (!parts[2].includes('clip')) {
        return false;
      }

      this.embedUrl = IsVideoPipe.getTwitchClipEmbedLink(this.text);
      return true;
    }

    return false;
  }

  private trackPrivacyChange() {
    // We will update the schedule input and the wait transcoding checkbox validators
    this.form.controls['privacy']
      .valueChanges
      .pipe(map(res => parseInt(res.toString(), 10)))
      .subscribe(
        newPrivacyId => {

          // Value changed
          const scheduleControl = this.form.get('schedulePublicationAt');
          const waitTranscodingControl = this.form.get('waitTranscoding');

          scheduleControl.clearValidators();

          waitTranscodingControl.enable();

          // Do not update the control value on first patch (values come from the server)
          if (this.firstPatchDone === true) {
            waitTranscodingControl.setValue(true);
          }

          scheduleControl.updateValueAndValidity();
          waitTranscodingControl.updateValueAndValidity();

          this.firstPatchDone = true;

        }
      );
  }
}
