import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Notifier } from '../../core';
import { AbuseService } from '../../shared/shared-moderation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { ABUSE_MODERATION_COMMENT_VALIDATOR } from '../form-validators/abuse-validators';
import { AdminAbuse } from '../../../../../shared';
import { FormReactive } from '../shared-forms/form-reactive';
import { FormValidatorService } from '../shared-forms/form-validator.service';

@Component({
  selector: 'app-moderation-comment-modal',
  templateUrl: './moderation-comment-modal.component.html',
  styleUrls: [ './moderation-comment-modal.component.scss' ]
})
export class ModerationCommentModalComponent extends FormReactive implements OnInit {
  @ViewChild('modal', { static: true }) modal: NgbModal;
  @Output() commentUpdated = new EventEmitter<string>();

  private abuseToComment: AdminAbuse;
  private openedModal: NgbModalRef;

  constructor(
    protected formValidatorService: FormValidatorService,
    private modalService: NgbModal,
    private notifier: Notifier,
    private abuseService: AbuseService
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm({
      moderationComment: ABUSE_MODERATION_COMMENT_VALIDATOR
    });
  }

  openModal(abuseToComment: AdminAbuse) {
    this.abuseToComment = abuseToComment;
    this.openedModal = this.modalService.open(this.modal, { centered: true });

    this.form.patchValue({
      moderationComment: this.abuseToComment.moderationComment
    });
  }

  hide() {
    this.abuseToComment = undefined;
    this.openedModal.close();
    this.form.reset();
  }

  async banUser() {
    const moderationComment: string = this.form.value['moderationComment'];

    this.abuseService.updateAbuse(this.abuseToComment, { moderationComment })
      .subscribe(
        () => {
          this.notifier.success($localize`Comment updated.`);

          this.commentUpdated.emit(moderationComment);
          this.hide();
        },

        err => this.notifier.error(err.message)
      );
  }

}
