import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private router: Router;

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
