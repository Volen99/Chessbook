import {Router} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {forkJoin, Subscription} from "rxjs";
import {takeWhile} from "rxjs/operators";

import {ChatService} from "../../shared/shared-messages/chat.service";
import {IUser} from "../../core/interfaces/common/users";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";

export interface PrivateMessage {
  id: number;
  fromUser: IUser;
  toUser: IUser;

  toCustomerId: number;
  subject: number;
  message: string;
  createdOn: Date;
  isRead: number;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  private deleteSubscription: Subscription;

  private alive = true;

  constructor(private router: Router, private chatService: ChatService,
              private location: Location, private notifier: NbToastrService) {
    forkJoin([
      this.chatService.getAllPrivateMessagesAsync('inbox'),
      this.chatService.getAllPrivateMessagesAsync('sent')
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([inbox, sent]: [PrivateMessage[], PrivateMessage[]]) => {
        // @ts-ignore
        this.messages = inbox.data;
        // @ts-ignore
        this.sent = sent.data;
      }, err => this.notifier.danger(err.message, 'Error'));
  }

  ngOnInit(): void {
    this.deleteSubscription = this.chatService.removeMessageFromArrayEvent.subscribe((value) => {
      if (Array.isArray(value)) {
        const id = value[0];
        const tab = value[1];

        this.removeMessageFromArray(id, tab);
      }
    });
  }


  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }

    this.alive = false;
  }

  messages: PrivateMessage[];
  sent: PrivateMessage[];

  removeMessageFromArray(messageId: number, tab: string) {
    if (tab === 'inbox') {
      this.messages = this.messages.filter(m => m.id !== messageId);
    } else {
      this.sent = this.sent.filter(m => m.id !== messageId);
    }
  }

  isMessageSelected() {
    return this.location.path(false).endsWith('s') === false;
  }
}
