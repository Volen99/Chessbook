import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserStore} from "../../core/stores/user.store";
import {UserFollowService} from "./user-follow.service";
import { concat, forkJoin, merge } from 'rxjs';
import {Notifier} from "../../core/notification/notifier.service";
import {User} from "../shared-main/user/user.model";
import {Router} from "@angular/router";
import {faFrown} from '@fortawesome/pro-solid-svg-icons';
import {IUser} from "../../core/interfaces/common/users";


@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit, OnChanges {
  @Input() account: IUser;

  constructor(private userStore: UserStore,
              private userFollowService: UserFollowService,
              private notifier: Notifier,
              private router: Router,) {
  }

  ngOnInit(): void {
    debugger
    this.loadSubscribedStatus();
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  subscribed = new Map<string, boolean>();

  faFrown = faFrown;

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


  get isAllChannelsSubscribed() {
    return this.subscribeStatus(true).length > 0; // this.videoChannels.length;
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

    // const observableBatch = this.videoChannels
    //   .map(videoChannel => this.getChannelHandler(videoChannel))
    //   .filter(handle => subscribedStatus.includes(handle))
    //   .map(handle => this.userSubscriptionService.addSubscription(handle));


    let observableBatch: any;
    if (subscribedStatus.includes(this.account.screenName)) {
      observableBatch = this.userFollowService.addSubscription(this.account.screenName);
    }

    forkJoin(observableBatch)
      .subscribe(
        () => {
          debugger
          this.account.followersCount += 1;

          this.notifier.success(
            this.account
              ? `Subscribed to all current channels of ${this.account.name}. You will be notified of all their new videos.`
              : `Subscribed to {this.videoChannels[0].displayName}. You will be notified of all their new videos.`,

            `Subscribed`
          );
        },

        err => this.notifier.error(err.message)
      );
  }

  localUnsubscribe() {
    const subscribeStatus = this.subscribeStatus(true); // returns array of screenNames

    let arr = [];
    arr.push(this.account);

    const observableBatch = arr
      .map(videoChannel => videoChannel.screenName)
      .filter(handle => subscribeStatus.includes(handle))
      .map(handle => this.userFollowService.deleteSubscription(handle));

    concat(...observableBatch)
      .subscribe({
        complete: () => {
          this.account.followersCount -= 1;

          this.notifier.success(
            this.account
              ? `Unsubscribed from all channels of {this.account.nameWithHost}`
              : `Unsubscribed from {this.videoChannels[0].nameWithHost}`,

            `Unsubscribed`
          );
        },

        error: err => this.notifier.error(err.message)
      });
  }

  gotoLogin() {
    this.router.navigate(['/auth/login']);
  }

  private loadSubscribedStatus() {
    if (!this.isUserLoggedIn()) {
      return;
    }

    const handle = this.account.screenName;    // this.getChannelHandler(videoChannel);
    this.subscribed.set(handle, false);

    merge(this.userFollowService.listenToSubscriptionCacheChange(handle),
          this.userFollowService.doesSubscriptionExist(handle)
    ).subscribe(
      res => this.subscribed.set(handle, res),

      err => this.notifier.error(err.message)
    );
  }

  isFollowingButtonHovered = false;

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

}
