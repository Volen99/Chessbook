import {Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../shared/main/account/account.service";
import {MarkdownService} from "../../core/renderer/markdown.service";
import {Account} from "../../shared/main/account/account.model";

@Component({
  selector: 'my-account-about',
  templateUrl: './account-about.component.html',
  styleUrls: ['./account-about.component.scss']
})
export class AccountAboutComponent implements OnInit, OnDestroy {
  account: Account;
  descriptionHTML = '';

  private accountSub: Subscription;

  constructor(private accountService: AccountService, private markdownService: MarkdownService) {
  }

  ngOnInit() {
    // Parent get the account for us
    this.accountSub = this.accountService.accountLoaded
      .subscribe(async account => {
        this.account = account;
        this.descriptionHTML = await this.markdownService.textMarkdownToHTML(this.account.description, true);
      });
  }

  ngOnDestroy() {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }
  }

  getAccountDescription() {
    if (this.descriptionHTML) {
      return this.descriptionHTML;
    }

    return $localize`No description`;
  }
}
