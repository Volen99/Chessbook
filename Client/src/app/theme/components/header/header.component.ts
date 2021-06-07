import { Component, OnDestroy, OnInit } from '@angular/core';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {IUser} from "../../../core/interfaces/common/users";
import {UserStore} from "../../../core/stores/user.store";
import {SettingsData} from "../../../core/interfaces/common/settings";
import {LayoutService} from "../../../core/utils";
import {NbThemeService} from "../../../sharebook-nebular/theme/services/theme.service";
import {NbSidebarService} from "../../../sharebook-nebular/theme/components/sidebar/sidebar.service";
import {NbMediaBreakpointsService} from "../../../sharebook-nebular/theme/services/breakpoints.service";
import {NbMenuService} from "../../../sharebook-nebular/theme/components/menu/menu.service";
import {IPoll} from "../../../shared/posts/models/poll/poll";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {faUser, faSignOutAlt} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: IUser;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = this.getMenuItems();

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userStore: UserStore,
              private settingsService: SettingsData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private http: HttpClient) {
  }

  getMenuItems() {
    const userLink = this.user ?  `/${this.user.screenName}` : '#';
    return [
      { icon: this.faUser, title: 'Profile', link: userLink, queryParams: { profile: true }},
      { icon: this.faSignOutAlt, title: 'Log out', link: '/auth/logout' },
    ];
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: IUser) => {
        this.user = user;
        this.userMenu = this.getMenuItems();
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);


  }

  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  poll: IPoll;

  get apiUrl(): string {
    return environment.apiUrl;
  }

  handleSurveyClick() {
    this.http.get(this.apiUrl + '/poll/survey')
        .pipe(takeUntil(this.destroy$))
        .subscribe((poll: IPoll) => {
          debugger
          this.poll = poll;
          this.poll.startDateUtc = new Date(poll.startDateUtc);
        });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);
    this.settingsService.updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
