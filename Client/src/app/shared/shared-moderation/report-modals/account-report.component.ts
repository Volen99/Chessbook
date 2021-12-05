import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {mapValues, pickBy} from 'lodash-es';

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import {AbuseService} from '../abuse.service';
import {FormReactive} from "../../shared-forms/form-reactive";
import {AbusePredefinedReasonsString} from "../../models/moderation/abuse/abuse-reason.model";
import {FormValidatorService} from "../../shared-forms/form-validator.service";
import {ABUSE_REASON_VALIDATOR} from "../../shared-forms/form-validators/abuse-validators";
import {abusePredefinedReasonsMap} from "../../../core/utils/abuse/abuse-predefined-reasons";
import {User} from "../../shared-main/user/user.model";
import {NbDialogRef} from "../../../sharebook-nebular/theme/components/dialog/dialog-ref";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";

@Component({
  selector: 'app-account-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class AccountReportComponent extends FormReactive implements OnInit {
  @Input() account: User = null;

  error: string = null;
  predefinedReasons: { id: AbusePredefinedReasonsString, label: string, description?: string, help?: string }[] = [];
  modalTitle: string;

  constructor(
    protected formValidatorService: FormValidatorService,
    private abuseService: AbuseService,
    private notifier: NbToastrService,
    protected ref: NbDialogRef<AccountReportComponent>) {
    super();
  }

  get currentHost() {
    return window.location.host;
  }

  get originHost() {
    return '';
  }

  ngOnInit() {
    this.modalTitle = `Report ${this.account.displayName}`;

    this.buildForm({
      reason: ABUSE_REASON_VALIDATOR,
      predefinedReasons: mapValues(abusePredefinedReasonsMap, r => null)
    });

    this.predefinedReasons = this.abuseService.getPrefefinedReasons('account');
  }

  faTimes = faTimes;

  hide() {
    this.ref.close();
  }

  report() {
    const reason = this.form.get('reason').value;
    const predefinedReasons = Object.keys(pickBy(this.form.get('predefinedReasons').value)) as AbusePredefinedReasonsString[];

    this.abuseService.reportVideo({
      reason,
      predefinedReasons,
      account: {
        id: this.account.id
      }
    }).subscribe(
      () => {
        this.notifier.success(`Account reported.`, 'Success');
        this.hide();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

}
