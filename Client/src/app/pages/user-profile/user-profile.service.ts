import {Injectable} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import {RestExtractor} from "../../core/rest/rest-extractor";
import {User} from "../../shared/shared-main/user/user.model";
import {UsersApi} from "../../core/backend/common/api/users.api";

@Injectable()
export class UserProfileService {
  accountLoaded = new ReplaySubject<User>(1);

  constructor (private api: UsersApi, private restExtractor: RestExtractor) {

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
