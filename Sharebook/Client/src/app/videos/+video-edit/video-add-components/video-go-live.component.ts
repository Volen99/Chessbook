import {forkJoin} from 'rxjs';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {VideoSend} from './video-send';
import {CanComponentDeactivate} from "../../../core/routing/can-deactivate-guard.service";
import {LiveVideo} from "../../../shared/models/videos/live/live-video.model";
import {VideoPrivacy} from "../../../shared/models/videos/video-privacy.enum";
import {FormValidatorService} from "../../../shared/shared-forms/form-validator.service";
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Notifier} from "../../../core/notification/notifier-service";
import {AuthService} from "../../../core/auth/auth.service";
import {ServerService} from "../../../core/server";
import {VideoService} from "../../../shared/main/video/video.service";
import {VideoCaptionService} from "../../../shared/main/video-caption/video-caption.service";
import {LiveVideoService} from "../../../shared/shared-video-live/live-video.service";
import {LiveVideoCreate} from "../../../shared/models/videos/live/live-video-create.model";
import {ServerErrorCode} from "../../../shared/models/server/server-error-code.enum";
import {VideoEdit} from "../../../shared/main/video/video-edit.model";
import {LiveVideoUpdate} from "../../../shared/models/videos/live/live-video-update.model";
import {scrollToTop} from "../../../helpers/utils";

@Component({
  selector: 'my-video-go-live',
  templateUrl: './video-go-live.component.html',
  styleUrls: [
    '../shared/video-edit.component.scss',
    './video-send.scss'
  ]
})
export class VideoGoLiveComponent extends VideoSend implements OnInit, CanComponentDeactivate {
  @Output() firstStepDone = new EventEmitter<string>();
  @Output() firstStepError = new EventEmitter<void>();

  isInUpdateForm = false;

  liveVideo: LiveVideo;
  videoId: number;
  videoUUID: string;
  error: string;

  protected readonly DEFAULT_VIDEO_PRIVACY = VideoPrivacy.PUBLIC;

  constructor(
    protected formValidatorService: FormValidatorService,
    protected loadingBar: LoadingBarService,
    protected notifier: Notifier,
    protected authService: AuthService,
    protected serverService: ServerService,
    protected videoService: VideoService,
    protected videoCaptionService: VideoCaptionService,
    private liveVideoService: LiveVideoService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  canDeactivate() {
    return {canDeactivate: true};
  }

  goLive() {
    const video: LiveVideoCreate = {
      name: 'Live',
      privacy: VideoPrivacy.PRIVATE,
      nsfw: this.serverConfig.instance.isNSFW,
      waitTranscoding: true,
      commentsEnabled: true,
      downloadEnabled: true,
      channelId: this.firstStepChannelId
    };

    // Go live in private mode, but correctly fill the update form with the first user choice
    const toPatch = Object.assign({}, video, {privacy: this.firstStepPrivacyId});
    this.form.patchValue(toPatch);

    this.liveVideoService.goLive(video).subscribe(
      res => {
        this.videoId = res.video.id;
        this.videoUUID = res.video.uuid;
        this.isInUpdateForm = true;

        this.firstStepDone.emit(name);

        this.fetchVideoLive();
      },

      err => {
        this.firstStepError.emit();

        let message = err.message;

        if (err.body?.code === ServerErrorCode.MAX_INSTANCE_LIVES_LIMIT_REACHED) {
          message = $localize`Cannot create live because this instance have too many created lives`;
        } else if (err.body?.code) {
          message = $localize`Cannot create live because you created too many lives`;
        }

        this.notifier.error(message);
      }
    );
  }

  updateSecondStep() {
    if (this.checkForm() === false) {
      return;
    }

    const video = new VideoEdit();
    video.patch(this.form.value);
    video.id = this.videoId;
    video.uuid = this.videoUUID;

    const liveVideoUpdate: LiveVideoUpdate = {
      saveReplay: this.form.value.saveReplay,
      permanentLive: this.form.value.permanentLive
    };

    // Update the video
    forkJoin([
      this.updateVideoAndCaptions(video),

      this.liveVideoService.updateLive(this.videoId, liveVideoUpdate)
    ]).subscribe(
      () => {
        this.notifier.success($localize`Live published.`);

        this.router.navigate(['/videos/watch', video.uuid]);
      },

      err => {
        this.error = err.message;
        scrollToTop();
        console.error(err);
      }
    );
  }

  getMaxLiveDuration() {
    return this.serverConfig.live.maxDuration / 1000;
  }

  private fetchVideoLive() {
    this.liveVideoService.getVideoLive(this.videoId)
      .subscribe(
        liveVideo => {
          this.liveVideo = liveVideo;
        },

        err => {
          this.firstStepError.emit();
          this.notifier.error(err.message);
        }
      );
  }
}
