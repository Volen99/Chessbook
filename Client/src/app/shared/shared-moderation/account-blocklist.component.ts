import {Directive, OnInit} from '@angular/core';
import {SortMeta} from 'primeng/api';

import {AccountBlock} from './account-block.model';
import {RestTable} from "../../core/rest/rest-table";
import {RestPagination} from "../../core/rest/rest-pagination";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {BlocklistComponentType, BlocklistService} from './blocklist.service';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class GenericAccountBlocklistComponent extends RestTable implements OnInit {
  // @ts-ignore: "Abstract methods can only appear within an abstract class"
  abstract mode: BlocklistComponentType;

  blockedAccounts: AccountBlock[] = [];
  totalRecords = 0;
  sort: SortMeta = {field: 'createdAt', order: -1};
  pagination: RestPagination = {count: this.rowsPerPage, start: 0};

  constructor(private notifier: NbToastrService, private blocklistService: BlocklistService) {
    super();
  }

  // @ts-ignore: "Abstract methods can only appear within an abstract class"
  abstract getIdentifier(): string;

  ngOnInit() {
    this.initialize();
  }

  unblockAccount(accountBlock: AccountBlock) {
    const blockedAccount = accountBlock.blockedAccount;
    const operation = this.mode === BlocklistComponentType.Account
      ? this.blocklistService.unblockAccountByUser(blockedAccount)
      : this.blocklistService.unblockAccountByInstance(blockedAccount);

    operation.subscribe(
      () => {
        this.notifier.success(
          this.mode === BlocklistComponentType.Account
            ? `User ${blockedAccount.screenName} unblocked`
            : `User ${blockedAccount.screenName} unblocked`,
          'Success'
        );

        this.reloadData();
      }
    );
  }

  protected reloadData() {
    const operation = this.mode === BlocklistComponentType.Account
      ? this.blocklistService.getUserAccountBlocklist({
        pagination: this.pagination,
        sort: this.sort,
        search: this.search
      })
      : this.blocklistService.getInstanceAccountBlocklist({
        pagination: this.pagination,
        sort: this.sort,
        search: this.search
      });

    return operation.subscribe(
      resultList => {
        // @ts-ignore
        this.blockedAccounts = resultList.data;
        this.totalRecords = resultList.total;
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }
}
