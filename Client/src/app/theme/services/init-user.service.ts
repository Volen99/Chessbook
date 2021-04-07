import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {IUser, UserData} from "../../core/interfaces/common/users";
import {NbThemeService} from "../../sharebook-nebular/theme/services/theme.service";
import {NbJSThemesRegistry} from "../../sharebook-nebular/theme/services/js-themes-registry.service";
import {UserStore} from "../../core/stores/user.store";

@Injectable()
export class InitUserService {
  constructor(protected userStore: UserStore, protected usersService: UserData,
              protected jsThemes: NbJSThemesRegistry, protected themeService: NbThemeService) {

  }

  initCurrentUser(): Observable<IUser> {
    return this.usersService.getCurrentUser()
      .pipe(tap((user: IUser) => {
        if (user) {
          this.userStore.setUser(user);

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
