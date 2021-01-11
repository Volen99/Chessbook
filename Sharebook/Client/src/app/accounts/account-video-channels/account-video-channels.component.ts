import {Component, OnDestroy, OnInit} from '@angular/core';
import {from, Subject, Subscription} from 'rxjs';
import {concatMap, map, switchMap, tap} from 'rxjs/operators';

import {UserService} from "../../core/users/user.service";
import {User} from "../../core/users/user.model";
import {ScreenService} from "../../core/wrappers/screen.service";
import {ComponentPagination, hasMoreItems} from "../../core/rest/component-pagination.model";
import {Account} from "../../shared/main/account/account.model";
import {VideoChannel} from "../../shared/main/video-channel/video-channel.model";
import {Video} from "../../shared/main/video/video.model";
import {VideoSortField} from "../../shared/models/videos/video-sort-field.type";
import {NSFWPolicyType} from "../../shared/models/videos/nsfw-policy.type";
import {AccountService} from "../../shared/main/account/account.service";
import {VideoChannelService} from "../../shared/main/video-channel/video-channel.service";
import {VideoService} from "../../shared/main/video/video.service";

@Component({
  selector: 'my-account-video-channels',
  templateUrl: './account-video-channels.component.html',
  styleUrls: ['./account-video-channels.component.scss']
})
export class AccountVideoChannelsComponent implements OnInit, OnDestroy {
  account: Account;
  videoChannels: VideoChannel[] = [];
  videos: { [id: number]: Video[] } = {};

  channelPagination: ComponentPagination = {
    currentPage: 1,
    itemsPerPage: 2,
    totalItems: null
  };

  videosPagination: ComponentPagination = {
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: null
  };
  videosSort: VideoSortField = '-publishedAt';

  onChannelDataSubject = new Subject<any>();

  userMiniature: User;
  nsfwPolicy: NSFWPolicyType;

  private accountSub: Subscription;

  constructor(
    private accountService: AccountService,
    private videoChannelService: VideoChannelService,
    private videoService: VideoService,
    private screenService: ScreenService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    // Parent get the account for us
    this.accountSub = this.accountService.accountLoaded
      .subscribe(account => {
        this.account = account;

        this.loadMoreChannels();
      });

    this.userService.getAnonymousOrLoggedUser()
      .subscribe(user => {
        this.userMiniature = user;

        this.nsfwPolicy = user.nsfwPolicy;
      });
  }

  ngOnDestroy() {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }
  }

  loadMoreChannels() {
    this.videoChannelService.listAccountVideoChannels(this.account, this.channelPagination)
      .pipe(
        tap(res => this.channelPagination.totalItems = res.total),
        switchMap(res => from(res.data)),
        concatMap(videoChannel => {
          const options = {
            videoChannel,
            videoPagination: this.videosPagination,
            sort: this.videosSort,
            nsfwPolicy: this.nsfwPolicy
          };

          return this.videoService.getVideoChannelVideos(options)
            .pipe(map(data => ({videoChannel, videos: data.data})));
        })
      )
      .subscribe(({videoChannel, videos}) => {
        this.videoChannels.push(videoChannel);

        this.videos[videoChannel.id] = videos;

        this.onChannelDataSubject.next([videoChannel]);
      });
  }

  getVideosOf(videoChannel: VideoChannel) {
    const numberOfVideos = this.screenService.getNumberOfAvailableMiniatures();

    // 2 rows
    return this.videos[videoChannel.id].slice(0, numberOfVideos * 2);
  }

  onNearOfBottom() {
    if (!hasMoreItems(this.channelPagination)) {
      return;
    }

    this.channelPagination.currentPage += 1;

    this.loadMoreChannels();
  }

  getVideoChannelLink(videoChannel: VideoChannel) {
    return ['/video-channels', videoChannel.nameWithHost];
  }
}
