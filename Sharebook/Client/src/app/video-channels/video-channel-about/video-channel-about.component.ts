import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarkdownService } from '../../core';
import { VideoChannel, VideoChannelService } from '../../shared/shared-main';

@Component({
  selector: 'app-video-channel-about',
  templateUrl: './video-channel-about.component.html',
  styleUrls: [ './video-channel-about.component.scss' ]
})
export class VideoChannelAboutComponent implements OnInit, OnDestroy {
  videoChannel: VideoChannel;
  descriptionHTML = '';
  supportHTML = '';

  private videoChannelSub: Subscription;

  constructor(
    private videoChannelService: VideoChannelService,
    private markdownService: MarkdownService
  ) {
  }

  ngOnInit() {
    // Parent get the video channel for us
    this.videoChannelSub = this.videoChannelService.videoChannelLoaded
      .subscribe(async videoChannel => {
        this.videoChannel = videoChannel;

        this.descriptionHTML = await this.markdownService.textMarkdownToHTML(this.videoChannel.description);
        this.supportHTML = await this.markdownService.enhancedMarkdownToHTML(this.videoChannel.support);
      });
  }

  ngOnDestroy() {
    if (this.videoChannelSub) this.videoChannelSub.unsubscribe();
  }

  getVideoChannelDescription() {
    if (this.descriptionHTML) return this.descriptionHTML;

    return $localize`No description`;
  }
}
