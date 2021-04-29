import {Component, OnDestroy, OnInit,} from '@angular/core';
import {faCog} from '@fortawesome/pro-light-svg-icons';

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

  faCog = faCog;

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
