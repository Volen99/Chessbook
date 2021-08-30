import {Component, EventEmitter, Input, Output} from '@angular/core';

import { Post } from '../shared-main/post/post.model';
import {ScreenService} from "../../core/wrappers/screen.service";

@Component({
  selector: 'my-video-thumbnail',
  styleUrls: ['./video-thumbnail.component.scss'],
  templateUrl: './video-thumbnail.component.html'
})
export class VideoThumbnailComponent {
  @Input() video: Post;
  @Input() nsfw = false;

  @Input() videoRouterLink: string | any[];
  @Input() queryParams: { [p: string]: any };
  @Input() videoHref: string;
  @Input() videoTarget: string;

  @Input() displayWatchLaterPlaylist: boolean;
  @Input() inWatchLaterPlaylist: boolean;

  @Output() watchLaterClick = new EventEmitter<boolean>();

  addToWatchLaterText: string;
  addedToWatchLaterText: string;

  constructor(private screenService: ScreenService) {
    this.addToWatchLaterText = `Add to watch later`;
    this.addedToWatchLaterText = `Remove from watch later`;
  }

  // isLiveEnded() {
  //   if (!this.video.state) return;
  //
  //   return this.video.state.id === VideoState.LIVE_ENDED;
  // }

  getImageUrl() {
    if (!this.video) return '';

    if (this.screenService.isInMobileView()) {
      return this.video.entities.medias[0].thumbImageUrl;
    }

    return this.video.entities.medias[0].thumbImageUrl;
  }

  // getProgressPercent() {
  //   if (!this.video.userHistory) return 0;
  //
  //   const currentTime = this.video.userHistory.currentTime;
  //
  //   return (currentTime / this.video.duration) * 100;
  // }

  getVideoRouterLink() {
    if (this.videoRouterLink) {
      return this.videoRouterLink;
    }

    return Post.buildWatchUrl(this.video);
  }

  onWatchLaterClick(event: Event) {
    this.watchLaterClick.emit(this.inWatchLaterPlaylist);

    event.stopPropagation();
    return false;
  }
}
