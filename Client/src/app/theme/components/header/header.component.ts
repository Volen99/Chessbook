import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, map, takeUntil} from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';

import {faSignInAlt, faSignOutAlt, faUser, faUserPlus, faBars} from '@fortawesome/pro-light-svg-icons';
import {faUserAlien} from '@fortawesome/pro-solid-svg-icons';

import {IUser} from "../../../core/interfaces/common/users";
import {UserStore} from "../../../core/stores/user.store";
import {SettingsData} from "../../../core/interfaces/common/settings";
import {LayoutService} from "../../../core/utils";
import {NbThemeService} from "../../../sharebook-nebular/theme/services/theme.service";
import {NbSidebarService} from "../../../sharebook-nebular/theme/components/sidebar/sidebar.service";
import {NbMediaBreakpointsService} from "../../../sharebook-nebular/theme/services/breakpoints.service";
import {NbMenuService} from "../../../sharebook-nebular/theme/components/menu/menu.service";
import {IPoll} from "../../../shared/posts/models/poll/poll";
import {environment} from "../../../../environments/environment";
import {UserRight} from "../../../shared/models/users/user-right.enum";
import {User} from "../../../shared/shared-main/user/user.model";
import {UsersService} from "../../../core/backend/common/services/users.service";
import {LocalStorageService} from "../../../core/wrappers/storage.service";
import {UserUpdateMe} from "../../../shared/models/users/user-update-me.model";
import {AuthStatus} from "../../../core/auth/auth-status.model";
import {NbAuthService} from "../../../sharebook-nebular/auth/services/auth.service";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userStore: UserStore,
              private settingsService: SettingsData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private http: HttpClient,
              private userService: UsersService,
              private localStorageService: LocalStorageService,
              private authService: NbAuthService) {
  }

  anonymousUser: User;
  userInformationLoaded = new ReplaySubject<boolean>(1);

  ngOnInit() {
    this.isLoggedIn = this.userStore.isLoggedIn();

    this.authService.loginChangedSource.subscribe(
      status => {
        debugger
        if (status === AuthStatus.LoggedIn) {
          this.isLoggedIn = true;
        } else if (status === AuthStatus.LoggedOut) {
          this.isLoggedIn = false;
        }

        // this.updateUserState()
        // this.buildMenuSections()
      }
    );

    this.currentTheme = this.themeService.currentTheme;

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: IUser) => {
        this.user = user;
        if (this.user) {
          this.isLoggedIn = true;
          this.user = new User(user);
          this.userMenu = this.getMenuItems();
        } else {
          this.isLoggedIn = false;
        }
      });

    if (!this.user) {
      this.anonymousUser = this.userService.getAnonymousUser();

      this.localStorageService.watch()
        .subscribe(
          () => {
            this.anonymousUser = this.userService.getAnonymousUser();
            this.anonymousUserMenu = this.getAnonymousUserMenuItems();
          }
        );

      this.userInformationLoaded.next(true);

      this.authService.loginChangedSource
        .pipe(filter(status => status !== AuthStatus.LoggedIn))
        .subscribe(
          () => {
            this.anonymousUser = this.userService.getAnonymousUser();
            this.userInformationLoaded.next(true);
          }
        );
    }

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => {
        this.userPictureOnly = isLessThanXl;
        if (isLessThanXl) {
          this.searchType = 'curtain';
          this.borderLeft = true;
        } else {
          this.searchType = 'rotate-layout';
          this.borderLeft = false;
        }

      });

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;

        if (themeName !== 'default') {
          this.currentLogoName = 'icon-white.png';
        } else {
          this.currentLogoName = 'icon-main.png';
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isLoggedIn: boolean;
  searchType: 'rotate-layout' | 'curtain' = 'rotate-layout';

  borderLeft = true;

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
      value: 'material-dark',
      name: 'Material Dark',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
  ];

  currentTheme = 'default';
  currentLogoName = 'default';
  userMenu: any;
  anonymousUserMenu = this.getAnonymousUserMenuItems();

  userPictureOnly: boolean = false;
  user: IUser;

  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faUserAlien = faUserAlien;
  faBars = faBars;

  poll: IPoll;

  getMenuItems() {
    const userLink = this.user ? `/${this.user.screenName}` : '#';
    let menu = [
      {icon: this.faUser, title: 'Profile', link: userLink, queryParams: {profile: true}},
      {icon: this.faSignOutAlt, title: 'Log out', link: '/auth/logout'},
    ];

    if (this.user && this.user.hasRight(UserRight.ALL) || this.user.hasRight(UserRight.MANAGE_USERS)) {
      menu.push({icon: this.faUserAlien, title: 'Admin', link: '/admin'});
    }

    return menu;
  }

  getAnonymousUserMenuItems() {
    let menu = [
      {icon: faSignInAlt, title: 'Login', link: '/auth/login'},
      {icon: faUserPlus, title: 'Sign up', link: '/auth/register'},
    ];

    return menu;
  }

  handleSurveyClick() {
    this.http.get(this.apiUrl + '/poll/survey')
      .pipe(takeUntil(this.destroy$))
      .subscribe((poll: IPoll) => {
        this.poll = poll;
        this.poll.startDateUtc = new Date(poll.startDateUtc);
      });
  }

  changeTheme(themeName: string) {
    if (this.userStore.isLoggedIn()) {
      this.userStore.setSetting(themeName);
      this.settingsService.updateCurrent(this.userStore.getUser().settings)
        .pipe(takeUntil(this.destroy$))
        .subscribe();

    } else {
      const details: UserUpdateMe = {
        theme: themeName,
      };

      this.userService.updateMyAnonymousProfile(details);
    }

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

  getAnonymousAvatarUrl() {
    return User.GET_DEFAULT_ANONYMOUS_AVATAR_URL();
  }

  getLichessPictureName() {
    if (this.currentTheme === 'dark') {
      return '-dark';
    }

    return '';
  }

  getChess24PictureName() {
    if (this.currentTheme === 'material-light') {
      return '-material-light';
    }

    return '';
  }

}
