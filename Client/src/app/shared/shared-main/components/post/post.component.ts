import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {debounce} from 'lodash';

import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {
  faComment,
  faShare,
  faHeart,
  faUserTimes,
  faUserPlus,
  faVolumeSlash,
  faCode,
  faFlag,
  faTrashAlt,
  faThumbtack,
  faSatelliteDish,
  faBan,
  faCircle,
  faExpand,
  faSignInAlt,
  faEllipsisH,
} from '@fortawesome/pro-light-svg-icons';

import {
  faHeart as faHeartSolid,
  faShare as faShareSolid,
  faAlarmExclamation,
  faLockAlt,
} from '@fortawesome/pro-solid-svg-icons';

import {UserStore} from "../../../../core/stores/user.store";
import {UserVideoRateType} from "../../../posts/models/rate/user-video-rate.type";
import {PostsService} from "../../../posts/posts.service";
import {PostDetails} from "../../post/post-details.model";
import {NbDialogService} from "../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {UploadComponent} from "../../../../pages/modal-overlays/dialog/compose/upload/upload.component";
import {MarkdownService} from "../../../../core/renderer/markdown.service";

import {Post} from "../../post/post.model";
import {MediaContainerComponent} from "../../../../features/media-container/media-container.component";
import {Router} from "@angular/router";
import {PeerTubeSocket} from "../../../../core/notification/sharebook-socket.service";
import {PopoverMoreComponent} from "./popover-more-component/popover-more.component";
import {AccountReportComponent} from "../../../shared-moderation/report-modals/account-report.component";
import {NbToastrService} from "../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {VideoReportComponent} from "../../../shared-moderation/report-modals/video-report.component";
import {IPost} from "../../../posts/models/post.model";
import {VideoShareComponent} from "../../../shared-share-modal/video-share.component";
import {AppInjector} from "../../../../app-injector";
import {SurveyService} from "../../../services/survey.service";
import {IPoll} from 'app/shared/posts/models/poll/poll';
import {IsVideoPipe} from "../../angular/pipes/is-video.pipe";
import {animate, query, stagger, style, transition, trigger, useAnimation} from "@angular/animations";
import {slideInTop} from "../../animations/slide";

export interface ISocialContextProps {
  screenName: string;
  displayName: string;
  faIcon: IconDefinition;
  postId: number;
  type: 'repost' | 'pinned';
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('likeAnimation', [
      transition('inactive => active', [
        query(':self', style({transform: 'scale(1.0)'})),
        query(':self',
          stagger('0ms linear', [
            animate('150ms linear', style({transform: 'scale(1.5)'}))
          ]))
      ])
    ])
  ]
})
export class PostComponent implements OnInit {
  static MAX_HEIGHT = 642; // 20px * 32 (+ 2px padding at the top)

  @Output() transformBuffer = new EventEmitter();

  @Input() transform: number = 0;
  @Input() post: Post = null;  // PostDetails = null;
  @Input() removeVideoFromArray: (post: Post) => any;
  @Input() featured: boolean = false;
  @Input() posts: Post[];
  @Input() i: number;

  @Input()
  set picture(value: string) {
    this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private domSanitizer: DomSanitizer,
              private userStore: UserStore,
              private postService: PostsService,
              private dialogService: NbDialogService,
              private markdownService: MarkdownService,
              protected notifier: NbToastrService,
              private surveyService: SurveyService) {
    this.tooltipDislike = `Dislike`;

    this.faAlarmExclamation = faAlarmExclamation;
  }

