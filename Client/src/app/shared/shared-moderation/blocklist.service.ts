import {SortMeta} from 'primeng/api';
import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';

import {AccountBlock} from './account-block.model';
import {RestExtractor} from "../../core/rest/rest-extractor";
import {RestService} from "../../core/rest/rest.service";
import {RestPagination} from "../../core/rest/rest-pagination";
import {ResultList} from "../models";
import {IAccountBlock} from "../models/moderation/account-block.model";
import {User} from '../shared-main/user/user.model';
import {HttpService} from "../../core/backend/common/api/http.service";

export enum BlocklistComponentType { Account, Instance }

@Injectable()
export class BlocklistService {
  static BASE_USER_BLOCKLIST_URL = 'users/me/blocklist';
  static BASE_SERVER_BLOCKLIST_URL = 'server/blocklist';

  constructor(private authHttp: HttpService,
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

  blockAccountByUser(account: Pick<User, 'screenName'>) {
    const body = {screenName: account.screenName};

    return this.authHttp.post(BlocklistService.BASE_USER_BLOCKLIST_URL + '/accounts', body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  unblockAccountByUser(account: Pick<User, 'screenName'>) {
    const path = BlocklistService.BASE_USER_BLOCKLIST_URL + '/accounts/' + account.screenName;

    return this.authHttp.delete(path)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  /*********************** Instance -> Account blocklist ***********************/

  getInstanceAccountBlocklist(options: { pagination: RestPagination, sort: SortMeta, search?: string }) {
    const {pagination, sort, search} = options;

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) params = params.append('search', search);

    return this.authHttp.get<ResultList<AccountBlock>>(BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/accounts', {params})
      .pipe(
        map(res => this.restExtractor.convertResultListDateToHuman(res)),
        map(res => this.restExtractor.applyToResultListData(res, this.formatAccountBlock.bind(this))),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  blockAccountByInstance(account: Pick<User, 'screenName'>) {
    const body = {accountName: account.screenName};

    return this.authHttp.post(BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/accounts', body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  unblockAccountByInstance(account: Pick<User, 'screenName'>) {
    const path = BlocklistService.BASE_SERVER_BLOCKLIST_URL + '/accounts/' + account.screenName;

    return this.authHttp.delete(path)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  private formatAccountBlock(accountBlock: IAccountBlock) {
    return new AccountBlock(accountBlock);
  }
}
