import {Component, OnInit} from '@angular/core';
import {NewsService} from "./news.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../core/backend/common/services/users.service";
import {ScreenService} from "../../core/wrappers/screen.service";
import {LocalStorageService} from "../../core/wrappers/storage.service";
import {PostsService} from "../../shared/posts/posts.service";
import {TimelineService} from "../../shared/timeline/timeline.service";
import {Observable} from "rxjs";
import {Post} from "../../shared/shared-main/post/post.model";
import {immutableAssign, scrollToTop} from "../../helpers/utils";
import {GetHomeTimelineParameters} from "../../shared/models/timeline/get-home-timeline-parameters";
import {AbstractPostList} from "../../shared/post-miniature/abstract-post-list/abstract-post-list";


@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends AbstractPostList implements OnInit {

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
              private timelineService: TimelineService,
              private newsService: NewsService) {
    super();
  }


  ngOnInit(): void {
    super.ngOnInit();

    // this.timelineService.getHomeTimelineAsync(new GetHomeTimelineParameters())
    //   .subscribe((posts: any[]) => {
    //     super.posts = posts;
    //   });
  }

  titlePage: string;

  generateSyndicationList(): void {
    throw new Error('Method not implemented.');
  }

  getPostsObservable(page: number): Observable<{ data: Post[] }> {
    debugger
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

  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  loadNext(cardData) {
    if (cardData.loading) { return; }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.newsService.load(cardData.pageToLoadNext, this.pageSize)
      .subscribe(nextNews => {
        cardData.placeholders = [];
        cardData.news.push(...nextNews);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }

  removeVideoFromArray(post: Post) {
    super.removeVideoFromArray(post);
  }

}