  ngOnInit(): void {
    if (this.isARepost(this.post)) {
      this.socialContextProps = {
        screenName: this.post.user.screenName,
        displayName: this.post.user.displayName,
        faIcon: this.faShare,
        postId: this.post.id,
        type: 'repost',
      };
      this.featured = true;

      this.post = this.post.repost;
    } else if (this.post.pinned) {
      this.socialContextProps = {
        screenName: this.post.user.screenName,
        displayName: this.post.user.displayName,
        faIcon: this.faThumbtack,
        postId: this.post.id,
        type: 'pinned',
      };

      this.featured = true;
    } else {
      this.featured = false;
    }

    this.meatballsMenu = this.getMenuItems();

    this.setStatusTextHTML();

    this.checkUserRating();
    this.updateShareStuff(this.post.reposted);

    this.tooltipShare = 'Share';
    this.tooltipComment = 'Comment';

    this.svgLikeStyles.color = this.userRating === 'like' ? 'blue' : 'inherit';

    // this.init();

    this.buildVideoLink();

    this.transformState = this.setTransform(this.i, this.post);
  }

  popoverMoreComponent = PopoverMoreComponent;

  faAlarmExclamation: IconDefinition;

  socialContextProps: ISocialContextProps;

  sanitizedCommentHTML = '';
  statusHTMLText = '';

  faThumbtack = faThumbtack;

  faComment = faComment;
  faShare = faShare;
  faHeart = faHeart;
  faLockAlt = faLockAlt;
  faSatelliteDish = faSatelliteDish;
  faEllipsisH = faEllipsisH;

  // meatballs menu
  faUserTimes = faUserTimes;
  faUserPlus = faUserPlus;
  faVolumeSlash = faVolumeSlash;
  faCode = faCode;
  faFlag = faFlag;
  faTrashAlt = faTrashAlt;
  faBan = faBan;
  faCircle = faCircle;
  faExpand = faExpand;
  faSignInAlt = faSignInAlt;

  svgLikeStyles = {
    color: 'inherit',    // blue is such a beautiful color 💙
  };
  meatballsMenu: any;
  imageBackgroundStyle: SafeStyle;
  userRating: UserVideoRateType = null;
  test: boolean;
  tooltipLike = '';
  tooltipDislike = '';

  tooltipShare = '';
  tooltipRepost = '';
  tooltipComment = '';

  autoPlayGif: boolean = true;

  svgStyles = {
    'display': 'inline-block',
    'fill': 'currentcolor',
    'flex-shrink': '0',
    'width': '1.5em',
    'height': '1.5em',
    'max-width': '100% ',
    'position': 'relative',
    'vertical-align': 'text-bottom',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
  };

  handleMouseEnter() {
    if (this.autoPlayGif) {
      return;
    }
  }

  getMenuItems() {
    let userCurrent = this.userStore.getUser();

    if (!userCurrent) {
      return [
        {icon: this.faSignInAlt, title: `You need to log in`, link: '/auth/login'},
      ];
    }

    let expandPost: any = {icon: this.faExpand, title: `Expand this post`, link: '#'};

    if (this.post?.user?.id === userCurrent.id) {
      let pinOrUnpinText = !this.post.pinned ? 'Pin to your profile' : 'Unpin from profile';
      return [
        {icon: this.faTrashAlt, title: `Delete`, link: '#'},
        {icon: faThumbtack, title: pinOrUnpinText, link: '#'},
        expandPost,
      ];
    }

    const screenName = this.post?.user?.screenName;
    const userLink = this.post?.user ? `/${screenName.substring(1)}` : '';

    const isDisplayed = this.post?.user.blocking === true;
    let blockOrUnblock;
    if (isDisplayed) {
      blockOrUnblock = {icon: this.faCircle, title: `Unblock ${screenName}`, link: '#'};
    } else {
      blockOrUnblock = {icon: this.faBan, title: `Block ${screenName}`, link: '#'};
    }

    return [
      {icon: this.faUserPlus, title: `Follow ${screenName}`, link: userLink, queryParams: {profile: true}},
      blockOrUnblock,
      expandPost,
      {icon: this.faCode, title: `Embed Post`, link: '#'},
      {icon: this.faFlag, title: `Report Post`, link: '#'},
    ];
  }

