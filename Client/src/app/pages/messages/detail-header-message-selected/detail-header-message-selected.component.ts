import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from "../../../shared/shared-messages/chat.service";
import {PrivateMessage} from "../messages.component";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {
  faCalendarAlt,
  faReply,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';

import {ContactAdminModalComponent} from "../../../shared/shared-messages/contact-admin-modal.component";
import {NbDialogService} from "../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {UserStore} from "../../../core/stores/user.store";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {MarkdownService} from "../../../core/renderer/markdown.service";
import {IUser} from "../../../core/interfaces/common/users";

@Component({
  selector: 'app-detail-header-message-selected',
  templateUrl: './detail-header-message-selected.component.html',
  styleUrls: [ '../messages.component.scss', './detail-header-message-selected.component.scss' ]
})
export class DetailHeaderMessageSelectedComponent implements OnInit {
  private routeSub: Subscription; // TODO: unsub?
  private messageId: number;

  constructor(private chatService: ChatService, private route: ActivatedRoute,
              private dialogService: NbDialogService, private router: Router,
              private userStore: UserStore,
              private notifier: NbToastrService,
              private markdownService: MarkdownService) {
    this.userCurrent = this.userStore.getUser();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(routeParams => {
      const messageId = routeParams['messageId'];
      if (messageId) {
        this.setMessageId(messageId);
        this.getPrivateMessageById();
      }
    });
  }

  faCalendarAlt = faCalendarAlt;
  faReply = faReply;
  faTrash = faTrash;

  userCurrent: IUser;
  message: PrivateMessage;
  statusHTMLText = '';

  isSent: boolean = false;

  getPrivateMessageById() {
    this.chatService.loadMessage(this.messageId)
      .subscribe((data) => {
        this.message = data;
        if (!this.message || !this.userCurrent) {
          return ;
        }
        this.isSent = this.message.fromUser.id === this.userCurrent.id;

        this.setMessageTextHTML();
      });
  }

  setMessageId(id) {
    if (id) {
      this.messageId = id;
    } else {
      // @ts-ignore
      this.messageId = null;
    }
  }

  handleReply() {
    this.dialogService.open(ContactAdminModalComponent, {
      context: {
        toCustomerId: this.message.fromUser.id,
        screenName: this.message.fromUser.screenName,
        replyToMessageId: this.message.fromUser.id,
        reMessage: "Re: " + this.message.subject,
      },
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

  handleDelete() {
    let tab = this.userStore.getUser().id === this.message.fromUser.id ? 'sent' : 'inbox';
    this.chatService.delete(this.messageId, tab)
      .subscribe((data) => {
        this.notifier.success('Message successfully deleted', 'Success');

        this.router.navigate(['/messages']);
      });
  }

  private async setMessageTextHTML() {
    if (!this.message?.message) {
      return;
    }

    // Before HTML rendering restore line feed for markdown list compatibility
    const commentText = this.message.message.replace(/<br.?\/?>/g, '\r\n');
    const html = await this.markdownService.textMarkdownToHTML(commentText, true, true);
    this.statusHTMLText = this.markdownService.processVideoTimestamps(this.message.fromUser.screenName, this.message.id, html);
  }

}
