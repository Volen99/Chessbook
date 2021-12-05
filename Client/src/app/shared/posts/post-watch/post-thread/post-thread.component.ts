import {ActivatedRoute, Router} from "@angular/router";
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

import {
  faComment,
  faShare,
  faHeart,
  faSatelliteDish,
  faLongArrowLeft,
  faUserTimes,
  faUserPlus,
  faVolumeSlash,
  faCode,
  faFlag,
  faTrashAlt,
  faThumbtack,
  faBan,
  faCircle,
  faExpand,
  faSignInAlt,
} from '@fortawesome/pro-light-svg-icons';

import {
  faHeart as faHeartSolid,
  faLock, faShare as faShareSolid,
} from "@fortawesome/pro-solid-svg-icons";

import {PostDetails} from "../../../shared-main/post/post-details.model";
import {UserStore} from "../../../../core/stores/user.store";
import {PostsService} from "../../posts.service";
import {NbDialogService} from "../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {MarkdownService} from "../../../../core/renderer/markdown.service";
import {IUser} from "../../../../core/interfaces/common/users";
import {UserVideoRateType} from "../../models/rate/user-video-rate.type";
import {LikesComponent} from "../likes/likes.component";
import {NbToastrService} from "../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {AppInjector} from "../../../../app-injector";
import {MediaContainerComponent} from "../../../../features/media-container/media-container.component";
import {NbLayoutScrollService} from "../../../../sharebook-nebular/theme/services/scroll.service";
import {IsVideoPipe} from "../../../shared-main/angular/pipes/is-video.pipe";
import {Post} from "../../../shared-main/post/post.model";
import {VideoShareComponent} from "../../../shared-share-modal/video-share.component";
import {PopoverMoreComponent} from "../../../shared-main/components/post/popover-more-component/popover-more.component";


@Component({
  selector: 'app-post-thread',
  templateUrl: './post-thread.component.html',
  styleUrls: ['./post-thread.component.scss'],
  animations: [
    trigger('likeAnimation', [
      transition('inactive => active', [
        query(':self', style({transform: 'scale(1.0)'})),
        query(':self',
          stagger('0ms linear', [
            animate('150ms linear', style({transform: 'scale(1.9)'}))
          ]))
      ])
    ])
  ]
})
export class PostThreadComponent implements OnInit {
  @Input() public transform: number = 0;
  @Input() public mediaUrl: string;
  @Input() post: PostDetails = null;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private domSanitizer: DomSanitizer,
              private userStore: UserStore,
              private postService: PostsService,
              private dialogService: NbDialogService,
              private markdownService: MarkdownService,
              private notifier: NbToastrService,
              private scrollService: NbLayoutScrollService,
              private route: ActivatedRoute,
              private hotkeysService: HotkeysService
  ) {
    this.tooltipLike = `Like`;
    this.tooltipDislike = `Dislike`;
  }

  ngOnInit(): void {
    // by mi
    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: IUser) => {
        // // this.user = user;
        // this.meatballsMenu = this.getMenuItems();
      });

    this.checkUserRating();
    this.updateRepostStuff(this.post.reposted);

    this.tooltipShare = 'Share';
    this.tooltipComment = 'Comment';

    this.svgLikeStyles.color = this.userRating === 'like' ? 'blue' : 'inherit';

    this.meatballsMenu = this.getMenuItems();

    this.setStatusTextHTML();

    this.buildVideoLink();

    this.route.queryParams
      .subscribe(params => {
        const scroll = params.withScroll || '';

        if (scroll === 'true') {
          // this.scrollService.scrollTo(0, document.body.scrollHeight);
          this.containerElement.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      });

    this.hotkeysService.add([
      new Hotkey('l', (event: KeyboardEvent): boolean => {
        this.setLike();
        return false; // Prevent bubbling
      }, undefined, undefined)]);

  }

  popoverMoreComponent = PopoverMoreComponent;

  getSaveStyle(value: string) {
    return this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
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

  faComment = faComment;
  faShare = faShare;
  faHeart = faHeart;
  faLock = faLock;
  faSatelliteDish = faSatelliteDish;
  faLongArrowLeft = faLongArrowLeft;

  style = {height: 0};

  // meatballs menu
  faUserTimes = faUserTimes;
  faUserPlus = faUserPlus;
  faCode = faCode;
  faFlag = faFlag;
  faTrashAlt = faTrashAlt;
  faBan = faBan;
  faCircle = faCircle;
  faExpand = faExpand;
  faSignInAlt = faSignInAlt;

  svgLikeStyles = {
    'color': 'inherit',    // blue is such a beautiful color 💙
  };

  statusHTMLText = '';
  meatballsMenu: any;

  imageBackgroundStyle: SafeStyle;

  tooltipRepost = '';
  tooltipShare = '';
  tooltipComment = '';

  public userRating: UserVideoRateType = null;

  public tooltipLike = '';
  public tooltipDislike = '';

  getMenuItems() {
    let userCurrent = this.userStore.getUser();

    if (!userCurrent) {
      return [
        {icon: this.faSignInAlt, title: `You need to log in`, link: '#'},
      ];
    }

    if (this.post?.user?.id === userCurrent.id) {
      let pinOrUnpinText = !this.post.pinned ? 'Pin to your profile' : 'Unpin from profile';
      return [
        {icon: this.faTrashAlt, title: `Delete`, link: '#'},
        {icon: faThumbtack, title: pinOrUnpinText, link: '#'},
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
      {icon: this.faCode, title: `Embed Post`, link: '#'},
      {icon: this.faFlag, title: `Report Post`, link: '#'},
    ];
  }

  @Input()
  set picture(value: string) {
    this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  setLike() {
    if (!this.isUserLoggedIn()) {
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

    return ['/posts/watch', this.post.id];
  }

  open(type: 'likes' | 'reposts') {
    this.dialogService.open(LikesComponent, {
      context: {
        postId: this.post.id,
        title: type === 'likes' ? 'Liked by' : 'Reposted by',
        type: type,
      },
      closeOnEsc: true,
      closeOnBackdropClick: true,
    });
  }

  @ViewChild('container', {static: true}) containerElement: ElementRef;
  handleReplyButton(post: Post) {
    if (!this.userStore.isLoggedIn()) {
      this.notifier.warning('', 'You need to be logged in to reply'); // TODO: GroupBy them kk
      return;
    }

    // Scroll to textarea
    this.containerElement.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
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

          this.updateRepostStuff(this.post.reposted);
        });
    } else {
      this.postService.repost(this.post.id)
        .subscribe((data: Post) => {
          // The reblog API method returns a new status wrapped around the original. In this case we are only
          // interested in how the original is modified, hence passing it skipping the wrapper

          this.post.repostCount += 1;
          this.post.reposted = true;
          this.updateRepostStuff(this.post.reposted);
        });
    }

  }

  showShareModal() {
    this.dialogService.open(VideoShareComponent, {
      context: {
        // @ts-ignore
        video: this.post,
        playlistPosition: 0,
      }
    });
    /*this.videoShareModal.show(0, 0);*/
  }

  preventDefault(event: any) {
    event.preventDefault();
    return;
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
    //     err => this.notifier.danger(err.message)
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

        // (err: { message: string }) => this.notifier.error(err.message)
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

  private updateRepostStuff(reposted: boolean) {
    if (reposted) {
      this.faShare = faShareSolid;
      this.tooltipRepost = 'Undo Repost';
    } else {
      this.faShare = faShare;
      this.tooltipRepost = 'Repost';
    }
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
