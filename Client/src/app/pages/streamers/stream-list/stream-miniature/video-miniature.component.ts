import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
} from '@angular/core';

import {IStreamsData} from "../../models/streams-model";
import {User} from "../../../../shared/shared-main/user/user.model";

export type MiniatureDisplayOptions = {
  date?: boolean
  views?: boolean
  by?: boolean
  avatar?: boolean
  privacyLabel?: boolean
  privacyText?: boolean
  state?: boolean
  blacklistInfo?: boolean
  nsfw?: boolean
};

export type VideoLinkType = 'internal' | 'lazy-load' | 'external';

@Component({
  selector: 'my-video-miniature',
  styleUrls: ['./video-miniature.component.scss'],
  templateUrl: './video-miniature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoMiniatureComponent implements OnInit {
  @Input() user: User;
  @Input() video: IStreamsData;
  @Input() displayOptions: MiniatureDisplayOptions = {
    date: true,
    views: true,
    by: true,
    avatar: false,
    privacyLabel: false,
    privacyText: false,
    state: false,
    blacklistInfo: false
  };
  @Input() displayVideoActions = true;
  @Input() displayAsRow = false;
  @Input() videoLinkType: VideoLinkType = 'internal';

  private ownerDisplayType: 'account' | 'videoChannel';

  constructor(private cd: ChangeDetectorRef, @Inject(LOCALE_ID) private localeId: string) {

  }

  ngOnInit() {
    this.buildVideoLink();

    this.channelLinkTitle = `${this.video.user_login} (user profile)`;
  }

  showActions = false;

  channelLinkTitle = '';

  videoRouterLink: any[] = [];
  videoHref: string;
  videoTarget: string;

  buildVideoLink() {
    if (this.videoLinkType === 'internal' || !this.video.user_login) {
      this.videoRouterLink = [`/streamers/${this.video.user_login}`, ];
      return;
    }
  }

  displayOwnerAccount() {
    return this.ownerDisplayType === 'account';
  }

  loadActions() {
    if (this.displayVideoActions) {
      this.showActions = true;
    }
  }

  getClasses() {
    return {
      'display-as-row': this.displayAsRow
    };
  }

}
