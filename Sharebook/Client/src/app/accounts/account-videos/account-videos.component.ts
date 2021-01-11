import {Subscription} from 'rxjs';
import {first, tap} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {immutableAssign} from "../../helpers/utils";
import {UserService} from "../../core/users/user.service";
import {ServerService} from "../../core/server";
import {Notifier} from "../../core/notification/notifier-service";
import {ConfirmService} from "../../core/confirm/confirm.service";
import {ScreenService} from "../../core/wrappers/screen.service";
import {LocalStorageService} from "../../core/wrappers/storage.service";
import {AbstractVideoList} from "../../shared/shared-video-miniature/abstract-video-list";
import {VideoFilter} from "../../shared/models/videos/video-query.type";
import {AuthService} from "../../core/auth/auth.service";
import {AccountService} from "../../shared/main/account/account.service";
import {VideoService} from "../../shared/main/video/video.service";
import {Account} from "../../shared/main/account/account.model";

@Component({
  selector: 'my-account-videos',
  templateUrl: '../../shared/shared-video-miniature/abstract-video-list.html',
  styleUrls: [
    '../../shared/shared-video-miniature/abstract-video-list.scss'
  ]
})
export class AccountVideosComponent extends AbstractVideoList implements OnInit, OnDestroy {
  titlePage: string;
  loadOnInit = false;

  filter: VideoFilter = null;

  private account: Account;
  private accountSub: Subscription;

  constructor(
    protected router: Router,
    protected serverService: ServerService,
    protected route: ActivatedRoute,
    protected authService: AuthService,
    protected userService: UserService,
    protected notifier: Notifier,
    protected confirmService: ConfirmService,
    protected screenService: ScreenService,
    protected storageService: LocalStorageService,
    private accountService: AccountService,
    private videoService: VideoService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.enableAllFilterIfPossible();

    // Parent get the account for us
    this.accountSub = this.accountService.accountLoaded
      .pipe(first())
      .subscribe(account => {
        this.account = account;

        this.reloadVideos();
        this.generateSyndicationList();
      });
  }

  ngOnDestroy() {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }

    super.ngOnDestroy();
  }

  getVideosObservable(page: number) {
    const newPagination = immutableAssign(this.pagination, {currentPage: page});
    const options = {
      account: this.account,
      videoPagination: newPagination,
      sort: this.sort,
      nsfwPolicy: this.nsfwPolicy,
      videoFilter: this.filter
    };

    return this.videoService
      .getAccountVideos(options)
      .pipe(
        tap(({total}) => {
          this.titlePage = $localize`Published ${total} videos`;
        })
      );
  }

  toggleModerationDisplay() {
    this.filter = this.buildLocalFilter(this.filter, null);

    this.reloadVideos();
  }

  generateSyndicationList() {
    this.syndicationItems = this.videoService.getAccountFeedUrls(this.account.id);
  }
}
