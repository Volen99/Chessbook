import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {forkJoin, Subject, Subscription} from 'rxjs';
import {catchError, map, takeUntil} from 'rxjs/operators';

import {
  faHeart,
  faLongArrowLeft,
} from '@fortawesome/pro-light-svg-icons';

import {faHeart as faHeartSolid} from "@fortawesome/pro-solid-svg-icons";


import {HttpStatusCode} from "../../core-utils/miscs";
import {PostDetails} from "../../shared-main/post/post-details.model";
import {PostsService} from "../posts.service";
import {RestExtractor} from "../../../core/rest/rest-extractor";
import {MarkdownService} from "../../../core/renderer/markdown.service";
import {UserVideoRateType} from "../models/rate/user-video-rate.type";
import {UserStore} from "../../../core/stores/user.store";
import {Notifier} from "../../../core/notification/notifier.service";
import {scrollToTop} from "../../../helpers/utils";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {MetaService} from "../../../core/routing/meta.service";
import {NbLayoutScrollService} from "../../../sharebook-nebular/theme/services/scroll.service";
import {Post} from "../../shared-main/post/post.model";
import {Location} from "@angular/common";
import {IsVideoPipe} from "../../shared-main/angular/pipes/is-video.pipe";
import {NbMediaBreakpointsService} from "../../../sharebook-nebular/theme/services/breakpoints.service";
import {NbThemeService} from "../../../sharebook-nebular/theme/services/theme.service";


