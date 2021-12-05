import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {VideoBlockService} from './video-block.service';
import {FormReactive} from "../shared-forms/form-reactive";
import {Post} from "../shared-main/post/post.model";
import {FormValidatorService} from "../shared-forms/form-validator.service";
import {VIDEO_BLOCK_REASON_VALIDATOR} from "../shared-forms/form-validators/video-block-validators";
import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent extends FormReactive implements OnInit {
  @Input() post: Post = null;

  @ViewChild('modal', {static: true}) modal: NgbModal;

  @Output() videoBlocked = new EventEmitter();

  error: string = null;

  private openedModal: NgbModalRef;

  constructor(
    protected formValidatorService: FormValidatorService,
    private modalService: NgbModal,
    private videoBlocklistService: VideoBlockService,
    private notifier: NbToastrService) {
    super();
  }

  ngOnInit() {
    const defaultValues = {unfederate: 'true'};

    this.buildForm({
      reason: VIDEO_BLOCK_REASON_VALIDATOR,
      unfederate: null
    }, defaultValues);
  }

  faTimes = faTimes;

  show() {
    this.openedModal = this.modalService.open(this.modal, {centered: true, keyboard: false});
  }

  hide() {
    this.openedModal.close();
    this.openedModal = null;
  }

  block() {
    const reason = this.form.value['reason'] || undefined;
    //  const unfederate = this.video.isLocal ? this.form.value['unfederate'] : undefined;

    this.videoBlocklistService.blockVideo(this.post.id, reason)
      .subscribe(
        () => {
          this.notifier.success(`Video blocked.`);
          this.hide();

          this.post.blacklisted = true;
          this.post.blockedReason = reason;

          this.videoBlocked.emit();
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }
}
