import {Component, Input, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MarkdownService} from "../../../core/renderer/markdown.service";
import {VideoDetails} from "../../../shared/main/video/video-details.model";

@Component({
  selector: 'my-video-support',
  templateUrl: './video-support.component.html',
  styleUrls: ['./video-support.component.scss']
})
export class VideoSupportComponent {
  @Input() video: VideoDetails = null;

  @ViewChild('modal', {static: true}) modal: NgbModal;

  videoHTMLSupport = '';

  constructor(
    private markdownService: MarkdownService,
    private modalService: NgbModal
  ) {
  }

  show() {
    const modalRef = this.modalService.open(this.modal, {centered: true});

    this.markdownService.enhancedMarkdownToHTML(this.video.support)
      .then(r => this.videoHTMLSupport = r);

    return modalRef;
  }
}
