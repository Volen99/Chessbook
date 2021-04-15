import {Component, OnDestroy, OnInit,} from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  tabs: any[] = [
    {
      title: 'All',
      route: '/notifications',
    },
    {
      title: 'Mentions',
      route: [ '/notifications/mentions' ],
    },
  ];
}