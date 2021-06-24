import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';

import {
  faFlag,
  faTrash,
  faEdit,
} from '@fortawesome/pro-light-svg-icons';

import {CommentReportComponent} from "../../../../shared-moderation/report-modals/comment-report.component";
import {Post} from "../../../../shared-main/post/post.model";
import {PostComment} from "../../../../shared-post-comment/post-comment-model";
import {PostCommentThreadTree} from "../../../../shared-post-comment/video-comment-thread-tree.model";
import {DropdownAction} from "../../../../shared-main/buttons/action-dropdown.component";
import {IUser} from "../../../../../core/interfaces/common/users";
import {MarkdownService} from "../../../../../core/renderer/markdown.service";
import {NbToastrService} from "../../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {UsersService} from "../../../../../core/backend/common/services/users.service";
import {UserRight} from "../../../../models/users/user-right.enum";
import {User} from "../../../../shared-main/user/user.model";
import {UserStore} from "../../../../../core/stores/user.store";

@Component({
  selector: 'my-video-comment',
  templateUrl: './video-comment.component.html',
  styleUrls: ['./video-comment.component.scss']
})
export class VideoCommentComponent implements OnInit, OnChanges {
  @ViewChild('commentReportModal') commentReportModal: CommentReportComponent;

  @Input() video: Post;
  @Input() comment: PostComment;
  @Input() parentComments: PostComment[] = [];
  @Input() commentTree: PostCommentThreadTree;
  @Input() inReplyToCommentId: number;
  @Input() highlightedComment = false;
  @Input() firstInThread = false;
  @Input() redraftValue?: string;

  @Output() wantedToReply = new EventEmitter<PostComment>();
  @Output() wantedToDelete = new EventEmitter<PostComment>();
  @Output() wantedToRedraft = new EventEmitter<PostComment>();
  @Output() threadCreated = new EventEmitter<PostCommentThreadTree>();
  @Output() resetReply = new EventEmitter();
  @Output() timestampClicked = new EventEmitter<number>();

  prependModerationActions: DropdownAction<any>[];

  sanitizedCommentHTML = '';
  newParentComments: PostComment[] = [];

  commentAccount: User;
  commentUser: IUser;

  constructor(
    private markdownService: MarkdownService,
    private userStore: UserStore,
    private userService: UsersService,
    private notifier: NbToastrService) {
  }

  get user() {
    return this.userStore.getUser();
  }

  ngOnChanges() {
    this.init();
  }

  ngOnInit() {
    this.init();
  }

  onCommentReplyCreated(createdComment: PostComment) {
    if (!this.commentTree) {
      this.commentTree = {
        comment: this.comment,
        hasDisplayedChildren: false,
        children: []
      };

      this.threadCreated.emit(this.commentTree);
    }

    this.commentTree.children.unshift({
      comment: createdComment,
      hasDisplayedChildren: false,
      children: []
    });

    this.resetReply.emit();

    this.redraftValue = undefined;
  }

  onWantToReply(comment?: PostComment) {
    this.wantedToReply.emit(comment || this.comment);
  }

  onWantToDelete(comment?: PostComment) {
    this.wantedToDelete.emit(comment || this.comment);
  }

  onWantToRedraft(comment?: PostComment) {
    this.wantedToRedraft.emit(comment || this.comment);
  }

  isUserLoggedIn() {
    return this.userStore.isLoggedIn();
  }

  onResetReply() {
    this.resetReply.emit();
  }

  handleTimestampClicked(timestamp: number) {
    this.timestampClicked.emit(timestamp);
  }

  isRemovableByUser() {
    return this.comment.account && this.isUserLoggedIn() &&
      (
        this.user.id === this.comment.account.id ||
        this.user.id === this.video.user.id ||
        this.user.hasRight(UserRight.REMOVE_ANY_VIDEO_COMMENT)
      );
  }

  isRedraftableByUser() {
    return (
      this.comment.account &&
      this.isUserLoggedIn() &&
      this.user.id === this.comment.account.id &&
      this.comment.totalReplies === 0
    );
  }

  isReportableByUser() {
    return (
      this.comment.account &&
      this.isUserLoggedIn() &&
      this.comment.isDeleted === false &&
      this.user.id !== this.comment.account.id
    );
  }

  isCommentDisplayed() {
    // Not deleted
    return !this.comment.isDeleted ||
      this.comment.totalReplies !== 0 || // Or root comment thread has replies
      (this.commentTree?.hasDisplayedChildren); // Or this is a reply that have other replies
  }

  isChild() {
    return this.parentComments.length !== 0;
  }

  private getUserIfNeeded(account: User) {
    if (!account.id) return;
    if (!this.userStore.isLoggedIn()) return;

    const user = this.userStore.getUser();
    if (user.hasRight(UserRight.MANAGE_USERS)) {
      this.userService.getUserWithCache(account.id)
        .subscribe(
          user => this.commentUser = user,

          err => this.notifier.danger(err.message, 'Error')
        );
    }
  }

  private async init() {
    // Before HTML rendering restore line feed for markdown list compatibility
    const commentText = this.comment.text.replace(/<br.?\/?>/g, '\r\n');
    const html = await this.markdownService.textMarkdownToHTML(commentText, true, true);
    this.sanitizedCommentHTML = this.markdownService.processVideoTimestamps(html);
    this.newParentComments = this.parentComments.concat([this.comment]);

    if (this.comment.account) {
      this.commentAccount = new User(this.comment.account);
      this.getUserIfNeeded(this.commentAccount);
    } else {
      this.comment.account = null;
    }

    this.prependModerationActions = [];

    if (this.isReportableByUser()) {
      this.prependModerationActions.push({
        label: `Report this comment`,
        iconName: faFlag,
        handler: () => this.showReportModal()
      });
    }

    if (this.isRemovableByUser()) {
      this.prependModerationActions.push({
        label: `Remove`,
        iconName: faTrash,
        handler: () => this.onWantToDelete()
      });
    }

    if (this.isRedraftableByUser()) {
      this.prependModerationActions.push({
        label: `Remove & re-draft`,
        iconName: faEdit,
        handler: () => this.onWantToRedraft()
      });
    }

    if (this.prependModerationActions.length === 0) {
      this.prependModerationActions = undefined;
    }
  }

  private showReportModal() {
    this.commentReportModal.show();
  }
}
