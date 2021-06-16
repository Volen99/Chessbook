import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";

import {NbThemeService} from "../../../../sharebook-nebular/theme/services/theme.service";
import {UserStore} from "../../../../core/stores/user.store";
import {SettingsData} from "../../../../core/interfaces/common/settings";

@Component({
  selector: 'app-my-account-theme',
  templateUrl: './my-account-theme.component.html',
  styleUrls: ['./my-account-theme.component.scss']
})
export class MyAccountThemeComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private themeService: NbThemeService,
              private userStore: UserStore,
              private settingsService: SettingsData) {
  }

  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

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
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  currentTheme = 'default';

  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);
    this.settingsService.updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.themeService.changeTheme(themeName);
  }

}
