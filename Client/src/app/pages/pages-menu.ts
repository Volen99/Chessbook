import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {
  faHouse,
  faHashtag,
  faBell,
  faEnvelope,
  faUser,
  faTv,
  faCircle,
  faChartLine,
  faAlicorn,
  faChessClock,
} from '@fortawesome/pro-light-svg-icons';

import {NbMenuItem} from '../sharebook-nebular/theme/components/menu/menu.service';

@Injectable()
export class PagesMenu {

  getMenu(screenName?: string): Observable<NbMenuItem[]> {
    const dashboardMenu: NbMenuItem[] = [
      // {
      //   title: 'E-commerce',
      //   icon: 'shopping-cart-outline',
      //   link: '/admin/dashboard',
      //   home: true,
      //   children: undefined,
      // },
      // {
      //   title: 'IoT Dashboard',
      //   icon: 'home-outline',
      //   link: '/admin/iot-dashboard',
      //   children: undefined,
      // },
    ];

    const menu: NbMenuItem[] = [
      {
        title: 'Home',
        icon: faHouse,
        link: '/home',
        home: true,
        children: undefined,
      },
      {
        title: 'Explore',
        icon: faHashtag,
        link: '/explore',
        children: undefined,
      },
      {
        title: 'Notifications',
        icon: faBell,
        link: '/notifications',
        children: undefined,
      },
      {
        title: 'Messages',
        icon: faEnvelope,
        link: '/messages',
        children: undefined,
      },
      {
        title: 'Profile',
        icon: faUser,
        link: `/${screenName}`,
        children: undefined,
      },
      {
        title: 'Streamers',
        icon: faTv,
        link: '/streamers',
      },
      {
        title: 'More',
        expanded: false,
        icon: faCircle,
        children: [
          {icon: faChartLine, title: `Chess Rankings`, link: '/ratings'},
          {icon: faChessClock, title: `Chess stuff`, link: '/misc'},
          {icon: faAlicorn, title: `Keyboard shortcuts`, link: ''},
        ],

      }
    ];

    return of([...dashboardMenu, ...menu]);
  }
}
