import {Component, OnInit} from '@angular/core';
import {ScreenService} from "../../core/wrappers/screen.service";
import {AuthUser} from "../../core/auth/auth-user.model";

@Component({
  selector: 'my-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  // menuEntries: TopMenuDropdownParam[] = [];
  user: AuthUser;


  constructor(private screenService: ScreenService) {
  }

  get isBroadcastMessageDisplayed() {
    return this.screenService.isBroadcastMessageDisplayed;
  }

  ngOnInit(): void {
    this.menuEntries = this.getMenuItems();
  }

  menuEntries = this.getMenuItems();

  getMenuItems() {
    // const moderationEntries: TopMenuDropdownParam = {
    //   label: `Moderation`,
    //   children: [
    //     {
    //       label: `Muted accounts`,
    //       routerLink: '/my-account/blocklist/accounts',
    //       iconName: 'user-x'
    //     },
    //     {
    //       label: `Muted servers`,
    //       routerLink: '/my-account/blocklist/servers',
    //       iconName: 'peertube-x'
    //     },
    //     {
    //       label: `Abuse reports`,
    //       routerLink: '/my-account/abuses',
    //       iconName: 'flag'
    //     }
    //   ]
    // };

    return [
      {title: `Muted accounts`, link: '/my-account/blocklist/accounts', icon: 'person-delete-outline'},
      {title: `Muted servers`, link: '/my-account/notifications', icon: 'play-circle-outline'},
      {title: `Abuse reports`, link: '/my-account/abuses', icon: 'flag-outline'},
    ];
  }

  tabs: any[] = [
    {
      title: 'Settings',
      route: '/my-account/settings',
    },
    {
      title: 'Notifications',
      route: [ '/my-account/notifications' ],
    },
    {
      title: 'Moderation',
      route: '#',
      dropdown: this.getMenuItems(),
      // icon: 'flash-outline',
      // responsive: true,
      // disabled: true,
    },
  ];

  // private buildMenu() {
  //   const moderationEntries: TopMenuDropdownParam = {
  //     label: `Moderation`,
  //     children: [
  //       {
  //         label: `Muted accounts`,
  //         routerLink: '/my-account/blocklist/accounts',
  //         iconName: 'user-x'
  //       },
  //       {
  //         label: `Muted servers`,
  //         routerLink: '/my-account/blocklist/servers',
  //         iconName: 'peertube-x'
  //       },
  //       {
  //         label: `Abuse reports`,
  //         routerLink: '/my-account/abuses',
  //         iconName: 'flag'
  //       }
  //     ]
  //   };
  //
  //   this.menuEntries = [
  //     {
  //       label: `Settings`,
  //       routerLink: '/my-account/settings'
  //     },
  //
  //     {
  //       label: `Notifications`,
  //       routerLink: '/my-account/notifications'
  //     },
  //
  //     {
  //       label: `Applications`,
  //       routerLink: '/my-account/applications'
  //     },
  //
  //     moderationEntries
  //   ];
  // }
}
