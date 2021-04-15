import {SortMeta} from 'primeng/api';
import {Directive, OnInit} from '@angular/core';
import {AccountBlock} from './account-block.model';
import {BlocklistComponentType, BlocklistService} from './blocklist.service';
import {RestPagination} from "../../core/rest/rest-pagination";
import {RestTable} from "../../core/rest/rest-table";
import {User} from "../shared-main/user/user.model";

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class GenericAccountBlocklistComponent extends RestTable implements OnInit {
  // @ts-ignore: "Abstract methods can only appear within an abstract class"
  abstract mode: BlocklistComponentType;

  blockedAccounts: AccountBlock[] = [];
  totalRecords = 0;
  sort: SortMeta = {field: 'createdAt', order: -1};
  pagination: RestPagination = {count: this.rowsPerPage, start: 0};

  constructor(private blocklistService: BlocklistService) {
    super();
  }

  // @ts-ignore: "Abstract methods can only appear within an abstract class"
  abstract getIdentifier(): string;

  ngOnInit() {
    this.initialize();
  }

  switchToDefaultAvatar($event: Event) {
    ($event.target as HTMLImageElement).src = User.GET_DEFAULT_AVATAR_URL();
  }

  unblockAccount(accountBlock: AccountBlock) {
    const blockedAccount = accountBlock.blockedAccount;
    const operation = this.mode === BlocklistComponentType.Account
      ? this.blocklistService.unblockAccountByUser(blockedAccount)
      : this.blocklistService.unblockAccountByInstance(blockedAccount);

    operation.subscribe(
      () => {
        // this.notifier.success(
        //   this.mode === BlocklistComponentType.Account
        //     ? `Account ${blockedAccount.nameWithHost} unmuted.`
        //     : `Account ${blockedAccount.nameWithHost} unmuted by your instance.`
        // );

        this.loadData();
      }
    );
  }

  protected loadData() {
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
        this.blockedAccounts = resultList.data;
        this.totalRecords = resultList.total;
      },

      // err => this.notifier.error(err.message)
    );
  }
}