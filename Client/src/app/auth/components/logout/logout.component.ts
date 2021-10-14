import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { getDeepFromObject } from '../../helpers';
import {NB_AUTH_OPTIONS} from "../../../sharebook-nebular/auth/auth.options";
import {NbAuthService} from "../../../sharebook-nebular/auth/services/auth.service";
import {NbAuthResult} from "../../../sharebook-nebular/auth/services/auth-result";
import {Observable} from "rxjs";
import {AuthStatus} from "../../../core/auth/auth-status.model";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {
  redirectDelay: number = this.getConfigValue('forms.logout.redirectDelay');
  strategy: string = this.getConfigValue('forms.logout.strategy');

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router) {
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          window.location.reload();
          /*return this.router.navigateByUrl(redirect);*/
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
