import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LiveVideoService } from './live-video.service';
import { Video } from '../shared-main';
import { LiveVideo } from '../../../../../shared';

@Component({
  selector: 'app-live-stream-information',
  templateUrl: './live-stream-information.component.html',
  styleUrls: [ './live-stream-information.component.scss' ]
})
export class LiveStreamInformationComponent {
  @ViewChild('modal', { static: true }) modal: ElementRef;

  video: Video;
  live: LiveVideo;

  constructor(
    private modalService: NgbModal,
    private liveVideoService: LiveVideoService
  ) {
  }

  show(video: Video) {
    this.video = video;
    this.live = undefined;

    this.loadLiveInfo(video);

    this.modalService
      .open(this.modal, { centered: true });
  }

  private loadLiveInfo(video: Video) {
    this.liveVideoService.getVideoLive(video.id)
      .subscribe(live => this.live = live);
  }
}
