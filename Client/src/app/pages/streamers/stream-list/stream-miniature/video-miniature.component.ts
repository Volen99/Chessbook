import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output
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
  @Output() videoBlocked = new EventEmitter();
  @Output() videoUnblocked = new EventEmitter();
  @Output() videoRemoved = new EventEmitter();
  @Output() videoAccountMuted = new EventEmitter();

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

    this.setUpBy();

    this.channelLinkTitle = $localize`${this.video.user_login} (user profile)`;

    // // We rely on mouseenter to lazy load actions
    // if (this.screenService.isInTouchScreen()) {
    //   this.loadActions();
    // }
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

  displayOwnerVideoChannel() {
    return this.ownerDisplayType === 'videoChannel';
  }

  // getAvatarUrl() {
  //   if (this.displayOwnerAccount()) {
  //     return this.video.account.avatar?.url;
  //   }
  //
  //   return this.video.videoChannelAvatarUrl;
  // }

  loadActions() {
    if (this.displayVideoActions) {
      this.showActions = true;
    }
  }

  onVideoBlocked() {
    this.videoBlocked.emit();
  }

  onVideoUnblocked() {
    this.videoUnblocked.emit();
  }

  onVideoRemoved() {
    this.videoRemoved.emit();
  }

  onVideoAccountMuted() {
    this.videoAccountMuted.emit();
  }

  isUserLoggedIn() {
    // return this.authService.isLoggedIn();
  }

  getClasses() {
    return {
      'display-as-row': this.displayAsRow
    };
  }

  private setUpBy() {
    const accountName = this.video.user_login;
  }
}
