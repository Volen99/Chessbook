import {SortMeta} from 'primeng/api';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AccountBlock} from './account-block.model';
import {RestExtractor} from "../../core/rest/rest-extractor";
import {RestService} from "../../core/rest/rest.service";
import {RestPagination} from "../../core/rest/rest-pagination";
import {ResultList} from "../models";
import {ServerBlock} from "../models/moderation/server-block.model";
import {IAccountBlock} from "../models/moderation/account-block.model";
import { User } from '../shared-main/user/user.model';

export enum BlocklistComponentType { Account, Instance }

@Injectable()
export class BlocklistService {
  static BASE_USER_BLOCKLIST_URL = environment.apiUrl + '/api/v1/users/me/blocklist';
  static BASE_SERVER_BLOCKLIST_URL = environment.apiUrl + '/api/v1/server/blocklist';

  constructor(
    private authHttp: HttpClient,
    private restExtractor: RestExtractor,
    private restService: RestService) {
  }

  /*********************** User -> Account blocklist ***********************/

  getUserAccountBlocklist(options: { pagination: RestPagination, sort: SortMeta, search?: string }) {
    const {pagination, sort, search} = options;

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) params = params.append('search', search);

    return this.authHttp.get<ResultList<AccountBlock>>(BlocklistService.BASE_USER_BLOCKLIST_URL + '/accounts', {params})
      .pipe(
        map(res => this.restExtractor.convertResultListDateToHuman(res)),
        map(res => this.restExtractor.applyToResultListData(res, this.formatAccountBlock.bind(this))),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  blockAccountByUser(user: User /*account: Pick<User, 'nameWithHost'>*/) {
    const body = {accountName: user.displayName};

    return this.authHttp.post(BlocklistService.BASE_USER_BLOCKLIST_URL + '/accounts', body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  unblockAccountByUser(user: User /*account: Pick<User, 'nameWithHost'>*/) {
    const path = BlocklistService.BASE_USER_BLOCKLIST_URL + '/accounts/' + user.displayName;

    return this.authHttp.delete(path)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  /*********************** User -> Server blocklist ***********************/

  getUserServerBlocklist(options: { pagination: RestPagination, sort: SortMeta, search?: string }) {
    const {pagination, sort, search} = options;

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) params = params.append('search', search);

    return this.authHttp.get<ResultList<ServerBlock>>(BlocklistService.BASE_USER_BLOCKLIST_URL + '/servers', {params})
      .pipe(
        map(res => this.restExtractor.convertResultListDateToHuman(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  blockServerByUser(host: string) {
    const body = {host};

    return this.authHttp.post(BlocklistService.BASE_USER_BLOCKLIST_URL + '/servers', body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  unblockServerByUser(host: string) {
    const path = BlocklistService.BASE_USER_BLOCKLIST_URL + '/servers/' + host;

    return this.authHttp.delete(path)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  /*********************** Instance -> Account blocklist ***********************/

  getInstanceAccountBlocklist(options: { pagination: RestPagination, sort: SortMeta, search?: string }) {
    const {pagination, sort, search} = options;

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) {
      params = params.append('search', search);
    }

    return this.authHttp.get<ResultList<AccountBlock>>(BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/accounts', {params})
      .pipe(
        map(res => this.restExtractor.convertResultListDateToHuman(res)),
        map(res => this.restExtractor.applyToResultListData(res, this.formatAccountBlock.bind(this))),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  blockAccountByInstance(user: User /*account: Pick<User, 'nameWithHost'>*/) {
    const body = {accountName: user.displayName};

    return this.authHttp.post(BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/accounts', body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  unblockAccountByInstance(user: User /*account: Pick<User, 'nameWithHost'>*/) {
    const path = BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/accounts/' + user.displayName;

    return this.authHttp.delete(path)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  /*********************** Instance -> Server blocklist ***********************/

  getInstanceServerBlocklist(options: { pagination: RestPagination, sort: SortMeta, search?: string }) {
    const {pagination, sort, search} = options;

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) params = params.append('search', search);

    return this.authHttp.get<ResultList<ServerBlock>>(BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/servers', {params})
      .pipe(
        map(res => this.restExtractor.convertResultListDateToHuman(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  blockServerByInstance(host: string) {
    const body = {host};

    return this.authHttp.post(BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/servers', body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  unblockServerByInstance(host: string) {
    const path = BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/servers/' + host;

    return this.authHttp.delete(path)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  private formatAccountBlock(accountBlock: IAccountBlock) {
    return new AccountBlock(accountBlock);
  }
}
