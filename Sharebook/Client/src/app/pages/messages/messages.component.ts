import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {DetailHeaderNoMessageSelectedComponent} from "./detail-header-no-message-selected/detail-header-no-message-selected.component";
import {DetailHeaderMessageSelectedComponent} from "./detail-header-message-selected/detail-header-message-selected.component";
import {filter} from "rxjs/operators";
import {Subscription} from "rxjs";

enum MessageMode {
  EDIT = 'Edit',
  ADD = 'Add',
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.routeSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((route) => {
        debugger
        // @ts-ignore
        if (route.id) {
          // @ts-ignore
          this.setMessageId(route.id);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  messageId: number;

  setMessageId(id) {
    if (id) {
      // @ts-ignore
      this.messageId = id;
    } else {
      // @ts-ignore
      this.messageId = null;
    }
  }


}
