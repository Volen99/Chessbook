import {Component, Input} from '@angular/core';

import {IStreamsData} from "../../models/streams-model";
import {ScreenService} from "../../../../core/wrappers/screen.service";

@Component({
  selector: 'my-video-thumbnail',
  styleUrls: ['./video-thumbnail.component.scss'],
  templateUrl: './video-thumbnail.component.html'
})
export class VideoThumbnailComponent {
  @Input() video: IStreamsData;
  @Input() nsfw = false;

  @Input() videoRouterLink: any[];
  @Input() queryParams: { [p: string]: any };
  @Input() videoHref: string;
  @Input() videoTarget: string;

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

    // TODO: fix kk
    if (this.screenService.isInMobileView()) {
      let thumb = this.video.thumbnail_url.replace('{width}', '850');
      thumb = thumb.replace('{height}', '480');
      return thumb;
    }

    let thumbnail = this.video.thumbnail_url.replace('{width}', '850');
    thumbnail = thumbnail.replace('{height}', '480');

    return thumbnail;
  }


  getVideoRouterLink() {
    if (this.videoRouterLink) return this.videoRouterLink;

    return ['/videos/watch', this.video.user_login];
  }
}
