import {catchError, switchMap, tap} from 'rxjs/operators';
import {Directive, EventEmitter, OnInit} from '@angular/core';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {FormReactive} from "../../../shared/shared-forms/form-reactive";
import {SelectChannelItem} from "../../../shared/shared-forms/select/select-channel.component";
import {VideoConstant} from "../../../shared/models/videos/video-constant.model";
import {VideoCaptionEdit} from "../../../shared/main/video-caption/video-caption-edit.model";
import {VideoPrivacy} from "../../../shared/models/videos/video-privacy.enum";
import {Notifier} from "../../../core/notification/notifier-service";
import {AuthService} from "../../../core/auth/auth.service";
import {ServerService} from "../../../core/server";
import {VideoService} from "../../../shared/main/video/video.service";
import {VideoCaptionService} from "../../../shared/main/video-caption/video-caption.service";
import {ServerConfig} from "../../../shared/models/server/server-config.model";
import {CanComponentDeactivateResult} from "../../../core/routing/can-deactivate-guard.service";
import {populateAsyncUserVideoChannels} from "../../../helpers/utils";
import {VideoEdit} from "../../../shared/main/video/video-edit.model";

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class VideoSend extends FormReactive implements OnInit {
  userVideoChannels: SelectChannelItem[] = [];
  videoPrivacies: VideoConstant<VideoPrivacy>[] = [];
  videoCaptions: VideoCaptionEdit[] = [];

  firstStepPrivacyId = 0;
  firstStepChannelId = 0;

  abstract firstStepDone: EventEmitter<string>;
  abstract firstStepError: EventEmitter<void>;
  protected abstract readonly DEFAULT_VIDEO_PRIVACY: VideoPrivacy;

  protected loadingBar: LoadingBarService;
  protected notifier: Notifier;
  protected authService: AuthService;
  protected serverService: ServerService;
  protected videoService: VideoService;
  protected videoCaptionService: VideoCaptionService;
  protected serverConfig: ServerConfig;

  abstract canDeactivate(): CanComponentDeactivateResult;

  ngOnInit() {
    this.buildForm({});

    populateAsyncUserVideoChannels(this.authService, this.userVideoChannels)
      .then(() => this.firstStepChannelId = this.userVideoChannels[0].id);

    this.serverConfig = this.serverService.getTmpConfig();
    this.serverService.getConfig()
      .subscribe(config => this.serverConfig = config);

    this.serverService.getVideoPrivacies()
      .subscribe(
        privacies => {
          this.videoPrivacies = this.videoService.explainedPrivacyLabels(privacies);

          this.firstStepPrivacyId = this.DEFAULT_VIDEO_PRIVACY;
        });
  }

  checkForm() {
    this.forceCheck();

    return this.form.valid;
  }

  protected updateVideoAndCaptions(video: VideoEdit) {
    this.loadingBar.useRef().start();

    return this.videoService.updateVideo(video)
      .pipe(
        // Then update captions
        switchMap(() => this.videoCaptionService.updateCaptions(video.id, this.videoCaptions)),
        tap(() => this.loadingBar.useRef().complete()),
        catchError(err => {
          this.loadingBar.useRef().complete();
          throw err;
        })
      );
  }
}
