import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {UserStore} from "../stores/user.store";

@Injectable()
export class UserRightGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private auth: UserStore
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.auth.getUser();
    if (user) {
      const neededUserRight = route.data.userRight;

      if (user.hasRight(neededUserRight)) return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
