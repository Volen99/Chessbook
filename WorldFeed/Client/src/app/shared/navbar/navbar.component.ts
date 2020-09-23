import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NotificationsService} from '../services/notifications.service';
import {User} from 'oidc-client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isExpanded = false;
  token: string;
  isAuthorized: boolean;
  user: User;

  constructor(private router: Router, private notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.notificationsService.subscribe();
  }

  route(param) {
    console.log(param);
    this.router.navigate([param]);
  }

  changeNav(event) {
    console.log(event);
  }

  // C#

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
