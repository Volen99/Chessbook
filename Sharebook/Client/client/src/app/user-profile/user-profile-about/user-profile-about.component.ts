import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarkdownService } from '../../core';
import { Account } from '../../shared/shared-main/account/account.model';
import { AccountService } from '../../shared/shared-main/account/account.service';

@Component({
  selector: 'app-account-about',
  templateUrl: './user-profile-about.component.html',
  styleUrls: [ './user-profile-about.component.scss' ]
})
export class UserProfileAboutComponent implements OnInit, OnDestroy {
  account: Account;
  descriptionHTML = '';

  private accountSub: Subscription;

  constructor(
    private accountService: AccountService,
    private markdownService: MarkdownService
  ) {
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
    if (this.accountSub) this.accountSub.unsubscribe();
  }

  getAccountDescription() {
    if (this.descriptionHTML) return this.descriptionHTML;

    return $localize`No description`;
  }
}
