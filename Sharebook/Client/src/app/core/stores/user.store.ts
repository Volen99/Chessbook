import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/common/users';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user: IUser;

  protected userState$: BehaviorSubject<any>;

  constructor() {
    this.userState$ = new BehaviorSubject(this.user);
  }

  getUser(): IUser {
    return this.user;
  }

  setUser(paramUser: IUser) {
    this.user = paramUser;

    this.changeUserState(paramUser);
  }

  onUserStateChange() {
    return this.userState$.pipe(share());
  }

  changeUserState(paramUser: IUser) {
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
