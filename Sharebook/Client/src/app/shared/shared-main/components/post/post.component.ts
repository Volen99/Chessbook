import {Component, Input, OnInit} from '@angular/core';
import {UserStore} from "../../../../core/stores/user.store";
import {UserVideoRateType} from "../../../posts/models/rate/user-video-rate.type";
import {Observable} from "rxjs";
import {PostsService} from "../../../posts/posts.service";
import {PostDetails} from "../../post/post-details.model";

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
  @Input() post: PostDetails = null;

  constructor(private userStore: UserStore, private postService: PostsService) {
    this.tooltipLike = `Like`;
    this.tooltipDislike = `Dislike`;
  }

  ngOnInit(): void {
  }

  userMenu = this.getMenuItems();

  public userRating: UserVideoRateType = null;

  public tooltipLike = '';
  public tooltipDislike = '';

  public isCommentIconHovered = false;
  public isLikeIconHovered = false;
  public isRetweetIconHovered = false;
  public isAddToBookmarkIconHovered = false;

  getMenuItems() {
    const userLink = this.post?.user ?  '/admin/users/current/' : '';
    return [
      { title: 'Profile', link: userLink, queryParams: { profile: true } },
      { title: 'Log out', link: '/auth/logout' },
    ];
  }

  handleCommentIconHover(event: MouseEvent) {
    this.isCommentIconHovered = !this.isCommentIconHovered;
  }

  handleLikeIconHover(event: MouseEvent) {
    this.isLikeIconHovered = !this.isLikeIconHovered;
  }

  handleRetweetIconHover(event: MouseEvent) {
    this.isRetweetIconHovered = !this.isRetweetIconHovered;
  }

  handleAddToBookmarkIconHover(event: MouseEvent) {
    this.isAddToBookmarkIconHovered = !this.isAddToBookmarkIconHovered;
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

  isUserLoggedIn() {
    return !!this.userStore.getUser();
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
}
