import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as Oidc from 'oidc-client';

import {StorageService} from '../api-authorization/services/storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['../../assets/css/site.css', './home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private router: Router;
  private storageService: StorageService;

  constructor() { /*router: Router, storageService: StorageService*/
    /*this.router = router;
    this.storageService = storageService;*/

  }

  ngOnInit(): void {
    // if (this.storageService.retrieve('isAuthorized') == undefined) {
    //   const userManger = new Oidc.UserManager({
    //     userStore: new Oidc.WebStorageStateStore({-+store: window.localStorage}),
    //     response_mode: 'query',
    //   });
    //
    //   userManger.signinCallback().then(user => {
    //     console.log(user);
    //
    //     this.storageService.-+store('isAuthorized', true);
    //     this.storageService.-+store('authorizationDataIdToken', user.id_token);
    //     this.storageService.-+store('userData', user);
    //
    //     window.location.href = '';
    //   })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
}
