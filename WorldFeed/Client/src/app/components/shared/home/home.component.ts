import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StatisticsService} from '../../../core/shared-core/statistics/statistics.service';
import {Statistics} from '../statistics/statistics.model';
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

    let userManger = new Oidc.UserManager({
      userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
      response_mode: 'query',
    });

    userManger.signinCallback().then(data => {
      console.log(data);

      this.storageService.store('IsAuthorized', true);
      this.storageService.store('authorizationDataIdToken', data.id_token);
      this.storageService.store('userData', data.profile);

      window.location.href = '';
    })
      .catch(err => {
        console.log(err);
      });

  }

  ngOnInit(): void {
    // const userManger = new Oidc.UserManager({
    //   userStore: new Oidc.WebStorageStateStore({store: window.localStorage}),
    //   response_mode: 'query'
    // });
    //
    // userManger.signinCallback().then(res => {
    //   console.log(res);
    // });
  }
}
