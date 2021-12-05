import {Component, ElementRef, Input, ViewChild} from '@angular/core';

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import {PostDetails} from '../shared-main/post/post-details.model';
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
  @Input() playlistPosition: number = null;

  activeVideoId: TabId = 'url';

  customizations: Customizations;
  isAdvancedCustomizationCollapsed = true;

  constructor(protected ref: NbDialogRef<VideoShareComponent>) {
    this.customizations = {
      startAtCheckbox: false,
      startAt: 0 ? Math.floor(0) : 0,

      stopAtCheckbox: false,
      stopAt: 2, // this.video?.duration,

      subtitleCheckbox: false,
      subtitle: 'nope',

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
  }

  faTimes = faTimes;

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

  getVideoUrl() {
    const baseUrl = window.location.origin;

    return decorateVideoLink({
      url: buildVideoLink(this.video.user.screenName, this.video.id, baseUrl),

      ...this.getVideoOptions()
    });
  }

  notSecure() {
    return window.location.protocol === 'http:';
  }

  isLocalVideo() {
    return true;
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
