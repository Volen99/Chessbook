import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {NbRoleProvider} from "../sharebook-nebular/security/services/role.provider";
import {NbAuthService} from "../sharebook-nebular/auth/services/auth.service";
import {NbAuthOAuth2JWTToken} from "../sharebook-nebular/auth/services/token/token";

@Injectable()
export class RoleProvider extends NbRoleProvider {

  constructor(private authService: NbAuthService) {
    super();
  }

  getLowerCaseRoles(roles: any): string | string[] {
    if (Array.isArray(roles)) {
      roles = roles.map(element => {
        return element.toLowerCase();
      });
    } else {
      roles = roles.toLowerCase();
    }
    return roles;
  }

  getRole(): Observable<string | string[]> {
    return this.authService.getToken()
      .pipe(
        map((token: NbAuthOAuth2JWTToken) => {
          debugger
          const payload = token.getAccessTokenPayload();
          return !!(token.isValid() && payload && payload['role']) ? this.getLowerCaseRoles(payload['role']) : 'guest';
        }),
      );
  }
}
