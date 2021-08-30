import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {forkJoin, Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {
  faHeart,
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


@Component({
  selector: 'app-post-watch',
  templateUrl: './post-watch.component.html',
  styleUrls: ['./post-watch.component.scss']
})
export class PostWatchComponent implements OnInit {
  private paramsSub: Subscription;
  private queryParamsSub: Subscription;

  constructor(private route: ActivatedRoute, private postService: PostsService,
              private restExtractor: RestExtractor, private markdownService: MarkdownService,
              private userStore: UserStore, private notifier: NbToastrService,
              private metaService: MetaService) {
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
  }

  faHeart = faHeart;

  post: PostDetails = null;
  userRating: UserVideoRateType = null;
  tooltipLike = '';

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
        const queryParams = this.route.snapshot.queryParams;

        const urlOptions = {
          resume: queryParams.resume,

          startTime: queryParams.start,
          stopTime: queryParams.stop,

          muted: queryParams.muted,
          loop: queryParams.loop,
          subtitle: queryParams.subtitle,

          playerMode: queryParams.mode,
          peertubeLink: false
        };

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

  setTransform(i: number): number {
    return i * 388.7; // 😁
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

  private setOpenGraphTags() {
    this.metaService.setTitle(this.post.status);

    this.metaService.setTag('og:type', 'video');

    this.metaService.setTag('og:title', this.post.status);
    this.metaService.setTag('name', this.post.status);

    this.metaService.setTag('og:description', this.post.status);
    this.metaService.setTag('description', this.post.status);

    this.metaService.setTag('og:image', this.post.entities.medias[0].imageUrl ?? '');

    this.metaService.setTag('og:site_name', 'Chessbook');

    this.metaService.setTag('og:url', window.location.href);
    this.metaService.setTag('url', window.location.href);
  }

}
