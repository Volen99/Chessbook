import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerPath: string = environment.identityApiUrl + 'identity/register';
  private loginPath: string = environment.identityApiUrl + 'identity/login';

  constructor(private http: HttpClient) {

  }

  register(payload): Observable<any> {
    return this.http.post(this.registerPath, payload);
  }

  login(payload): Observable<any> {
    return this.http.post(this.loginPath, payload);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  setId(dealerId) {
    localStorage.setItem('dealerId', dealerId);
  }
}
