import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as Oidc from 'oidc-client';

import {StorageService} from '../../../core/shared-core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private router: Router;
  private storageService: StorageService;

  constructor(router: Router, storageService: StorageService) {
    this.router = router;
    this.storageService = storageService;

  }

  ngOnInit(): void {
    if (this.storageService.retrieve('isAuthorized') == undefined) {
      const userManger = new Oidc.UserManager({
        userStore: new Oidc.WebStorageStateStore({store: window.localStorage}),
        response_mode: 'query',
      });

      userManger.signinCallback().then(user => {
        console.log(user);

        this.storageService.store('isAuthorized', true);
        this.storageService.store('authorizationDataIdToken', user.id_token);
        this.storageService.store('userData', user);

        window.location.href = '';
      })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
