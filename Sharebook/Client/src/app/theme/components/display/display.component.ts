import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";

import {IUser} from "../../../core/interfaces/common/users";
import {NbThemeService} from "@nebular/theme";
import {UserStore} from "../../../core/stores/user.store";
import {SettingsData} from "../../../core/interfaces/common/settings";
import {LayoutService} from "../../../core/utils";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {
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

  constructor(private themeService: NbThemeService,
              private userStore: UserStore,
              private settingsService: SettingsData,
              private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: IUser) => {
        this.user = user;
        // this.userMenu = this.getMenuItems();
      });

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
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

}