@Component({
  selector: 'app-post-watch',
  templateUrl: './post-watch.component.html',
  styleUrls: ['./post-watch.component.scss']
})
export class PostWatchComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  private queryParamsSub: Subscription;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private postService: PostsService,
              private restExtractor: RestExtractor, private markdownService: MarkdownService,
              private userStore: UserStore, private notifier: NbToastrService,
              private metaService: MetaService, private location: Location,
              private breakpointService: NbMediaBreakpointsService,
              private themeService: NbThemeService) {
  }

  get user() {
    return this.userStore.getUser();
  }

  // get anonymousUser () {
  //   return this.userService.getAnonymousUser();
  // }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(routeParams => {
      const screenName = routeParams['screenName'];
      if (screenName) {
        // this.loadVideo(videoId);
      }

      const postId = routeParams['id'];
      if (postId) {
        this.loadPost(postId);

        // this.loadPlaylist(playlistId);
      }
    });

    // this.queryParamsSub = this.route.queryParams.subscribe(queryParams => {
    //   this.playlistPosition = queryParams['playlistPosition'];
    //   this.videoWatchPlaylist.updatePlaylistIndex(this.playlistPosition);
    //
    //   const start = queryParams['start'];
    //   if (this.player && start) this.player.currentTime(parseInt(start, 10));
    // });


    const {md} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < md),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanMD: boolean) => {
        if (isLessThanMD) {
          this.commentsTransform += 100;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  faHeart = faHeart;
  faLongArrowLeft = faLongArrowLeft;

  post: Post = null;
  userRating: UserVideoRateType = null;
  tooltipLike = '';

  svgStyles = {
    display: 'inline-block',
    fill: 'currentcolor',
    'flex-shrink': '0',
    width: '1.5em',
    height: '1.5em',
    'max-width': '100% ',
    position: 'relative',
    'vertical-align': 'text-bottom',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
  };

  isUserLoggedIn() {
    return !!this.userStore.getUser();
  }


  private loadPost(videoId: string) {
    // Video did not change
    if (this.post && this.post.uuid === videoId) {
      return;
    }

    // const videoObs = this.hooks.wrapObsFun(
    //   this.videoService.getVideo.bind(this.videoService),
    //   {videoId},
    //   'video-watch',
    //   'filter:api.video-watch.video.get.params',
    //   'filter:api.video-watch.video.get.result'
    // );

    const post = this.postService.getPost(videoId);

    // Video did change
    forkJoin([
      post,
    ])
      .pipe(
        // If 400, 403 or 404, the video is private or blocked so redirect to 404
        catchError(err => {
          return this.restExtractor.redirectTo404IfNotFound(err, 'post', [
            HttpStatusCode.BAD_REQUEST_400,
            HttpStatusCode.FORBIDDEN_403,
            HttpStatusCode.NOT_FOUND_404
          ]);
        })
      )
      .subscribe(([video]) => {
        this.onVideoFetched(video)
          .catch(err => this.notifier.danger(err, 'Error'));
      });
  }

  handleTimestampClicked(timestamp: number) {
    // if (!this.player || this.video.isLive) {
    //   return;
    // }
    //
    // this.player.currentTime(timestamp);
    scrollToTop();
  }


  private async onVideoFetched(post: PostDetails) {
    this.post = post;
    this.post.commentsEnabled = true;

    this.commentsTransform = this.getCommentsTransform();

    // Re init attributes
    // this.descriptionLoading = false;
    // this.completeDescriptionShown = false;
    // this.completeVideoDescription = undefined;

    // if (this.isVideoBlur(this.video)) {
    //   const res = await this.confirmService.confirm(
    //     $localize`This video contains mature or explicit content. Are you sure you want to watch it?`,
    //     $localize`Mature or explicit content`
    //   );
    //   if (res === false) return this.location.back();
    // }

    // this.setVideoDescriptionHTML();
    this.checkUserRating();
    this.setOpenGraphTags();

    // this.hooks.runAction('action:video-watch.video.loaded', 'video-watch', {videojs});
  }

  private async setVideoDescriptionHTML() {
    const html = await this.markdownService.textMarkdownToHTML(this.post.status);
    // this.videoHTMLDescription = await this.markdownService.processVideoTimestamps(html);
  }

  private checkUserRating() {
    // Unlogged users do not have ratings
    if (this.isUserLoggedIn() === false) {
      return;
    }

    this.userRating = this.post.favorited ? 'like' : 'none';
    this.updateLikeStuff(this.userRating);

    // this.postService.getUserVideoRating(this.post.id)
    //   .subscribe(
    //     ratingObject => {
    //       if (ratingObject) {
    //         this.userRating = ratingObject.rating;
    //       }
    //     },
    //     err => this.notifier.error(err.message)
    //   );
  }

  calcMinHeight(commentsCount?: number): number {
    if (!commentsCount || commentsCount === 0) {
      return 1215;
    }

    return (commentsCount + 1) * 650;
  }

  setTransform(i: number, post: Post): number {
    return i * 388.7; // 😁
  }

  back() {
    this.location.back();
    return false;
  }

  private updateLikeStuff(rating: UserVideoRateType) {
    if (rating === 'like') {
      this.faHeart = faHeartSolid;
      this.tooltipLike = 'Unlike';
    } else {
      this.faHeart = faHeart;
      this.tooltipLike = 'Like';
    }
  }

  commentsTransform: number = 0;
  private getCommentsTransform(): number {
    let statusCharCount = this.post.status ? this.post.status.length : 0;
    if (this.post.hasMedia) {
      if (this.post.entities.medias.length === 1) {
        return (580 / this.post.entities.medias[0].meta['original'].aspect + 338) + (statusCharCount / 2) ?? 0;
        // return ((this.post.entities.medias[0].meta['original'].height / 2)) + (statusCharCount / 2) ?? 0;
      } else {
        return 573.4 + (statusCharCount / 2) ?? 0;
      }
    } else {
      if (this.post.card) {
        return (393.4 + (statusCharCount / 2) ?? 0);
      } else if (this.post.poll) {
        return ((229.7 + (this.post.poll.answers.length * 100)) + (this.post.poll.question.length / 2) ?? 0);
      } else if (IsVideoPipe.isYoutube(this.post.status) || IsVideoPipe.isTwitch(this.post.status) || IsVideoPipe.isTwitchClip(this.post.status)) {
        return (599.7 + (statusCharCount / 2) ?? 0);
      }
    }

    return 573.4;
  }

  private setOpenGraphTags() {
    this.metaService.setTitle(this.post.status);

    this.metaService.setTag('og:type', 'video');

    this.metaService.setTag('og:title', this.post.status);
    this.metaService.setTag('name', this.post.status);

    this.metaService.setTag('og:description', this.post.status);
    this.metaService.setTag('description', this.post.status);

    this.metaService.setTag('og:image', this.post?.entities?.medias[0]?.imageUrl ?? '');

    this.metaService.setTag('og:site_name', 'Chessbook');

    this.metaService.setTag('og:url', window.location.href);
    this.metaService.setTag('url', window.location.href);
  }



}
