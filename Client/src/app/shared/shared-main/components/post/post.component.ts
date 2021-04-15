import {Component, Input, OnInit} from '@angular/core';
import {UserStore} from "../../../../core/stores/user.store";
import {UserVideoRateType} from "../../../posts/models/rate/user-video-rate.type";
import {Observable, Subject} from "rxjs";
import {PostsService} from "../../../posts/posts.service";
import {PostDetails} from "../../post/post-details.model";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {Notifier} from "../../../../core/notification/notifier.service";
import {takeUntil} from "rxjs/operators";
import {IUser} from "../../../../core/interfaces/common/users";
import {NbDialogService} from "../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {UploadComponent} from "../../../../pages/modal-overlays/dialog/compose/upload/upload.component";
import {MarkdownService} from "../../../../core/renderer/markdown.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public transform: number = 0;
  @Input() public hasText = false;
  @Input() public hasMedia = false;
  @Input() public mediaUrl: string;
  @Input() public isPoll: boolean;
  @Input() post: PostDetails = null;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private domSanitizer: DomSanitizer, private userStore: UserStore, private postService: PostsService, private dialogService: NbDialogService, private markdownService: MarkdownService) {
    this.tooltipLike = `Like`;
    this.tooltipDislike = `Dislike`;
  }



  ngOnInit(): void {
    if(this.post.entities.medias) {
      this.picture = this.post.entities.medias[0].displayURL;
      this.mediaUrl = this.post.entities.medias[0].displayURL;
    }



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

    // this.init();

      this.buildVideoLink();
  }

  sanitizedCommentHTML = '';



  meatballsMenu = this.getMenuItems();

  imageBackgroundStyle: SafeStyle;

  public userRating: UserVideoRateType = null;

  public tooltipLike = '';
  public tooltipDislike = '';

  getMenuItems() {
    const userLink = this.post?.user ? '/admin/users/current/' : '';
    const screenName = this.post?.user?.screenName;
    return [
      {title: `Follow ${screenName}`, link: userLink, queryParams: {profile: true}},
      {title: `Mute ${screenName}`, link: '/auth/logout'},
      {title: `Block ${screenName}`, link: '/auth/logout'},
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

  private checkUserRating() {
    // Unlogged users do not have ratings
    if (this.isUserLoggedIn() === false) {
      return;
    }

    this.postService.getUserVideoRating(this.post.id)
      .subscribe(
        ratingObject => {
          if (ratingObject) {
            this.userRating = ratingObject.type;
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

    // this.post.buildLikeAndDislikePercents();
    // this.setVideoLikesBarTooltipText();
  }

  private async init() {
    // Before HTML rendering restore line feed for markdown list compatibility
    const postText = this.post.text.replace(/<br.?\/?>/g, '\r\n');
    const html = await this.markdownService.textMarkdownToHTML(postText, true, true);
    // this.sanitizedCommentHTML = await this.markdownService.processVideoTimestamps(html);
    this.sanitizedCommentHTML = html;


  }

}