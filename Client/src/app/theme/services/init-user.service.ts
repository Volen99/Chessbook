import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Subject} from "rxjs/Subject";

import {IUser, UserData} from "../../core/interfaces/common/users";
import {NbThemeService} from "../../sharebook-nebular/theme/services/theme.service";
import {NbJSThemesRegistry} from "../../sharebook-nebular/theme/services/js-themes-registry.service";
import {UserStore} from "../../core/stores/user.store";
import {User} from "../../shared/shared-main/user/user.model";

@Injectable()
export class InitUserService {
  // observable that is fired when user is loaded from server
  private settingsLoadedSource = new Subject();
  settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady: boolean = false;

  constructor(protected userStore: UserStore, protected usersService: UserData,
              protected jsThemes: NbJSThemesRegistry, protected themeService: NbThemeService) {

  }

    initCurrentUser(): Observable<IUser> {
    return this.usersService.getCurrentUser()
      .pipe(tap((user: IUser) => {
        if (user) {
          user = new User(user);
          this.userStore.setUser(user);

          this.isReady = true;
          this.settingsLoadedSource.next();

          if (user.settings && user.settings.themeName) {
            if (this.jsThemes.has(user.settings.themeName)
              && !!this.jsThemes.get(user.settings.themeName).variables.initialized) {
              this.themeService.changeTheme(user.settings.themeName);
            }
          }
        }
      }));
  }
}
