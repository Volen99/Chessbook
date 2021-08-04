import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {NbRoleProvider} from "../sharebook-nebular/security/services/role.provider";
import {ROLES} from "./roles";

@Injectable()
export class ModeratorGuard implements CanActivate {
  constructor(private roleProvider: NbRoleProvider) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.roleProvider.getRole()
      .pipe(map(role => {
        const roles = role instanceof Array ? role : [role];
        return roles.some(x => x && x.toLowerCase() === ROLES.MODERATOR || x.toLowerCase() === ROLES.ADMIN);
      }));
  }
}
