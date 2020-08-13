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

@Injectable()
export class SecurityService {

  private actionUrl: string;
  private headers: HttpHeaders;
  private storage: StorageService;
  private userManager: UserManager;
  private authenticationSource = new Subject<boolean>();
  authenticationChallenge$ = this.authenticationSource.asObservable();
  private authorityUrl = '';

  private _http: HttpClient;
  private _router: Router;
  private route: ActivatedRoute;
  private _configurationService: ConfigurationService;
  private _storageService: StorageService;

  constructor(_http: HttpClient, _router: Router, route: ActivatedRoute, _configurationService: ConfigurationService, _storageService: StorageService) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.storage = _storageService;

    this._http = _http;
    this._router = _router;
    this.route = route;
    this._configurationService = _configurationService;
    this._storageService = _storageService;

    this._configurationService.settingsLoaded$.subscribe(x => {
      this.authorityUrl = this._configurationService.serverSettings.identityUrl;
      this.storage.store('IdentityUrl', this.authorityUrl);
    });

    if (this.storage.retrieve('IsAuthorized') !== '') {
      this.IsAuthorized = this.storage.retrieve('IsAuthorized');
      this.authenticationSource.next(true);
      this.UserData = this.storage.retrieve('userData');
    }
  }

  public IsAuthorized: boolean;
  public UserData: any;

  public ResetAuthorizationData() {
    this.IsAuthorized = false;
    this.storage.store('IsAuthorized', false);
    this.storage.store('authorizationDataIdToken', '');
    this.storage.store('userData', '');

    localStorage.removeItem('oidc.user:https://localhost:5001/:js');
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
      function(error) {
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
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
              axiosConfig.headers['Authorization'] = 'Bearer ' + user.access_token;
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

      if (result.state !== this.storage.retrieve('authStateControl')) {
        console.log('AuthorizedCallback incorrect state');
      } else {

        token = result.access_token;
        id_token = result.id_token;

        let dataIdToken: any = this.getDataFromToken(id_token);

        // validate nonce
        if (dataIdToken.nonce !== this.storage.retrieve('authNonce')) {
          console.log('AuthorizedCallback incorrect nonce');
        } else {
          this.storage.store('authNonce', '');
          this.storage.store('authStateControl', '');

          authResponseIsValid = true;
          console.log('AuthorizedCallback state and nonce validated, returning access token');
        }
      }
    }

    if (authResponseIsValid) {
      this.SetAuthorizationData(token, id_token);
    }
  }

  public Logoff() {
    let authorizationUrl = this.authorityUrl + '/connect/endsession';
    let id_token_hint = this.storage.retrieve('authorizationDataIdToken');
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
    if (error.status == 403) {
      this._router.navigate(['/Forbidden']);
    } else if (error.status == 401) {
      // this.ResetAuthorizationData();
      this._router.navigate(['/Unauthorized']);
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
