import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {FormReactive} from "../shared-forms/form-reactive";
import {HTMLServerConfig} from "../models/server/server-config.model";
import {FormValidatorService} from "../shared-forms/form-validator.service";
import {ServerService} from "../../core/server/server.service";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {
  BODY_VALIDATOR,
  FROM_EMAIL_VALIDATOR,
  FROM_NAME_VALIDATOR,
  SUBJECT_VALIDATOR
} from "../shared-forms/form-validators/instance-validators";
import {HttpStatusCode} from "../core-utils/miscs";

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import {ChatService} from "./chat.service";
import {NbDialogRef} from "../../sharebook-nebular/theme/components/dialog/dialog-ref";

type Prefill = {
  subject?: string
  body?: string
};

@Component({
  selector: 'app-contact-admin-modal',
  templateUrl: './contact-admin-modal.component.html',
  styleUrls: ['./contact-admin-modal.component.scss']
})
export class ContactAdminModalComponent extends FormReactive implements OnInit {
  @ViewChild('modal', {static: true}) modal: NgbModal;

  @Input() toCustomerId: number;
  @Input() replyToMessageId: number;
  @Input() screenName: string;
  @Input() reMessage: string;

  error: string;

  private openedModal: NgbModalRef;
  private serverConfig: HTMLServerConfig;

  constructor(
    protected formValidatorService: FormValidatorService,
    private router: Router,
    private modalService: NgbModal,
    private chatService: ChatService,
    private serverService: ServerService,
    private notifier: NbToastrService,
    protected ref: NbDialogRef<ContactAdminModalComponent>
  ) {
    super();
  }

  get instanceName() {
    return this.serverConfig.instance.name;
  }

  ngOnInit() {
    this.serverConfig = this.serverService.getHTMLConfig();

    this.buildForm({
      subject: SUBJECT_VALIDATOR,
      body: BODY_VALIDATOR
    });
  }

  faTimes = faTimes;


  isContactFormEnabled() {
    return this.serverConfig.email.enabled && this.serverConfig.contactForm.enabled;
  }

  show(prefill: Prefill = {}) {
    this.openedModal = this.modalService.open(this.modal, {centered: true, keyboard: false});

    this.openedModal.shown.subscribe(() => this.prefillForm(prefill));
    this.openedModal.result.finally(() => this.router.navigateByUrl('/about/instance'));
  }

  hide() {
    this.form.reset();
    this.error = undefined;

    this.ref.close();
  }

  sendForm() {
    const subject = this.form.value['subject'];
    const body = this.form.value['body'];

    this.chatService.send(this.toCustomerId, this.replyToMessageId, subject, body)
      .subscribe({
        next: () => {
          this.notifier.success(`Your message has been sent.`, 'Success');
          this.hide();
        },

        error: err => {
          this.error = err.status === HttpStatusCode.FORBIDDEN_403
            ? `You already sent this form recently`
            : err.message;
        }
      });
  }

  private prefillForm(prefill: Prefill) {
    if (prefill.subject) {
      this.form.get('subject').setValue(prefill.subject);
    }

    if (prefill.body) {
      this.form.get('body').setValue(prefill.body);
    }
  }
}
