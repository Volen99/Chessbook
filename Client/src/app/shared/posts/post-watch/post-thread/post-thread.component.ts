import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

import {faHeart as faHeartSolid, faLock} from "@fortawesome/pro-solid-svg-icons";
import {
  faComment,
  faShare,
  faHeart,
} from '@fortawesome/pro-light-svg-icons';

import {PostDetails} from "../../../shared-main/post/post-details.model";
import {UserStore} from "../../../../core/stores/user.store";
import {PostsService} from "../../posts.service";
import {NbDialogService} from "../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {MarkdownService} from "../../../../core/renderer/markdown.service";
import {IUser} from "../../../../core/interfaces/common/users";
import {UserVideoRateType} from "../../models/rate/user-video-rate.type";
import {UploadComponent} from "../../../../pages/modal-overlays/dialog/compose/upload/upload.component";
import {LikesComponent} from "../likes/likes.component";
import {NbToastrService} from "../../../../sharebook-nebular/theme/components/toastr/toastr.service";


@Component({
  selector: 'app-post-thread',
  templateUrl: './post-thread.component.html',
  styleUrls: ['./post-thread.component.scss']
})
export class PostThreadComponent implements OnInit {
  @Input() public transform: number = 0;
  @Input() public mediaUrl: string;
  @Input() post: PostDetails = null;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private domSanitizer: DomSanitizer,
              private userStore: UserStore,
              private postService: PostsService,
              private dialogService: NbDialogService,
              private markdownService: MarkdownService,
              private notifier: NbToastrService,
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
        // this.user = user;
        this.meatballsMenu = this.getMenuItems();
      });

    this.checkUserRating();

    this.svgLikeStyles.color = this.userRating === 'like' ? 'blue' : 'inherit';

    this.setStatusTextHTML();

    this.buildVideoLink();
  }

  getSaveStyle(value: string) {
    return this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  faComment = faComment;
  faShare = faShare;
  faHeart = faHeart;
  faLock = faLock;

  style = {height: 0};

  sanitizedCommentHTML = '';

  svgLikeStyles = {
    'color': 'inherit',    // blue is such a beautiful color 💙
  };

  statusHTMLText = '';
  meatballsMenu = this.getMenuItems();

  imageBackgroundStyle: SafeStyle;

  public userRating: UserVideoRateType = null;

  public tooltipLike = '';
  public tooltipDislike = '';

  getMenuItems() {
    return [
      {title: `Embed Post`, link: '/auth/logout'},
      {title: `Report Post`, link: '/auth/logout'},
    ];
  }

  @Input()
  set picture(value: string) {
    this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  setLike() {
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

  isUserLoggedIn() {
    return !!this.userStore.getUser();
  }

  videoRouterLink: any[] = [];

  buildVideoLink () {
    if (!this.post.url) {
      this.videoRouterLink = [ `/${this.post.user.screenName}/post`, this.post.id ];

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

  getVideoRouterLink () {
    if (this.videoRouterLink) {
      return this.videoRouterLink;
    }

    return this.post.url;

    // return [ '/videos/watch', this.post.uuid ];
  }

  open() {
    this.dialogService.open(LikesComponent, {
      context: {
        postId: this.post.id,
        title: 'Liked by'
      },
      closeOnEsc: true,
      closeOnBackdropClick: true,
    });
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

  private async setStatusTextHTML () {
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

}
