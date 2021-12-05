import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { concat, forkJoin, merge } from 'rxjs';

import {UserStore} from "../../core/stores/user.store";
import {UserFollowService} from "./user-follow.service";
import {IUser} from "../../core/interfaces/common/users";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {BlocklistService} from "../shared-moderation/blocklist.service";

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
  providers: [UserFollowService]
})
export class FollowButtonComponent implements OnInit, OnChanges {
  /**
   * SubscribeButtonComponent can be used with a single User passed as [user],
   * or with an account and a full list of that account's users. The latter is intended
   * to allow mass un/subscription from an account's page, while keeping the channel-centric
   * subscription model.
   */
  @Input() account: IUser;
  @Input() users: IUser[];

  @Input() blocking: boolean;

  constructor(private userStore: UserStore,
              private userFollowService: UserFollowService,
              private notifier: NbToastrService,
              private router: Router,
              private blocklistService: BlocklistService) {
  }

  get isAllChannelsSubscribed() {
    return this.subscribeStatus(true).length === this.users.length; // > 0;
  }

  get isAtLeastOneChannelSubscribed () {
    return this.subscribeStatus(true).length > 0;
  }

  get isBigButton () {
    return this.isUserLoggedIn() && this.users.length > 1 && this.isAtLeastOneChannelSubscribed;
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.loadSubscribedStatus();
  }

  subscribed = new Map<string, boolean>();

  rightAfterFollow = false;

  subscribe() {
    if (this.isUserLoggedIn()) {
      this.rightAfterFollow = true;
      return this.localSubscribe();
    }

    return this.gotoLogin();
  }

  unsubscribe() {
    if (this.isUserLoggedIn()) {
      this.localUnsubscribe();
    }
  }

  subscribeStatus(subscribed: boolean) {
    const accumulator: string[] = [];
    for (const [key, value] of this.subscribed.entries()) {
      if (value === subscribed) {
        accumulator.push(key);
      }
    }

    return accumulator;
  }

  isUserLoggedIn() {
    return !!this.userStore.getUser();
  }

  localSubscribe() {
    const subscribedStatus = this.subscribeStatus(false);

    const observableBatch = this.users
      .map(videoChannel => videoChannel.screenName)
      .filter(handle => subscribedStatus.includes(handle))
      .map(handle => this.userFollowService.addSubscription(handle));

    forkJoin(observableBatch)
      .subscribe(
        () => {
          this.account.followersCount += 1;

          // this.notifier.success(
          //   this.account
          //     ? `Subscribed to all current channels of ${this.account.displayName}. You will be notified of all their new videos.`
          //     : `Subscribed to {this.videoChannels[0].displayName}. You will be notified of all their new videos.`,
          //
          //   `Subscribed`
          // );
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  localUnsubscribe() {
    const subscribeStatus = this.subscribeStatus(true); // returns array of screenNames

    const observableBatch = this.users
      .map(videoChannel => videoChannel.screenName)
      .filter(handle => subscribeStatus.includes(handle))
      .map(handle => this.userFollowService.deleteSubscription(handle));

    concat(...observableBatch)
      .subscribe({
        complete: () => {
          this.account.followersCount -= 1;

          // this.notifier.success(
          //   this.account
          //     ? `Unsubscribed from all channels of {this.account.nameWithHost}`
          //     : `Unsubscribed from {this.videoChannels[0].nameWithHost}`,
          //
          //   `Unsubscribed`
          // );
        },

        error: err => this.notifier.danger(err.message, 'Error')
      });
  }

  gotoLogin() {
    this.router.navigate(['/auth/login']);
  }

  private loadSubscribedStatus() {
    if (!this.isUserLoggedIn()) {
      return;
    }

    for (const user of this.users) {
      const handle = user.screenName;
      this.subscribed.set(handle, false);

      merge(
        this.userFollowService.listenToSubscriptionCacheChange(handle),
        this.userFollowService.doesSubscriptionExist(handle)
      ).subscribe(
        res => this.subscribed.set(handle, res),

        err => this.notifier.danger(err.message, 'Error')
      );
    }

  }

  unblock(account: IUser) {
    this.blocklistService.unblockAccountByUser(account)
      .subscribe(
        () => {
          this.notifier.success(`Account ${account.screenName} unblocked.`, 'Success');

          this.account.blocked = false;
          this.blocking = false;
          // this.userChanged.emit();
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  isFollowingButtonHovered = false;
  isBlockedButtonHovered = false;

  followingButtonHoverHandle() {
    if (!this.rightAfterFollow) {
      this.isFollowingButtonHovered = true;
    }
  }

  followingButtonUnhoverHandle() {
    if (this.rightAfterFollow) {
      this.rightAfterFollow = false;
    }

    this.isFollowingButtonHovered = false;
  }

  blockedButtonHoverHandle() {
      this.isBlockedButtonHovered = true;
  }

  blockedButtonUnhoverHandle() {
    this.isBlockedButtonHovered = false;
  }

}
