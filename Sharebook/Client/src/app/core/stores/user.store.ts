import { Injectable } from '@angular/core';
import { User } from '../interfaces/common/users';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user: User;

  protected userState$: BehaviorSubject<any>;

  constructor() {
    this.userState$ = new BehaviorSubject(this.user);
  }

  getUser(): User {
    return this.user;
  }

  setUser(paramUser: User) {
    this.user = paramUser;

    this.changeUserState(paramUser);
  }

  onUserStateChange() {
    return this.userState$.pipe(share());
  }

  changeUserState(paramUser: User) {
    this.userState$.next(paramUser);
  }

  setSetting(themeName: string) {
    if (this.user) {
      if (this.user.settings) {
        this.user.settings.themeName = themeName;
      } else {
        this.user.settings = { themeName: themeName };
      }

      this.changeUserState(this.user);
    }
  }
}
