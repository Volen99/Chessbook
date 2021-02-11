import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {UsersApi} from '../api/users.api';
import {UserData, IUser} from '../../../interfaces/common/users';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {catchError, concatMap, map, shareReplay, toArray} from 'rxjs/operators';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RestExtractor} from "../../../rest/rest-extractor";
import {RestService} from "../../../rest/rest.service";
import {LocalStorageService, SessionStorageService} from "../../../wrappers/storage.service";
import {UserUpdate} from "../../../../shared/models/users/user-update.model";
import {UserCreate} from "../../../../shared/models/users/user-create.model";
import {RestPagination} from "../../../rest/rest-pagination";
import {SortMeta} from "primeng/api";
import {ResultList} from "../../../../shared/models";

@Injectable()
export class UsersService extends UserData {
  private userCache: { [ id: number ]: Observable<IUser> } = {};

  constructor(private restExtractor: RestExtractor,
              private restService: RestService,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private api: UsersApi) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.usersDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<IUser[]> {
    return this.api.list(pageNumber, pageSize);
  }

  getCurrentUser(): Observable<IUser> {
    return this.api.getCurrent()
      .pipe(
        map(u => {
          if (u && !u.setting) {
            u.setting = {};
          }
          return u;
        }));
  }

  get(id: number): Observable<IUser> {
    return this.api.get(id);
  }

  create(user: any): Observable<IUser> {
    return this.api.add(user);
  }

  update(user: any): Observable<IUser> {
    return this.api.update(user);
  }

  updateCurrent(user: any): Observable<IUser> {
    return this.api.updateCurrent(user);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }

  /* ### Admin methods ### */

  addUser (userCreate: UserCreate) {
    return this.api.add(userCreate)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  updateUser(userId: number, userUpdate: UserUpdate) {
    return this.api.updateUser(userId, userUpdate)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  updateUsers(users: IUser[], userUpdate: UserUpdate) {
    return from(users)
      .pipe(
        concatMap(u => this.api.updateUsers(u.id, userUpdate)),
        toArray(),
        catchError(err => this.restExtractor.handleError(err))
      );
  }


  removeUser(usersArg: IUser | IUser[]) {
    const users = Array.isArray(usersArg) ? usersArg : [usersArg];

    return from(users)
      .pipe(
        concatMap(u => this.api.delete(u.id)),
        toArray(),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  banUsers(usersArg: IUser | IUser[], reason?: string) {
    const body = reason ? {reason} : {};
    const users = Array.isArray(usersArg) ? usersArg : [usersArg];

    return from(users)
      .pipe(
        concatMap(u => this.api.ban(u.id + '/block', body)),
        toArray(),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  unbanUsers(usersArg: IUser | IUser[]) {
    const users = Array.isArray(usersArg) ? usersArg : [usersArg];

    return from(users)
      .pipe(
        concatMap(u => this.api.unban(u.id + '/unblock', {})),
        toArray(),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  getUserWithCache(userId: number) {
    if (!this.userCache[userId]) {
      this.userCache[ userId ] = this.getUser(userId).pipe(shareReplay());
    }

    return this.userCache[userId];
  }

  getUser(userId: number, withStats: boolean = false) {
    const params = new HttpParams().append('withStats', withStats + '');
    return this.api.getUser(userId, params)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  getAnonymousUser() {
  }

  getUsers(parameters: { pagination: RestPagination; sort: SortMeta; search?: string }): Observable<ResultList<IUser>> {
    return undefined;
  }


}
