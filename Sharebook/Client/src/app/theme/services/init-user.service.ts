import {Observable} from 'rxjs';
import {IUser, UserData} from '../../core/interfaces/common/users';
import {tap} from 'rxjs/operators';
import {UserStore} from '../../core/stores/user.store';
import {Injectable} from '@angular/core';
import {NbJSThemesRegistry, NbThemeService} from '@nebular/theme';

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
