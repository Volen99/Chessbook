import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Post} from '../shared-main/post/post.model';
import {ScreenService} from "../../core/wrappers/screen.service";
import {IsVideoPipe} from "../shared-main/angular/pipes/is-video.pipe";

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

  getImageUrl() {
    if (!this.video) {
      return '';
    }

    if (this.video.entities.medias.length === 0) {
      if (this.video.poll) return '/assets/images/default-poll.png';
      else if (this.video.card) return this.video.card.image;
      else if (this.video.clipThumbnail) return this.video.clipThumbnail;

      if (IsVideoPipe.isYoutube(this.video.status)) {
        let id = IsVideoPipe.getYoutubeIdFromLink(this.video.status);
        return `//img.youtube.com/vi/${id}/hqdefault.jpg`;
      }

      return `/assets/images/default-post-image.jpg`;
    }

    if (this.video.entities.medias[0].imageUrl.endsWith('.gif')) return this.video.entities.medias[0].fullSizeImageUrl;
    if (this.screenService.isInMobileView()) return this.video.entities.medias[0].thumbImageUrl; // consider to be thumbUrl kk

    return this.video.entities.medias[0].imageUrl; // // consider to be thumbUrl kk
  }

  getVideoRouterLink() {
    if (this.videoRouterLink) {
      return this.videoRouterLink;
    }

    return Post.buildWatchUrl(this.video);
  }

}
