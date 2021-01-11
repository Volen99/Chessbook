import {Component, OnInit, ViewChild} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {ServerService} from "../../core/server";
import {InstanceService} from "../../shared/shared-instance/instance.service";
import {FormValidatorService} from "../../shared/shared-forms/form-validator.service";
import {Notifier} from "../../core/notification/notifier-service";
import {ServerConfig} from "../../shared/models/server/server-config.model";
import {FormReactive} from "../../shared/shared-forms/form-reactive";
import {
  BODY_VALIDATOR,
  FROM_EMAIL_VALIDATOR,
  FROM_NAME_VALIDATOR,
  SUBJECT_VALIDATOR
} from "../../shared/form-validators/instance-validators";
import {HttpStatusCode} from "../../shared/core-utils/miscellaneous/http-error-codes";

@Component({
  selector: 'my-contact-admin-modal',
  templateUrl: './contact-admin-modal.component.html',
  styleUrls: ['./contact-admin-modal.component.scss']
})
export class ContactAdminModalComponent extends FormReactive implements OnInit {
  @ViewChild('modal', {static: true}) modal: NgbModal;

  error: string;

  private openedModal: NgbModalRef;
  private serverConfig: ServerConfig;

  constructor(
    protected formValidatorService: FormValidatorService,
    private modalService: NgbModal,
    private instanceService: InstanceService,
    private serverService: ServerService,
    private notifier: Notifier
  ) {
    super();
  }

  get instanceName() {
    return this.serverConfig.instance.name;
  }

  ngOnInit() {
    this.serverConfig = this.serverService.getTmpConfig();
    this.serverService.getConfig()
      .subscribe(config => this.serverConfig = config);

    this.buildForm({
      fromName: FROM_NAME_VALIDATOR,
      fromEmail: FROM_EMAIL_VALIDATOR,
      subject: SUBJECT_VALIDATOR,
      body: BODY_VALIDATOR,
    });
  }

  show() {
    this.openedModal = this.modalService.open(this.modal, {centered: true, keyboard: false});
  }

  hide() {
    this.form.reset();
    this.error = undefined;

    this.openedModal.close();
    this.openedModal = null;
  }

  sendForm() {
    const fromName = this.form.value['fromName'];
    const fromEmail = this.form.value['fromEmail'];
    const subject = this.form.value['subject'];
    const body = this.form.value['body'];

    this.instanceService.contactAdministrator(fromEmail, fromName, subject, body)
      .subscribe(
        () => {
          this.notifier.success($localize`Your message has been sent.`);
          this.hide();
        },

        err => {
          this.error = err.status === HttpStatusCode.FORBIDDEN_403
            ? $localize`You already sent this form recently`
            : err.message;
        }
      );
  }
}
