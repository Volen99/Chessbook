import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import {Contact, PhoneData, RecentUser} from "../../../core/interfaces/iot/phone";
import {ChatService} from "../../../shared/shared-messages/chat.service";
import {ActorInfo} from "../../../shared/models/users/user-notification.model";

export interface PrivateMessage {
  id: number;
  fromUser: ActorInfo;

  toCustomerId: number;
  subject: number;
  message: string;
  createdOn: number;
  isRead: number;
}

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnDestroy {

  private alive = true;

  contacts: PrivateMessage[];
  recent: PrivateMessage[];

  constructor(private chatService: ChatService) {
    forkJoin([
      this.chatService.getAllPrivateMessagesAsync('inbox'),
      this.chatService.getAllPrivateMessagesAsync('sent')
    ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([inbox, sent]: [PrivateMessage[], PrivateMessage[]]) => {
        // @ts-ignore
        this.contacts = inbox.data;
        // @ts-ignore
        this.recent = sent.data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
