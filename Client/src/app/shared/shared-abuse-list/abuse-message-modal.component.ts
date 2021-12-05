import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {FormReactive} from "../shared-forms/form-reactive";
import {AbuseMessage} from "../models/moderation/abuse/abuse-message.model";
import {UserAbuse} from "../models/moderation/abuse/abuse.model";
import {HtmlRendererService} from "../../core/renderer/html-renderer.service";
import {ABUSE_MESSAGE_VALIDATOR} from "../shared-forms/form-validators/abuse-validators";
import {AbuseService} from "../shared-moderation/abuse.service";
import {FormValidatorService} from "../shared-forms/form-validator.service";

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import {UserStore} from "../../core/stores/user.store";
import {NbToastrService} from '../../sharebook-nebular/theme/components/toastr/toastr.service';

@Component({
  selector: 'my-abuse-message-modal',
  templateUrl: './abuse-message-modal.component.html',
  styleUrls: ['./abuse-message-modal.component.scss']
})
export class AbuseMessageModalComponent extends FormReactive implements OnInit {
  @ViewChild('modal', {static: true}) modal: NgbModal;

  @Input() isAdminView: boolean;

  @Output() countMessagesUpdated = new EventEmitter<{ abuseId: number, countMessages: number }>();

  abuseMessages: (AbuseMessage & { messageHtml: string })[] = [];
  textareaMessage: string;
  sendingMessage = false;
  noResults = false;

  private openedModal: NgbModalRef;
  private abuse: UserAbuse;

  constructor(
    protected formValidatorService: FormValidatorService,
    private modalService: NgbModal,
    private htmlRenderer: HtmlRendererService,
    private userStore: UserStore,
    private notifier: NbToastrService,
    private abuseService: AbuseService
  ) {
    super();
  }

  ngOnInit() {
    this.buildForm({
      message: ABUSE_MESSAGE_VALIDATOR
    });
  }

  faTimes = faTimes;

  openModal(abuse: UserAbuse) {
    this.abuse = abuse;

    this.openedModal = this.modalService.open(this.modal, {centered: true});

    this.loadMessages();
  }

  hide() {
    this.abuseMessages = [];
    this.openedModal.close();
  }

  addMessage() {
    this.sendingMessage = true;

    this.abuseService.addAbuseMessage(this.abuse, this.form.value['message'])
      .subscribe(
        () => {
          this.form.reset();
          this.sendingMessage = false;
          this.countMessagesUpdated.emit({abuseId: this.abuse.id, countMessages: this.abuseMessages.length + 1});

          this.loadMessages();
        },

        err => {
          this.sendingMessage = false;
          console.error(err);
          this.notifier.danger('Sorry but you cannot send this message. Please retry later', 'Error');
        }
      );
  }

  deleteMessage(abuseMessage: AbuseMessage) {
    this.abuseService.deleteAbuseMessage(this.abuse, abuseMessage)
      .subscribe(
        () => {
          this.countMessagesUpdated.emit({abuseId: this.abuse.id, countMessages: this.abuseMessages.length - 1});

          this.abuseMessages = this.abuseMessages.filter(m => m.id !== abuseMessage.id);
        },

        err => this.notifier.danger(err.message)
      );
  }

  isMessageByMe(abuseMessage: AbuseMessage) {
    return this.userStore.getUser().id === abuseMessage.account.id;
  }

  getPlaceholderMessage() {
    if (this.isAdminView) {
      return `Add a message to communicate with the reporter`;
    }

    return `Add a message to communicate with the moderation team`;
  }

  private loadMessages() {
    this.abuseService.listAbuseMessages(this.abuse)
      .subscribe(
        async res => {
          this.abuseMessages = [];

          for (const m of res.data) {
            this.abuseMessages.push(Object.assign(m, {
              messageHtml: await this.htmlRenderer.convertToBr(m.message)
            }));
          }

          this.noResults = this.abuseMessages.length === 0;

          setTimeout(() => {
            // Don't use ViewChild: it is not supported inside a ng-template
            const messagesBlock = document.querySelector('.messages');
            messagesBlock.scroll(0, messagesBlock.scrollHeight);
          });
        },

        err => this.notifier.danger(err.message)
      );
  }

}
