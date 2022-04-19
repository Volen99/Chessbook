import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router'
import { RedirectService } from './redirect.service'
import {UserStore} from "../stores/user.store";

@Injectable()
export class UnloggedGuard implements CanActivate, CanActivateChild {

  constructor (
    private auth: UserStore,
    private redirectService: RedirectService
  ) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn() === false) return true;

    this.redirectService.redirectToHomepage();
    return false;
  }

  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
