import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import {PostDetails} from '../shared-main/post/post-details.model';
import {VideoCaption} from "../models/posts/caption/video-caption.model";
import {buildVideoLink, decorateVideoLink} from "../../core/utils/common/url";
import {NbDialogRef} from "../../sharebook-nebular/theme/components/dialog/dialog-ref";

type Customizations = {
  startAtCheckbox: boolean
  startAt: number

  stopAtCheckbox: boolean
  stopAt: number

  subtitleCheckbox: boolean
  subtitle: string

  loop: boolean
  originUrl: boolean
  autoplay: boolean
  muted: boolean
  title: boolean
  warningTitle: boolean
  controls: boolean
  peertubeLink: boolean
};

type TabId = 'url' | 'qrcode' | 'embed';

@Component({
  selector: 'my-video-share',
  templateUrl: './video-share.component.html',
  styleUrls: ['./video-share.component.scss']
})
export class VideoShareComponent {
  @ViewChild('modal', {static: true}) modal: ElementRef;

  @Input() video: PostDetails = null;
  @Input() videoCaptions: VideoCaption[] = [];
  @Input() playlistPosition: number = null;

  activeVideoId: TabId = 'url';
  activePlaylistId: TabId = 'url';

  customizations: Customizations;
  isAdvancedCustomizationCollapsed = true;
  includeVideoInPlaylist = false;

  constructor(protected ref: NbDialogRef<VideoShareComponent>) {
    let subtitle: string;
    if (this.videoCaptions && this.videoCaptions.length !== 0) {
      subtitle = this.videoCaptions[0].language.id;
    }

    this.customizations = {
      startAtCheckbox: false,
      startAt: 0 ? Math.floor(0) : 0,

      stopAtCheckbox: false,
      stopAt: 2, // this.video?.duration,

      subtitleCheckbox: false,
      subtitle,

      loop: false,
      originUrl: false,
      autoplay: false,
      muted: false,

      // Embed options
      title: true,
      warningTitle: true,
      controls: true,
      peertubeLink: true
    };

    this.playlistPosition = 0;

    // this.modalService.open(this.modal, { centered: true })
  }

  faTimes = faTimes;

  // show(currentVideoTimestamp?: number, currentPlaylistPosition?: number) {
  //   let subtitle: string;
  //   if (this.videoCaptions && this.videoCaptions.length !== 0) {
  //     subtitle = this.videoCaptions[0].language.id;
  //   }
  //
  //   this.customizations = {
  //     startAtCheckbox: false,
  //     startAt: currentVideoTimestamp ? Math.floor(currentVideoTimestamp) : 0,
  //
  //     stopAtCheckbox: false,
  //     stopAt: 0,
  //
  //     subtitleCheckbox: false,
  //     subtitle,
  //
  //     loop: false,
  //     originUrl: false,
  //     autoplay: false,
  //     muted: false,
  //
  //     // Embed options
  //     title: true,
  //     warningTitle: true,
  //     controls: true,
  //     peertubeLink: true
  //   };
  //
  //   this.playlistPosition = currentPlaylistPosition;
  //
  //   this.modalService.open(this.modal, {centered: true});
  // }

  getVideoUrl() {
    const baseUrl = window.location.origin; /*this.customizations.originUrl
      ? this.video.originInstanceUrl
      : window.location.origin;*/

    return decorateVideoLink({
      url: buildVideoLink(this.video.user.screenName, this.video.id, baseUrl),

      ...this.getVideoOptions()
    });
  }

  notSecure() {
    return window.location.protocol === 'http:';
  }

  isVideoInEmbedTab() {
    return this.activeVideoId === 'embed';
  }

  isLocalVideo() {
    return true; // this.video.isLocal;
  }

  cancel() {
    this.ref.close();
  }

  private getVideoOptions() {
    return {
      startTime: this.customizations.startAtCheckbox ? this.customizations.startAt : undefined,
      stopTime: this.customizations.stopAtCheckbox ? this.customizations.stopAt : undefined,

      subtitle: this.customizations.subtitleCheckbox ? this.customizations.subtitle : undefined,

      loop: this.customizations.loop,
      autoplay: this.customizations.autoplay,
      muted: this.customizations.muted,

      title: this.customizations.title,
      warningTitle: this.customizations.warningTitle,
      controls: this.customizations.controls,
      peertubeLink: this.customizations.peertubeLink
    };
  }
}
