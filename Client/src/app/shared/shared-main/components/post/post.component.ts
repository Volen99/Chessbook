import {Component, Input, OnInit} from '@angular/core';
import {UserStore} from "../../../../core/stores/user.store";
import {UserVideoRateType} from "../../../posts/models/rate/user-video-rate.type";
import {Observable, Subject} from "rxjs";
import {PostsService} from "../../../posts/posts.service";
import {PostDetails} from "../../post/post-details.model";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {Notifier} from "../../../../core/notification/notifier.service";
import {filter, map, takeUntil} from "rxjs/operators";
import {IUser} from "../../../../core/interfaces/common/users";
import {NbDialogService} from "../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {UploadComponent} from "../../../../pages/modal-overlays/dialog/compose/upload/upload.component";
import {MarkdownService} from "../../../../core/renderer/markdown.service";
import {environment} from "../../../../../environments/environment";
import {faAlarmExclamation} from '@fortawesome/pro-solid-svg-icons';
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

} from '@fortawesome/pro-light-svg-icons';
import {faHeart as faHeartSolid, faShare as faShareSolid, faLockAlt} from '@fortawesome/pro-solid-svg-icons';
import {NbMenuService} from "../../../../sharebook-nebular/theme/components/menu/menu.service";
import {IPost} from "../../../posts/models/tweet";
import {Post} from "../../post/post.model";
import {MediaModalComponent} from "../../../../features/media-modal/media-modal.component";
import {ModalRootComponent} from "../../../../features/modal-root/modal-root.component";
import {MediaContainerComponent} from "../../../../features/media-container/media-container.component";
import {Router} from "@angular/router";
import {PeerTubeSocket} from "../../../../core/notification/sharebook-socket.service";


export interface ISocialContextProps {
  screenName: string;
  displayName: string;
  faIcon: IconDefinition;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public transform: number = 0;
  @Input() public hasText = false;
  @Input() public hasMedia = false;
  @Input() public isPoll: boolean;
  @Input() public isReshare: boolean;
  @Input() post: PostDetails = null;
  @Input() removeVideoFromArray: (post: Post) => any;

  private destroy$: Subject<void> = new Subject<void>();

  faAlarmExclamation: IconDefinition;

  oldPost: PostDetails;

  constructor(private router: Router,
              private domSanitizer: DomSanitizer,
              private userStore: UserStore,
              private postService: PostsService,
              private dialogService: NbDialogService,
              private markdownService: MarkdownService,
              protected notifier: Notifier,
              private socket: PeerTubeSocket,
              ) {
    this.tooltipDislike = `Dislike`;

    this.faAlarmExclamation = faAlarmExclamation;
  }


