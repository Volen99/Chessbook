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
import {LinkType} from '../../../types/link.type';
import {ActorAvatarSize} from '../shared-actor-image/actor-avatar.component';
import {VideoActionsDisplayType} from './video-actions-dropdown.component';
import {User} from "../shared-main/user/user.model";
import { Post } from '../shared-main/post/post.model';
import {HTMLServerConfig} from "../models/server/server-config.model";
import {ScreenService} from "../../core/wrappers/screen.service";
import {ServerService} from "../../core/server/server.service";
import { PostPrivacy } from '../models/enums/post-privacy';
import {UserStore} from "../../core/stores/user.store";

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

@Component({
  selector: 'my-video-miniature',
  styleUrls: ['./video-miniature.component.scss'],
  templateUrl: './video-miniature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoMiniatureComponent implements OnInit {
  @Input() user: User;
  @Input() video: Post;

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

  @Input() actorImageSize: ActorAvatarSize = '40';

  @Input() displayAsRow = false;

  @Input() videoLinkType: LinkType = 'internal';

  @Output() videoBlocked = new EventEmitter();
  @Output() videoUnblocked = new EventEmitter();
  @Output() videoRemoved = new EventEmitter();
  @Output() videoAccountMuted = new EventEmitter();

  videoActionsDisplayOptions: VideoActionsDisplayType = {
    playlist: true,
    download: false,
    update: true,
    blacklist: true,
    delete: true,
    report: true,
    duplicate: true,
    mute: true
  };
  showActions = false;
  serverConfig: HTMLServerConfig;

  addToWatchLaterText: string;
  addedToWatchLaterText: string;
  inWatchLaterPlaylist: boolean;
  channelLinkTitle = '';

  watchLaterPlaylist: {
    id: number
    playlistElementId?: number
  };

  videoRouterLink: string | any[] = [];
  videoHref: string;
  videoTarget: string;

  private ownerDisplayType: 'account' | 'videoChannel';

  constructor(
    private screenService: ScreenService,
    private serverService: ServerService,
    private authService: UserStore,
    private cd: ChangeDetectorRef,
    @Inject(LOCALE_ID) private localeId: string
  ) {
  }

  get isVideoBlur() {
    return false;
    // return this.video.isVideoNSFWForUser(this.user, this.serverConfig);
  }

  ngOnInit() {
    this.serverConfig = this.serverService.getHTMLConfig();
    this.buildVideoLink();

    this.setUpBy();

    this.channelLinkTitle = `${this.video.user.screenName} (user profile)`;

    // We rely on mouseenter to lazy load actions
    if (this.screenService.isInTouchScreen()) {
      this.loadActions();
    }
  }

  buildVideoLink() {
    if (this.videoLinkType === 'internal' || !this.video.url) {
      this.videoRouterLink = Post.buildWatchUrl(this.video);
      return;
    }

    if (this.videoLinkType === 'external') {
      this.videoRouterLink = null;
      this.videoHref = this.video.url;
      this.videoTarget = '_blank';
      return;
    }

    // Lazy load
    this.videoRouterLink = ['/search/lazy-load-video', {url: this.video.url}];
  }

  displayOwnerAccount() {
    return this.ownerDisplayType === 'account';
  }

  displayOwnerVideoChannel() {
    return this.ownerDisplayType === 'videoChannel';
  }

  isUnlistedVideo() {
    return false; // this.video.privacy.id === PostPrivacy.UNLISTED;
  }

  isPrivateVideo() {
    return this.video.privacy.id === PostPrivacy.PRIVATE;
  }

  getStateLabel(video: Post) {
    // if (!video.state) return '';

    // if (video.privacy.id !== PostPrivacy.PRIVATE && video.state.id === VideoState.PUBLISHED) {
    //   return $localize`Published`;
    // }

    // if (video.scheduledUpdate) {
    //   const updateAt = new Date(video.scheduledUpdate.updateAt.toString()).toLocaleString(this.localeId);
    //   return $localize`Publication scheduled on ` + updateAt;
    // }
    //
    // if (video.state.id === VideoState.TO_TRANSCODE && video.waitTranscoding === true) {
    //   return $localize`Waiting transcoding`;
    // }
    //
    // if (video.state.id === VideoState.TO_TRANSCODE) {
    //   return $localize`To transcode`;
    // }
    //
    // if (video.state.id === VideoState.TO_IMPORT) {
    //   return $localize`To import`;
    // }

    return '';
  }

  loadActions() {
    if (this.displayVideoActions) this.showActions = true;

    // this.loadWatchLater();
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
    return this.authService.isLoggedIn();
  }

  getClasses() {
    return {
      'display-as-row': this.displayAsRow
    };
  }

  private setUpBy() {
    const accountName = this.video.user.screenName;

    // If the video channel name is an UUID (not really displayable, we changed this behaviour in v1.0.0-beta.12)
    // Or has not been customized (default created channel display name)
    // -> Use the account name
    if (
      this.video.user.displayName === `Default ${accountName} channel` ||
      this.video.user.displayName === `Main ${accountName} channel` ||
      this.video.user.screenName.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    ) {
      this.ownerDisplayType = 'account';
    } else {
      this.ownerDisplayType = 'videoChannel';
    }
  }
}
