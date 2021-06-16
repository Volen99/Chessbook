import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {
  faSmileWink,
  faHandHoldingHeart,
  faImagePolaroid,
  faPoll,
} from '@fortawesome/pro-light-svg-icons';

import {TimelineService} from "./timeline.service";
import {GetHomeTimelineParameters} from "../models/timeline/get-home-timeline-parameters";
import {PostsService} from "../posts/posts.service";
import {Post} from "../shared-main/post/post.model";
import {AbstractPostList} from "../post-miniature/abstract-post-list/abstract-post-list";
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from 'app/core/backend/common/services/users.service';
import {ScreenService} from 'app/core/wrappers/screen.service';
import {LocalStorageService} from 'app/core/wrappers/storage.service';
import {immutableAssign, scrollToTop} from "../../helpers/utils";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent extends AbstractPostList implements OnInit {
  private loaded = false;
  private currentPage = 1;
  private maxPage = 20;
  private lastWasEmpty = false;
  private isLoading = false;

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected usersService: UsersService,
              protected screenService: ScreenService,
              protected storageService: LocalStorageService,
              private postsService: PostsService,
              private timelineService: TimelineService) {
    super();
  }


  ngOnInit(): void {
    super.ngOnInit();
  }

  faSmileWink = faSmileWink;
  faHandHoldingHeart = faHandHoldingHeart;
  faImagePolaroid = faImagePolaroid;
  faPoll = faPoll;

  titlePage: string;

  generateSyndicationList(): void {
    throw new Error('Method not implemented.');
  }

  getPostsObservable(page: number): Observable<{ data: Post[] }> {
    const newPagination = immutableAssign(this.pagination, {currentPage: page});

    return this.postsService.getHomeTimelinePosts(new GetHomeTimelineParameters(newPagination, this.sort, true));
  }

  handleHeaderClick() {
    scrollToTop();
  }

  calcMinHeight(postsCount?: number): number {
    if (!postsCount) {
      return 670;
    }

    return postsCount * 670;
  }

  setTransform(i: number): number {
    return i * 388.7; // 😁
  }

  // onNearOfBottom() {
  //   if (this.currentPage >= this.maxPage) return;
  //   if (this.lastWasEmpty) return;
  //   if (this.isLoading) return;
  //
  //   this.currentPage++;
  //   this.loadMoreResults();
  // }

  // private loadMoreResults() {
  //   this.isLoading = true;
  //
  //   this.overviewService.getVideosOverview(this.currentPage)
  //     .subscribe(
  //       overview => {
  //         this.isLoading = false;
  //
  //         if (overview.tags.length === 0 && overview.channels.length === 0 && overview.categories.length === 0) {
  //           this.lastWasEmpty = true;
  //           if (this.loaded === false) this.notResults = true;
  //
  //           return;
  //         }
  //
  //         this.loaded = true;
  //         this.onDataSubject.next(overview);
  //
  //         this.overviews.push(overview);
  //       },
  //
  //       err => {
  //         this.notifier.error(err.message);
  //         this.isLoading = false;
  //       }
  //     );
  // }
}
