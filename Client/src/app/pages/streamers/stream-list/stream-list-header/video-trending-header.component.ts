import {Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {VideoListHeaderComponent} from "../../../../shared/post-miniature/video-list-header.component";
import {RedirectService} from "../../../../core/routing/redirect.service";
import {ServerService} from "../../../../core/server/server.service";
import {AuthService} from "../../../../core/auth/auth.service";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

import {
  faChartLine,
  faThumbsUp,
  faAward,
} from '@fortawesome/pro-light-svg-icons';

import {
  faFlame,
} from '@fortawesome/pro-solid-svg-icons';

interface VideoTrendingHeaderItem {
  label: string;
  iconName: IconDefinition;
  value: string;
  tooltip?: string;
  hidden?: boolean;
}

@Component({
  selector: 'video-trending-title-page',
  styleUrls: ['./video-trending-header.component.scss'],
  templateUrl: './video-trending-header.component.html'
})
export class VideoTrendingHeaderComponent extends VideoListHeaderComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'title-page title-page-single';

  buttons: VideoTrendingHeaderItem[];

  private algorithmChangeSub: Subscription;

  constructor(@Inject('data') public data: any,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private serverService: ServerService,
              private redirectService: RedirectService,
  ) {
    super(data);
    this.buttons = [
      {
        label: `:A variant of Trending videos based on the number of recent interactions, minus user history:Best`,
        iconName: this.faAward,
        value: 'best',
        tooltip: `Videos with the most interactions for recent videos, minus user history`,
        hidden: true
      },
      {
        label: `:A variant of Trending videos based on the number of recent interactions:Hot`,
        iconName: this.faFlame,
        value: 'hot',
        tooltip: `Videos with the most interactions for recent videos`,
        hidden: true
      },
      {
        label: `:Main variant of Trending videos based on number of recent views:Views`,
        iconName: this.faChartLine,
        value: 'most-viewed',
        tooltip: `Videos with the most views during the last 24 hours`
      },
      {
        label: `:A variant of Trending videos based on the number of likes:Likes`,
        iconName: this.faThumbsUp,
        value: 'most-liked',
        tooltip: `Videos that have the most likes`
      }
    ];
  }

  ngOnInit() {
    // this.serverService.getConfig()
    //   .subscribe(config => {
    //     const algEnabled = config.trending.videos.algorithms.enabled;
    //
    //     this.buttons = this.buttons.map(b => {
    //       b.hidden = !algEnabled.includes(b.value);
    //
    //       // Best is adapted by the user history so
    //       if (b.value === 'best' && !this.auth.isLoggedIn()) {
    //         b.hidden = true;
    //       }
    //
    //       return b;
    //     });
    //   });

    this.algorithmChangeSub = this.route.queryParams.subscribe(
      queryParams => {
        this.data.model = queryParams['alg'] || this.redirectService.getDefaultTrendingAlgorithm();
      }
    );
  }

  ngOnDestroy() {
    if (this.algorithmChangeSub) this.algorithmChangeSub.unsubscribe();
  }

  faChartLine = faChartLine;
  faThumbsUp = faThumbsUp;
  faFlame = faFlame;
  faAward = faAward;

  setSort() {
    const alg = this.data.model !== this.redirectService.getDefaultTrendingAlgorithm()
      ? this.data.model
      : undefined;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {alg},
        queryParamsHandling: 'merge'
      }
    );
  }
}
