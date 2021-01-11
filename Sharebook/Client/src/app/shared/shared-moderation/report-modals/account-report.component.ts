import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {AbuseService} from '../abuse.service';
import {AbusePredefinedReasonsString} from "../../models/moderation/abuse/abuse-reason.model";
import {Notifier} from "../../../core/notification/notifier-service";
import {ABUSE_REASON_VALIDATOR} from "../../form-validators/abuse-validators";
import {abusePredefinedReasonsMap} from "../../core-utils/abuse/abuse-predefined-reasons";
import { mapValues, pickBy } from 'lodash';
import {Account} from '../../main/account/account.model';
import {FormReactive} from "../../shared-forms/form-reactive";
import {FormValidatorService} from "../../shared-forms/form-validator.service";

@Component({
  selector: 'my-account-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class AccountReportComponent extends FormReactive implements OnInit {
  @Input() account: Account = null;

  @ViewChild('modal', {static: true}) modal: NgbModal;

  error: string = null;
  predefinedReasons: { id: AbusePredefinedReasonsString, label: string, description?: string, help?: string }[] = [];
  modalTitle: string;

  private openedModal: NgbModalRef;

  constructor(
    protected formValidatorService: FormValidatorService,
    private modalService: NgbModal,
    private abuseService: AbuseService,
    private notifier: Notifier,
  ) {
    super();
  }

  get currentHost() {
    return window.location.host;
  }

  get originHost() {
    if (this.isRemote()) {
      return this.account.host;
    }

    return '';
  }

  ngOnInit() {
    this.modalTitle = $localize`Report ${this.account.displayName}`;

    this.buildForm({
      reason: ABUSE_REASON_VALIDATOR,
      predefinedReasons: mapValues(abusePredefinedReasonsMap, r => null)
    });

    this.predefinedReasons = this.abuseService.getPrefefinedReasons('account');
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
      account: {
        id: this.account.id
      }
    }).subscribe(
      () => {
        this.notifier.success($localize`Account reported.`);
        this.hide();
      },

      err => this.notifier.error(err.message)
    );
  }

  isRemote() {
    return !this.account.isLocal;
  }
}
