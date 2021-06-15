import {Component, OnInit, ViewChild} from '@angular/core';
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
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {animate, style, transition, trigger} from "@angular/animations";

const voidState = style({
  transform: 'translateX({{ direction }}110%)',
  height: 0,
  marginLeft: '0',
  marginRight: '0',
  marginTop: '0',
  marginBottom: '0',
  width: '88%'
});

const defaultOptions = { params: { direction: '' } };


@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [voidState, animate(5000)], defaultOptions),
      transition(':leave', [animate(5000, voidState)], defaultOptions),
    ]),
  ],
})
export class HomePageComponent extends AbstractPostList implements OnInit {
  private loaded = false;
  private currentPage = 1;
  private maxPage = 20;
  private lastWasEmpty = false;
  private isLoading = false;

  lottieOptions: AnimationOptions = {
    path: '/assets/animations/fish.json',
    autoplay: true,
    loop: true
  };

  isFishSwimming = false;

  public anim: any;
  fadeIn = { value: '', params: { direction: '' } };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    this.anim = animationItem;
  }

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '9%',
    height: '46px',
    marginTop: '-19px',
    /*margin: '0 auto',*/
  };

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
    setTimeout(() => {
      this.isFishSwimming = true;
      setTimeout(() => {
        this.isFishSwimming = false;
      }, 5000);
    }, 3000);


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
