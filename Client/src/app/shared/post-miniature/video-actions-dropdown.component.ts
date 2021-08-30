import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { VideoReportComponent } from '../shared-moderation/report-modals/video-report.component';
import { VideoBlockComponent } from '../shared-moderation/video-block.component';
import {PostDetails} from "../shared-main/post/post-details.model";
import { Post } from '../shared-main/post/post.model';
import {DropdownAction, DropdownButtonSize, DropdownDirection} from "../shared-main/buttons/action-dropdown.component";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {ConfirmService} from "../../core/confirm/confirm.service";
import {BlocklistService} from "../shared-moderation/blocklist.service";
import {ScreenService} from "../../core/wrappers/screen.service";
import {VideoBlockService} from "../shared-moderation/video-block.service";
import {PostsService} from "../posts/posts.service";
import { RedundancyService } from '../shared-main/post/redundancy.service';
import {VideoCaption} from "../models/posts/caption/video-caption.model";
import {UserStore} from "../../core/stores/user.store";

import {
  faFish,
} from '@fortawesome/pro-light-svg-icons';

export type VideoActionsDisplayType = {
  playlist?: boolean
  download?: boolean
  update?: boolean
  blacklist?: boolean
  delete?: boolean
  report?: boolean
  duplicate?: boolean
  mute?: boolean
  liveInfo?: boolean
};

@Component({
  selector: 'my-video-actions-dropdown',
  templateUrl: './video-actions-dropdown.component.html',
  styleUrls: ['./video-actions-dropdown.component.scss']
})
export class VideoActionsDropdownComponent implements OnChanges {
  @ViewChild('playlistDropdown') playlistDropdown: NgbDropdown;

  /*@ViewChild('videoDownloadModal') videoDownloadModal: VideoDownloadComponent;*/
  @ViewChild('videoReportModal') videoReportModal: VideoReportComponent;
  @ViewChild('videoBlockModal') videoBlockModal: VideoBlockComponent;

  @Input() video: Post | PostDetails;
  @Input() videoCaptions: VideoCaption[] = [];

  @Input() displayOptions: VideoActionsDisplayType = {
    playlist: false,
    download: true,
    update: true,
    blacklist: true,
    delete: true,
    report: true,
    duplicate: true,
    mute: true,
    liveInfo: false
  };
  @Input() placement = 'left';

  @Input() label: string;

  @Input() buttonStyled = false;
  @Input() buttonSize: DropdownButtonSize = 'normal';
  @Input() buttonDirection: DropdownDirection = 'vertical';

  @Output() videoRemoved = new EventEmitter();
  @Output() videoUnblocked = new EventEmitter();
  @Output() videoBlocked = new EventEmitter();
  @Output() videoAccountMuted = new EventEmitter();
  @Output() modalOpened = new EventEmitter();

  videoActions: DropdownAction<{ video: Post }>[][] = [];

  private loaded = false;

  constructor(
    private authService: UserStore,
    private notifier: NbToastrService,
    private confirmService: ConfirmService,
    private blocklistService: BlocklistService,
    private videoBlocklistService: VideoBlockService,
    private screenService: ScreenService,
    private videoService: PostsService,
    private redundancyService: RedundancyService
  ) {
  }

  get user() {
    return this.authService.getUser();
  }

  ngOnChanges() {
    if (this.loaded) {
      this.loaded = false;
      // if (this.playlistAdd) {
      //   this.playlistAdd.reload();
      // }
    }

    this.buildActions();
  }

  faFish = faFish;

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  loadDropdownInformation() {
    if (!this.isUserLoggedIn() || this.loaded === true) return;

    this.loaded = true;

    // if (this.displayOptions.playlist) {
    //   this.playlistAdd.load();
    // }
  }

  /* Show modals */

  showDownloadModal() {
    this.modalOpened.emit();

    // this.videoDownloadModal.show(this.video as PostDetails, this.videoCaptions);
  }

  showReportModal() {
    this.modalOpened.emit();

    this.videoReportModal.show();
  }

  showBlockModal() {
    this.modalOpened.emit();

    this.videoBlockModal.show();
  }

  showLiveInfoModal(video: Post) {
    this.modalOpened.emit();

    // this.liveStreamInformationModal.show(video);
  }

  /* Actions checker */

  isVideoUpdatable() {
    return this.video.isUpdatableBy(this.user);
  }

  isVideoRemovable() {
    return this.video.isRemovableBy(this.user);
  }

