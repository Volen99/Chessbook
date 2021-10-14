import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {forkJoin, Subscription} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {ChatService} from "../../shared/shared-messages/chat.service";
import {IUser} from "../../core/interfaces/common/users";
import {Location} from "@angular/common";

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

  private alive = true;

  constructor(private router: Router, private chatService: ChatService,
              private location: Location) {
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
      });
  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    this.alive = false;
  }

  messages: PrivateMessage[];
  sent: PrivateMessage[];

  isMessageSelected() {
    return this.location.path(false).endsWith('s');
  }
}
