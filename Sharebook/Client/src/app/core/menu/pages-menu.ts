import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {MenuItem} from "./core/menu.service";

@Injectable()
export class PagesMenu {

  getMenu(): Observable<MenuItem[]> {
    const menu: MenuItem[] = [
      {
        title: 'Home',
        icon: 'home',
        link: '/home',
        home: true,
        children: undefined,
      },
      {
        title: 'Explore',
        icon: 'explore',
        link: '/explore',
        children: undefined,
      },
      {
        title: 'Notifications',
        icon: 'bell',
        link: '/notifications',
        children: undefined,
      },
      {
        title: 'Messages',
        icon: 'messages',
        link: '/messages',
        children: undefined,
      },
      {
        title: 'Profile',
        icon: 'profile',
        link: '/profile',
        children: undefined,
      },
    ];

    return of([...menu] );
  }
}
