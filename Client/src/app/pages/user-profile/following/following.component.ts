import {ActivatedRoute} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {catchError, distinctUntilChanged, map, switchMap, tap} from "rxjs/operators";

import {User} from "../../../shared/shared-main/user/user.model";
import {UserFollowService} from "../../../shared/user-follow/user-follow.service";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {ComponentPaginationLight} from "../../../core/rest/component-pagination.model";
import {HttpStatusCode} from "../../../shared/core-utils/miscs";
import {UserProfileService} from "../user-profile.service";
import {RestExtractor} from "../../../core/rest/rest-extractor";

@Component({
  selector: 'app-user-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private restExtractor: RestExtractor,
              private userFollowService: UserFollowService,
              private userProfileService: UserProfileService,
              private notifier: NbToastrService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.parent.params
      .pipe(
        map(params => params['screenName']),
        distinctUntilChanged(),
        switchMap(async (screenName) => this.loadSubscriptions(screenName, this.route.snapshot.routeConfig.path.includes('following'))),
        tap(users => this.onAccount(users)),
        catchError(err => this.restExtractor.redirectTo404IfNotFound(err, 'other', [
          HttpStatusCode.BAD_REQUEST_400,
          HttpStatusCode.NOT_FOUND_404
        ]))
      )
      .subscribe((data) => {
          // videoChannels => this.videoChannels = videoChannels.data,
          //
          // err => this.notifier.error(err.message)
        }
      );
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  pagination: ComponentPaginationLight = {currentPage: 1,  itemsPerPage: 40};
  users: User[] = [];

  private loadSubscriptions(screenName: string, following: boolean, more = true) {
    this.userFollowService.listSubscriptions({pagination: this.pagination}, screenName, following)
      .subscribe(
        res => {
          this.users = more
            ? this.users.concat(res.data)
            : res.data;
          this.pagination.totalItems = res.total;

          // this.onDataSubject.next(res.data);
        },

        error => this.notifier.danger(error.message, 'Error')
      );
  }

  private async onAccount(users: any) {

  }

}
