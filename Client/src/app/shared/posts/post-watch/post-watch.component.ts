import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {HttpStatusCode} from "../../core-utils/miscs";
import {PostDetails} from "../../shared-main/post/post-details.model";
import {PostsService} from "../posts.service";
import {RestExtractor} from "../../../core/rest/rest-extractor";
import {MarkdownService} from "../../../core/renderer/markdown.service";
import {UserVideoRateType} from "../models/rate/user-video-rate.type";
import {UserStore} from "../../../core/stores/user.store";
import {Notifier} from "../../../core/notification/notifier.service";

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
              private userStore: UserStore, private notifier: Notifier) {
  }

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

  post: PostDetails = null;
  userRating: UserVideoRateType = null;

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
          .catch(err => this.notifier.error(err));
      });
  }


  private async onVideoFetched(post: PostDetails) {
    debugger
    // @ts-ignore
    this.post = post.postFromServer;

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

    // this.hooks.runAction('action:video-watch.video.loaded', 'video-watch', {videojs});
  }

  private async setVideoDescriptionHTML() {
    const html = await this.markdownService.textMarkdownToHTML(this.post.text);
    // this.videoHTMLDescription = await this.markdownService.processVideoTimestamps(html);
  }

  private checkUserRating() {
    // Unlogged users do not have ratings
    if (this.isUserLoggedIn() === false) {
      return;
    }

    this.postService.getUserVideoRating(this.post.id)
      .subscribe(
        ratingObject => {
          if (ratingObject) {
            this.userRating = ratingObject.rating;
          }
        },
        err => this.notifier.error(err.message)
      );
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

}