  isVideoBlockable() {
    return this.video.isBlockableBy(this.user);
  }

  isVideoUnblockable() {
    return this.video.isUnblockableBy(this.user);
  }

  canVideoBeDuplicated() {
    return /*!this.video.isLive && */this.video.canBeDuplicatedBy(this.user);
  }

  isVideoAccountMutable() {
    return this.video.user.id !== this.user.id;
  }

  /* Action handlers */

  async unblockVideo() {
    const confirmMessage = `Do you really want to unblock this video? It will be available again in the videos list.`;

    const res = await this.confirmService.confirm(confirmMessage, `Unblock`);
    if (res === false) return;

    this.videoBlocklistService.unblockVideo(this.video.id)
      .subscribe(
        () => {
          this.notifier.success(`Video ${this.video.id} unblocked.`);

          this.video.blacklisted = false;
          this.video.blockedReason = null;

          this.videoUnblocked.emit();
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  async removeVideo() {
    this.modalOpened.emit();

    let message = `Do you really want to delete this video?`;
    // if (this.video.isLive) {
    //   message += ' ' + `The live stream will be automatically terminated.`;
    // }

    const res = await this.confirmService.confirm(message, `Delete`);
    if (res === false) return;

    this.videoService.removePost(this.video.id)
      .subscribe(
        () => {
          this.notifier.success(`Video ${this.video.id} deleted.`);
          this.videoRemoved.emit();
        },

        error => this.notifier.danger(error.message, 'Error')
      );
  }

  duplicateVideo() {
    this.redundancyService.addVideoRedundancy(this.video)
      .subscribe(
        () => {
          const message = `This video will be duplicated by your instance.`;
          this.notifier.success(message);
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  muteVideoAccount() {
    const params = {screenName: this.video.user.screenName /*Actor.CREATE_BY_STRING(this.video.account.name, this.video.account.host)*/};

    this.blocklistService.blockAccountByUser(params)
      .subscribe(
        () => {
          this.notifier.success(`Account ${params.screenName} muted.`);
          this.videoAccountMuted.emit();
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  onVideoBlocked() {
    this.videoBlocked.emit();
  }

  getPlaylistDropdownPlacement() {
    if (this.screenService.isInSmallView()) {
      return 'bottom-right';
    }

    return 'bottom-left bottom-right';
  }

  private buildActions() {
    this.videoActions = [
      [
        {
          label: `Save to playlist`,
          handler: () => this.playlistDropdown.toggle(),
          isDisplayed: () => this.authService.isLoggedIn() && this.displayOptions.playlist,
          iconName: this.faFish,
        }
      ],
      [ // actions regarding the video
        {
          label: `Update`,
          linkBuilder: ({video}) => ['/videos/update', video.uuid],
          iconName: this.faFish,
          isDisplayed: () => this.authService.isLoggedIn() && this.displayOptions.update && this.isVideoUpdatable()
        },
        {
          label: `Block`,
          handler: () => this.showBlockModal(),
          iconName: this.faFish,
          isDisplayed: () => this.authService.isLoggedIn() && this.displayOptions.blacklist && this.isVideoBlockable()
        },
        {
          label: `Unblock`,
          handler: () => this.unblockVideo(),
          iconName: this.faFish,
          isDisplayed: () => this.authService.isLoggedIn() && this.displayOptions.blacklist && this.isVideoUnblockable()
        },
        {
          label: `Mirror`,
          handler: () => this.duplicateVideo(),
          isDisplayed: () => this.authService.isLoggedIn() && this.displayOptions.duplicate && this.canVideoBeDuplicated(),
          iconName: this.faFish,
        },
        {
          label: `Delete`,
          handler: () => this.removeVideo(),
          isDisplayed: () => this.authService.isLoggedIn() && this.displayOptions.delete && this.isVideoRemovable(),
          iconName: this.faFish,
        },
        {
          label: `Report`,
          handler: () => this.showReportModal(),
          isDisplayed: () => this.authService.isLoggedIn() && this.displayOptions.report,
          iconName: this.faFish,
        }
      ],
      [ // actions regarding the account/its server
        {
          label: `Mute account`,
          handler: () => this.muteVideoAccount(),
          isDisplayed: () => this.authService.isLoggedIn() && this.displayOptions.mute && this.isVideoAccountMutable(),
          iconName: this.faFish,
        }
      ]
    ];
  }
}