  ngOnInit(): void {
    this.oldPost = this.post;

    if (this.isReshare) {
      this.socialContextProps = {
        screenName: this.post.user.screenName,
        displayName: this.post.user.displayName,
        faIcon: this.faShare,
      };

      // @ts-ignore
      this.post = this.post.resharedStatus;
    }

    // by mi
    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: IUser) => {
        // this.user = user;
        this.meatballsMenu = this.getMenuItems(user);
      });

    this.checkUserRating();

    this.svgLikeStyles.color = this.userRating === 'like' ? 'blue' : 'inherit';

    // this.init();

    this.buildVideoLink();
  }



  onContecxtItemSelection(title) {
    console.log('click', title);
  }

  socialContextProps: ISocialContextProps;

  sanitizedCommentHTML = '';


  faComment = faComment;
  faShare = faShare;
  faHeart = faHeart;
  faLockAlt = faLockAlt;

  // meatballs menu
  faUserTimes = faUserTimes;
  faUserPlus = faUserPlus;
  faVolumeSlash = faVolumeSlash;
  faCode = faCode;
  faFlag = faFlag;
  faTrashAlt = faTrashAlt;

  svgLikeStyles = {
    'color': 'inherit',    // blue is such a beautiful color 💙
  };

  meatballsMenu: any;

  imageBackgroundStyle: SafeStyle;

  public userRating: UserVideoRateType = null;
  test: boolean;
  public tooltipLike = '';
  public tooltipDislike = '';

  getMenuItems(userCurrent: IUser) {

    if (this.post?.user?.id === userCurrent.id) {
      return [
        {icon: this.faTrashAlt, title: `Delete`, link: '#'}
      ];
    }

    const userLink = this.post?.user ? '/admin/users/current/' : '';
    const screenName = this.post?.user?.screenName;
    return [
      {icon: this.faUserPlus, title: `Follow ${screenName}`, link: userLink, queryParams: {profile: true}},
      {icon: this.faVolumeSlash, title: `Mute ${screenName}`, link: '#'},
      {icon: this.faUserTimes, title: `Block ${screenName}`, link: '#'},
      {icon: this.faCode, title: `Embed Post`, link: '#'},
      {icon: this.faFlag, title: `Report Post`, link: '#'},
    ];
  }

  @Input()
  set picture(value: string) {
    this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  getSaveStyle(value: string) {
    return this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  setLike() {
    this.test = !this.test;
    if (this.isUserLoggedIn() === false) {
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

  handleReplyButton(post: PostDetails) {
    this.dialogService.open(UploadComponent, { // ShowcaseDialogComponent
      context: {
        title: 'This is a title passed to the dialog component',
        replyPost: post,
      },
    });
  }

  async handleReshareButton(post: PostDetails) {
    // just for test
    if (this.post.reshared) {
      this.deletePost(this.oldPost.id, true);

      this.post.reshareCount -= 1;
      this.post.reshared = false;
      return;
    }

    let res = await this.postService.publishRetweetAsync(this.post.id);

    this.post.reshareCount += 1;
    this.post.reshared = true;

    this.updateShareStuff();
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

    // if (this.videoLinkType === 'external') {
    //   this.videoRouterLink = null;
    //   this.videoHref = this.video.url;
    //   this.videoTarget = '_blank';
    //   return
    // }
    //
    // // Lazy load
    // this.videoRouterLink = [ '/search/lazy-load-video', { url: this.video.url } ]
  }

  getVideoRouterLink() {
    if (this.videoRouterLink) {
      return this.videoRouterLink;
    }

    return this.post.url;

    // return [ '/videos/watch', this.post.uuid ];
  }

  async deletePost(postId: number, unshare: boolean) {
    await this.postService.destroyTweetAsync(postId, unshare)
      .then((data) => {
      });

    this.notifier.success(`Post ${this.oldPost.id} deleted.`);
    this.removeVideoFromArray(this.oldPost);
  }

  handleOpenMedia(media, index) {
    // const reactComponents = document.querySelectorAll('[data-component]');
    //
    // import('../../../../features/media-container/media-container.component')
    //   .then(( {MediaContainerComponent} ) => {
    //     [].forEach.call(reactComponents, (component) => {
    //       [].forEach.call(component.children, (child) => {
    //         component.removeChild(child);
    //       });
    //     });
    //
    //     const content = document.createElement('div');
    //
    //     // ReactDOM.render(<MediaContainer locale={locale} components={reactComponents} />, content);
    //     document.body.appendChild(content);
    //     // scrollToDetailedStatus();
    //
    //     debugger
    //
    //   })
    //   .catch(error => {
    //     console.error(error);
    //    // scrollToDetailedStatus();
    //   });

    this.dialogService.open(MediaContainerComponent, {
      context: {
        media,
        index,
      },

    });

  }

  handleExpandClick() {
    this.router.navigate([`/${this.post.user.screenName}/post`, this.post.id]);
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
            this.userRating = ratingObject.type === true ? 'like' : 'none';

            this.updateLikeStuff(this.userRating);
          }
        },

        // err => this.notifier.error(err.message)
      );
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


  private async init() {
    // Before HTML rendering restore line feed for markdown list compatibility
    const postText = this.post.status.replace(/<br.?\/?>/g, '\r\n');
    const html = await this.markdownService.textMarkdownToHTML(postText, true, true);
    // this.sanitizedCommentHTML = await this.markdownService.processVideoTimestamps(html);
    this.sanitizedCommentHTML = html;

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

  private updateShareStuff() {
    this.faShare = faShareSolid;
  }

}
