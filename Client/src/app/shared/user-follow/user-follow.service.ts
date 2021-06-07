import {Injectable, NgZone} from "@angular/core";
import {asyncScheduler, merge, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {bufferTime, catchError, filter, map, observeOn, share, switchMap, tap} from 'rxjs/operators';
import {enterZone, leaveZone} from "../../helpers/zone";
import {uniq} from 'lodash-es';
import {HttpParams} from "@angular/common/http";
import {RestService} from "../../core/rest/rest.service";
import {HttpService} from "../../core/backend/common/api/http.service";
import {RestExtractor} from "../../core/rest/rest-extractor";


type SubscriptionExistResult = { [uri: string]: boolean };
type SubscriptionExistResultObservable = { [uri: string]: Observable<boolean> };

@Injectable()
export class UserFollowService {
  private apiController: string = 'relationships';

// Use a replay subject because we "next" a value before subscribing
  private existsSubject = new ReplaySubject<string>(1);
  private readonly existsObservable: Observable<SubscriptionExistResult>;

  private myAccountSubscriptionCache: SubscriptionExistResult = {};
  private myAccountSubscriptionCacheObservable: SubscriptionExistResultObservable = {};
  private myAccountSubscriptionCacheSubject = new Subject<SubscriptionExistResult>();

  constructor(private ngZone: NgZone, private restService: RestService,
              private http: HttpService,
              private restExtractor: RestExtractor,) {
    this.existsObservable = merge(
      this.existsSubject.pipe(
        // We leave Angular zone so Protractor does not get stuck
        bufferTime(500, leaveZone(this.ngZone, asyncScheduler)),
        filter(uris => uris.length !== 0),
        map(uris => uniq(uris)),
        observeOn(enterZone(this.ngZone, asyncScheduler)),
        switchMap(uris => this.doSubscriptionsExist(uris)),
        share()
      ),

      this.myAccountSubscriptionCacheSubject
    );
  }

  addSubscription(nameWithHost: string) {
    const url = this.apiController + '/follow';

    const body = {screenName: nameWithHost};
    return this.http.post(url, body)
      .pipe(
        map(this.restExtractor.extractDataBool),
        tap(() => {
          this.myAccountSubscriptionCache[nameWithHost] = true;

          this.myAccountSubscriptionCacheSubject.next(this.myAccountSubscriptionCache);
        }),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  deleteSubscription(screenName: string) {
    const url = this.apiController + '/unfollow/' + screenName;

    return this.http.post(url, {})
      .pipe(
        map(this.restExtractor.extractDataBool),
        tap(() => {
          this.myAccountSubscriptionCache[screenName] = false;

          this.myAccountSubscriptionCacheSubject.next(this.myAccountSubscriptionCache);
        }),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  listenToMyAccountSubscriptionCacheSubject() {
    return this.myAccountSubscriptionCacheSubject.asObservable();
  }

  listenToSubscriptionCacheChange(nameWithHost: string) {
    if (nameWithHost in this.myAccountSubscriptionCacheObservable) {
      return this.myAccountSubscriptionCacheObservable[nameWithHost];
    }

    const obs = this.existsObservable
      .pipe(
        filter(existsResult => existsResult[nameWithHost] !== undefined),
        map(existsResult => existsResult[nameWithHost])
      );

    this.myAccountSubscriptionCacheObservable[nameWithHost] = obs;
    return obs;
  }

  doesSubscriptionExist(nameWithHost: string) {
    console.log('Running subscription check for %d.', nameWithHost);

    if (nameWithHost in this.myAccountSubscriptionCache) {
      console.log('Found cache for %d.', nameWithHost);

      return of(this.myAccountSubscriptionCache[nameWithHost]);
    }

    this.existsSubject.next(nameWithHost);

    console.log('Fetching from network for %d.', nameWithHost);
    return this.existsObservable.pipe(
      filter(existsResult => existsResult[nameWithHost] !== undefined),
      map(existsResult => existsResult[nameWithHost]),
      tap(result => this.myAccountSubscriptionCache[nameWithHost] = result)
    );
  }

  private doSubscriptionsExist(screenNames: string[]): Observable<SubscriptionExistResult> {
    const url = this.apiController + '/exist';
    let params = new HttpParams();

    params = this.restService.addObjectParams(params, { screenNames });

    return this.http.get<SubscriptionExistResult>(url, { params })
      .pipe(
        tap(res => {
          this.myAccountSubscriptionCache = {
            ...this.myAccountSubscriptionCache,
            ...res
          };
        }),
        catchError(err => this.restExtractor.handleError(err))
      );
  }
}
