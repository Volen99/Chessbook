import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {StorageService} from './storage.service';
import {ConfigurationService} from './configuration.service';

import {User, UserManager, UserManagerSettings} from 'oidc-client';
import * as Oidc from 'oidc-client';

import axios from 'axios';
import {AccountSettings} from "../../models/settings/models/settings.model";

@Injectable()
export class SecurityService {
  private http: HttpClient;
  private router: Router;
  private route: ActivatedRoute;
  private headers: HttpHeaders;

  private storageService: StorageService;
  private userManager: UserManager;
  private authenticationSource = new Subject<boolean>();
  authenticationChallenge$ = this.authenticationSource.asObservable();
  private configurationService: ConfigurationService;
  private actionUrl: string;
  private authorityUrl = '';


  constructor(http: HttpClient, router: Router, route: ActivatedRoute,
              configurationService: ConfigurationService, storageService: StorageService) {
    this.storageService = storageService;
    this.http = http;
    this.router = router;
    this.route = route;
    this.configurationService = configurationService;

    this.configurationService.settingsLoaded$.subscribe(x => {
      this.authorityUrl = this.configurationService.serverSettings.identityUrl;
      // this.storageService.store('IdentityUrl', this.authorityUrl);
    });

    if (this.storageService.retrieve('isAuthorized') !== '') {
      this.isAuthorized = this.storageService.retrieve('isAuthorized');
      this.authenticationSource.next(true);
      this.userData = this.storageService.retrieve('userData');
    }

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public isAuthorized: boolean;
  public userData: any;

  public GetToken(): any {
    return this.storageService.retrieve('authorizationDataIdToken');
  }

  public ResetAuthorizationData() {
    this.storageService.store('authorizationDataIdToken', '');
    this.storageService.store('userData', '');

    this.storageService.remove('isAuthorized');

    const keys = Object.entries(localStorage)[0];
    const oidcKey = keys.filter(k => k.includes('oidc.'))[0];
    localStorage.removeItem(oidcKey);
  }

  public Authorize() {
    const config = {
      userStore: new Oidc.WebStorageStateStore({store: window.localStorage}),
      authority: 'https://localhost:5001/',
      client_id: 'js',
      redirect_uri: location.origin + '/',
      response_type: 'code',
      scope: 'openid profile',
    };

    this.userManager = new UserManager(config);                   // https://github.com/IdentityModel/oidc-client-js/wiki

    this.userManager.signinRedirect();

    this.userManager.getUser().then(user => {
      console.log('user:', user);
      if (user) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;

        // emit observable
        this.authenticationSource.next(true);
        window.location.href = location.origin;
      }
    });

    let refreshing = false;

    axios.interceptors.response.use((response) => {
        return response;
      },
      (error) => {
        console.log('axios error:', error.response);

        const axiosConfig = error.response.config;

        // if error response is 401 try to refresh token
        if (error.response.status === 401) {
          console.log('axios error 401');

          // if already refreshing don't make another request
          if (!refreshing) {
            console.log('starting token refresh');
            refreshing = true;

            // do the refresh
            debugger
            return this.userManager.signinSilent().then(user => {
              console.log('new user:', user);
              // update the http request and client
              axios.defaults.headers.common.Authorization = 'Bearer ' + user.access_token;
              axiosConfig.headers.Authorization = 'Bearer ' + user.access_token;
              // retry the http request
              return axios(axiosConfig);
            });
          }
        }
        return Promise.reject(error);
      });
  }


  // https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
  public AuthorizedCallback() {
    this.ResetAuthorizationData();

    let hash = window.location.hash.substr(1);

    let result: any = hash.split('&').reduce(function(result: any, item: string) {
      let parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});

    console.log(result);

    let token = '';
    let id_token = '';
    let authResponseIsValid = false;

    if (!result.error) {
      if (result.state !== this.storageService.retrieve('authStateControl')) {
        console.log('AuthorizedCallback incorrect state');
      } else {

        token = result.access_token;
        id_token = result.id_token;

        let dataIdToken: any = this.getDataFromToken(id_token);

        // validate nonce
        if (dataIdToken.nonce !== this.storageService.retrieve('authNonce')) {
          console.log('AuthorizedCallback incorrect nonce');
        } else {
          this.storageService.store('authNonce', '');
          this.storageService.store('authStateControl', '');

          authResponseIsValid = true;
          console.log('AuthorizedCallback state and nonce validated, returning access token');
        }
      }
    }

    if (authResponseIsValid) {
      this.SetAuthorizationData(token, id_token);
    }
  }

  public getUserFromServer() {
    const sub = this.storageService.retrieve('userData').sub;
    return this.http.get<User>(this.configurationService.serverSettings.identityUrl + '/Account/GetUser', {params: {sub}});
  }

  public Logoff() {
    let authorizationUrl = this.authorityUrl + '/connect/endsession';
    let id_token_hint = this.storageService.retrieve('authorizationDataIdToken');
    let post_logout_redirect_uri = location.origin + '/';

    let url =
      authorizationUrl + '?' +
      'id_token_hint=' + encodeURI(id_token_hint) + '&' +
      'post_logout_redirect_uri=' + encodeURI(post_logout_redirect_uri);

    this.ResetAuthorizationData();

    // emit observable
    this.authenticationSource.next(false);
    window.location.href = url;
  }

  public HandleError(error: any) {
    console.log(error);
    if (error.status === 403) {
      this.router.navigate(['/Forbidden']);
    } else if (error.status === 401) {
      // this.ResetAuthorizationData();
      this.router.navigate(['/Unauthorized']);
    }
  }

  private urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }

    return window.atob(output);
  }

  private getDataFromToken(token: any) {
    let data = {};

    if (typeof token !== 'undefined') {
      let encoded = token.split('.')[1];

      data = JSON.parse(this.urlBase64Decode(encoded));
    }

    return data;
  }
}