  getSaveStyle(value: string) {
    return this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  setLike() {
    this.test = !this.test;
    if (!this.userStore.isLoggedIn()) {
      this.notifier.warning('', 'You need to be logged in to like');
      return;
    }

    // Already liked this post
    if (this.userRating === 'like') {
      this.setRating('none');
    } else {
      this.setRating('like');
    }
  }

  setDislike() {
    if (this.isUserLoggedIn() === false) {
      return;
    }

    // Already disliked this post 🤐
    if (this.userRating === 'dislike') {
      this.setRating('none');
    } else {
      this.setRating('dislike');
    }
  }

  handleReplyButton(post: Post) {
    if (!this.userStore.isLoggedIn()) {
      this.notifier.warning('', 'You need to be logged in to reply'); // TODO: GroupBy them kk
      return;
    }

    this.handleExpandClick(true);

  }

  async handleRepostClick(post: Post) {
    if (!this.userStore.isLoggedIn()) {
      this.notifier.warning('', 'You need to be logged in to repost');
      return;
    }

    if (this.post.reposted) {
      this.postService.unrepost(this.post.id)
        .subscribe((data) => {
          this.post.repostCount -= 1;
          this.post.reposted = false;

          this.updateShareStuff(this.post.reposted);
        });
    } else {
      this.postService.repost(this.post.id)
        .subscribe((data: Post) => {
          // The reblog API method returns a new status wrapped around the original. In this case we are only
          // interested in how the original is modified, hence passing it skipping the wrapper

          this.post.repostCount += 1;
          this.post.reposted = true;
          this.updateShareStuff(this.post.reposted);
        });
    }

  }

  isUserLoggedIn() {
    return !!this.userStore.getUser();
  }

  videoRouterLink: any[] = [];

  buildVideoLink() {
    if (!this.post.url) {
      this.videoRouterLink = [`/${this.post.user.screenName}/post`, this.post.id];

      return;
    }

  }

  getVideoRouterLink() {
    if (this.videoRouterLink) {
      return this.videoRouterLink;
    }

    return this.post.url;

    // return [ '/videos/watch', this.post.uuid ];
  }

  handleOpenMedia(media, index) {
    if (!this.dialogService) {
      this.dialogService = AppInjector.get(NbDialogService);
    }
    this.dialogService.open(MediaContainerComponent, {
      context: {
        media,
        index,
      },

    });
  }

  handleExpandClick(withScroll: boolean = false) {
    this.router.navigate([`/${this.post.user.screenName}/post`, this.post.id], {queryParams: {withScroll}});
  }

  showShareModal() {
    this.dialogService.open(VideoShareComponent, {
      context: {
        // @ts-ignore
        video: this.post,
        playlistPosition: 0,
        videoCaptions: [{language: null, captionPath: ''}],
      }
    });
    /*this.videoShareModal.show(0, 0);*/
  }

  onContecxtItemSelection(title) {
    console.log('click', title);
  }

  handleRefresh(pollId: number) {
    debounce(
      () => {
        this.surveyService.getPoll(this.post.poll.id)
          .subscribe((data: IPoll) => {
            this.post.poll = data;
          });
      },
      1000,
      {leading: true},
    );
  }


  transformState: number = 0;

  // wish i was never born, Wednesday, 11:14 AM, 9/22/2021 | I can't say goodbye
  setTransform(i: number, post: Post): number {
    if (i === 0) {
      return 0;
    }

    let lastPost = this.posts[i - 1];
    if (!lastPost) {
      return;
    }

    if (lastPost.repost) {
      lastPost = lastPost.repost;
      this.transform += 30;
    }

    let statusCharCount = lastPost.status ? lastPost.status.length : 0;
    if (lastPost.hasMedia) {
      this.transform += (399.7 + (statusCharCount / 2) ?? 0); // 😁
    }

    if (!lastPost.hasMedia) {
      if (lastPost.card) {
        this.transform += (199.7 + (statusCharCount / 2) ?? 0);
      } else if (lastPost.poll) {
        this.transform += ((64.7 + (lastPost.poll.answers.length * 100)) + (lastPost.poll.question.length / 2) ?? 0);
      } else if (IsVideoPipe.isYoutube(lastPost.status) || IsVideoPipe.isTwitch(lastPost.status) || IsVideoPipe.isTwitchClip(lastPost.status)) {
        this.transform += (409.7 + (statusCharCount / 2) ?? 0);
      } else {
        this.transform += (120.7 + (statusCharCount / 2) ?? 0);
      }

    }

    this.transformBuffer.emit(this.transform);
    return this.transform;
  }

  handleVote() {
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
    //         this.userRating = ratingObject.type === true ? 'like' : 'none';
    //
    //         this.updateLikeStuff(this.userRating);
    //       }
    //     },
    //
    //      err => this.notifier.danger(err.message, 'Error')
    //   );
  }

  private setRating(nextRating: UserVideoRateType) {
    const ratingMethods: { [id in UserVideoRateType]: (id: number) => Observable<any> } = {
      like: this.postService.setVideoLike,
      dislike: this.postService.setVideoDislike,
      none: this.postService.unsetVideoLike,
    };

    ratingMethods[nextRating].call(this.postService, this.post.id)
      .subscribe(
        () => {
          // Update the video like attribute
          this.updateVideoRating(this.userRating, nextRating);
          this.userRating = nextRating;
        },

        (err: { message: string }) => this.notifier.danger(err.message, 'Error')
      );
  }

  private updateVideoRating(oldRating: UserVideoRateType, newRating: UserVideoRateType) {
    let likesToIncrement = 0;
    let dislikesToIncrement = 0;

    if (oldRating) {
      if (oldRating === 'like') likesToIncrement--;
      if (oldRating === 'dislike') dislikesToIncrement--;
    }

    if (newRating === 'like') likesToIncrement++;

    if (newRating === 'dislike') dislikesToIncrement++;

    this.post.favoriteCount += likesToIncrement;
    this.post.dislikeCount += dislikesToIncrement;

    useAnimation(slideInTop, {params: {duration: '1000ms'}});

    this.updateLikeStuff(newRating);

    // this.post.buildLikeAndDislikePercents();
    // this.setVideoLikesBarTooltipText();
  }

  private async setStatusTextHTML() {
    if (!this.post.status) {
      return;
    }

    // Before HTML rendering restore line feed for markdown list compatibility
    const commentText = this.post.status.replace(/<br.?\/?>/g, '\r\n');
    const html = await this.markdownService.textMarkdownToHTML(commentText, true, true);
    this.statusHTMLText = this.markdownService.processVideoTimestamps(this.post.user.screenName, this.post.id, html);
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

  private updateShareStuff(reposted: boolean) {
    if (reposted) {
      this.faShare = faShareSolid;
      this.tooltipRepost = 'Undo Repost';
    } else {
      this.faShare = faShare;
      this.tooltipRepost = 'Repost';
    }
  }

  isARepost(post: Post) {
    return this.post.repost !== null && typeof post.repost === 'object';
  }

  videoId: string;
  embedUrl: string;

  public getVideoEmbedLink() {
    if (IsVideoPipe.isYoutube(this.post.status)) {
      const parts = IsVideoPipe._youtubeRegEx.exec(this.post.status);
      if (this.videoId && this.videoId === parts[5]) {
        return true;
      }

      this.videoId = parts[5];
      this.embedUrl = IsVideoPipe.getYoutubeEmbedLink(this.post.status);
      return true;
    } else if (IsVideoPipe.isTwitch(this.post.status)) {
      const parts = IsVideoPipe._twitchRegEx.exec(this.post.status);
      if (this.videoId && this.videoId === parts[3]) {
        return true;
      }

      this.videoId = parts[3];
      this.embedUrl = IsVideoPipe.getTwitchEmbedLink(this.post.status);
      return true;
    } else if (IsVideoPipe.isTwitchClip(this.post.status)) {
      const parts = IsVideoPipe._twitchClipRegEx.exec(this.post.status);
      if (!parts[2].includes('clip')) {
        return false;
      }

      this.embedUrl = IsVideoPipe.getTwitchClipEmbedLink(this.post.status);
      return true;
    }

    return false;
  }

}
