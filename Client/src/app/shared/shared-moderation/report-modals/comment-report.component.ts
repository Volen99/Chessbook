import {Component, Input, OnInit} from '@angular/core';
import { mapValues, pickBy } from 'lodash-es';

import {FormReactive} from "../../shared-forms/form-reactive";
import {FormValidatorService} from "../../shared-forms/form-validator.service";
import {ABUSE_REASON_VALIDATOR} from "../../shared-forms/form-validators/abuse-validators";
import {AbusePredefinedReasonsString} from "../../models/moderation/abuse/abuse-reason.model";
import {abusePredefinedReasonsMap} from "../../../core/utils/abuse/abuse-predefined-reasons";
import {AbuseService} from "../abuse.service";

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {PostComment} from "../../shared-post-comment/post-comment-model";
import {NbDialogRef} from '../../../sharebook-nebular/theme/components/dialog/dialog-ref';

@Component({
  selector: 'app-comment-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class CommentReportComponent extends FormReactive implements OnInit {
  @Input() comment: PostComment = null;

  modalTitle: string;
  error: string = null;
  predefinedReasons: { id: AbusePredefinedReasonsString, label: string, description?: string, help?: string }[] = [];

  constructor(
    protected formValidatorService: FormValidatorService,
    private abuseService: AbuseService,
    private notifier: NbToastrService,
    private ref: NbDialogRef<CommentReportComponent>) {
    super();
  }

  get currentHost() {
    return 'Chessbook';
  }

  get originHost() {
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

  faTimes = faTimes;

  show() {
  }

  hide() {
    this.ref.close();
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
        this.notifier.success(`Comment reported.`, 'Success');
        this.hide();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

}
