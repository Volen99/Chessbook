import {Component, Input, OnInit, ViewChild} from '@angular/core';

import { mapValues, pickBy } from 'lodash-es';
import {PostComment} from "../../shared-post-comment/post-comment";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormReactive} from "../../forms/form-reactive";
import {FormValidatorService} from "../../forms/form-validator.service";
import {ABUSE_REASON_VALIDATOR} from "../../forms/form-validators/abuse-validators";
import {AbusePredefinedReasonsString} from "../../models/moderation/abuse/abuse-reason.model";
import {abusePredefinedReasonsMap} from "../../../core/utils/abuse/abuse-predefined-reasons";
import {AbuseService} from "../abuse.service";
import {Notifier} from "../../../core/notification/notifier.service";

@Component({
  selector: 'app-comment-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class CommentReportComponent extends FormReactive implements OnInit {
  @Input() comment: PostComment = null;

  @ViewChild('modal', {static: true}) modal: NgbModal;

  modalTitle: string;
  error: string = null;
  predefinedReasons: { id: AbusePredefinedReasonsString, label: string, description?: string, help?: string }[] = [];

  private openedModal: NgbModalRef;

  constructor(
    protected formValidatorService: FormValidatorService,
    private modalService: NgbModal,
    private abuseService: AbuseService,
    private notifier: Notifier
  ) {
    super();
  }

  get currentHost() {
    return window.location.host;
  }

  get originHost() {
    // if (this.isRemote()) {
    //   return this.reply-comment.user.host;
    // }

    return '';
  }

  ngOnInit() {
    this.modalTitle = `Report comment`;

    this.buildForm({
      reason: ABUSE_REASON_VALIDATOR,
      predefinedReasons: mapValues(abusePredefinedReasonsMap, r => null)
    });

    this.predefinedReasons = this.abuseService.getPrefefinedReasons('comment');
  }

  show() {
    this.openedModal = this.modalService.open(this.modal, {centered: true, keyboard: false, size: 'lg'});
  }

  hide() {
    this.openedModal.close();
    this.openedModal = null;
  }

  report() {
    const reason = this.form.get('reason').value;
    const predefinedReasons = Object.keys(pickBy(this.form.get('predefinedReasons').value)) as AbusePredefinedReasonsString[];

    this.abuseService.reportVideo({
      reason,
      predefinedReasons,
      comment: {
        id: this.comment.id
      }
    }).subscribe(
      () => {
        this.notifier.success(`Comment reported.`);
        this.hide();
      },

      err => this.notifier.error(err.message)
    );
  }

  isRemote() {
    return !this.comment.isLocal;
  }
}
