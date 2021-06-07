import {Observable, ReplaySubject} from "rxjs";
import {RestExtractor} from "../../core/rest/rest-extractor";
import { catchError, map, tap } from 'rxjs/operators';
import {User} from "../../shared/shared-main/user/user.model";
import {Injectable} from "@angular/core";
import {UsersApi} from "../../core/backend/common/api/users.api";
import {RestService} from "../../core/rest/rest.service";

@Injectable()
export class UserProfileService {
  // private BASE_ACCOUNT_URL = environment.apiUrl + '/profiles';

  accountLoaded = new ReplaySubject<User>(1);

  constructor (private api: UsersApi, private restExtractor: RestExtractor, private restService: RestService,) {

  }

  getProfile (screenName: string): Observable<User> {
    return this.api.getProfile(`profile/${screenName}`)
      .pipe(
        map(accountHash => new User(accountHash)),
        tap(account => this.accountLoaded.next(account)),
        catchError(res => this.restExtractor.handleError(res))
      );
  }
}
