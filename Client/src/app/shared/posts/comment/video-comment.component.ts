import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from "@angular/core";

import {Post} from "../../shared-main/post/post.model";
import {PostComment} from "../../shared-post-comment/post-comment";
import {CommentReportComponent} from "../../moderation/report-modals/comment-report.component";
import {PostCommentThreadTree} from "../../shared-post-comment/video-comment-thread-tree.model";
import {DropdownAction} from "../../shared-main/buttons/action-dropdown.component";
import {IUser} from "../../../core/interfaces/common/users";
import {Notifier} from "../../../core/notification/notifier.service";
import {UsersService} from "../../../core/backend/common/services/users.service";
import {AuthService} from "../../../core/auth/auth.service";
import {MarkdownService} from "../../../core/renderer/markdown.service";
import {UserRight} from "../../models/users/user-right.enum";
import {User} from "../../shared-main/user/user.model";

import {
  faFlag,
  faTrashAlt,
  faPen,
} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-video-comment',
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
    private authService: AuthService,
    private usersService: UsersService,
    private notifier: Notifier) {
  }

  get user() {
    return this.authService.getUser();
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  faFlag = faFlag;
  faTrashAlt = faTrashAlt;
  faPen = faPen;

  onCommentReplyCreated(createdComment: PostComment) {
    if (!this.commentTree) {
      this.commentTree = {
        comment: this.comment,
        children: []
      };

      this.threadCreated.emit(this.commentTree);
    }

    this.commentTree.children.unshift({
      comment: createdComment,
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
    return this.authService.isLoggedIn();
  }

  onResetReply() {
    this.resetReply.emit();
  }

  handleTimestampClicked(timestamp: number) {
    this.timestampClicked.emit(timestamp);
  }

  isRemovableByUser() {
    return this.comment.user && this.isUserLoggedIn() &&
      (
        this.user.id === this.comment.user.id ||
        this.user.id === this.video.user.id ||
        this.user.hasRight(UserRight.REMOVE_ANY_VIDEO_COMMENT)
      );
  }

  isRedraftableByUser() {
    return (
      this.comment.user &&
      this.isUserLoggedIn() &&
      this.user.id === this.comment.user.id &&
      this.comment.totalReplies === 0
    );
  }

  isReportableByUser() {
    return (
      this.comment.user &&
      this.isUserLoggedIn() &&
      this.comment.isDeleted === false &&
      this.user.id !== this.comment.user.id
    );
  }

  switchToDefaultAvatar($event: Event) {
    ($event.target as HTMLImageElement).src = User.GET_DEFAULT_AVATAR_URL();
  }

  isNotDeletedOrDeletedWithReplies() {
    return !this.comment.isDeleted || this.comment.isDeleted && this.comment.totalReplies !== 0;
  }

  private getUserIfNeeded(account: User) {
    if (!account.id) return;
    if (!this.authService.isLoggedIn()) return;

    const user = this.authService.getUser();
    if (user.hasRight(UserRight.MANAGE_USERS)) {
      this.usersService.getUserWithCache(account.id)
        .subscribe(
          user => this.commentUser = user,

          err => this.notifier.error(err.message)
        );
    }
  }

  private async init() {
    // Before HTML rendering restore line feed for markdown list compatibility
    const commentText = this.comment.text.replace(/<br.?\/?>/g, '\r\n');
    const html = await this.markdownService.textMarkdownToHTML(commentText, true, true);
    this.sanitizedCommentHTML = await this.markdownService.processVideoTimestamps(html);
    this.newParentComments = this.parentComments.concat([this.comment]);

    if (this.comment.user) {
      this.commentAccount = new User(this.comment.user);
      this.getUserIfNeeded(this.commentAccount);
    } else {
      this.comment.user = null;
    }

    this.prependModerationActions = [];

    if (this.isReportableByUser()) {
      this.prependModerationActions.push({
        label: `Report this comment`,
        iconName: this.faFlag,
        handler: () => this.showReportModal()
      });
    }

    if (this.isRemovableByUser()) {
      this.prependModerationActions.push({
        label: `Remove`,
        iconName: this.faTrashAlt,
        handler: () => this.onWantToDelete()
      });
    }

    if (this.isRedraftableByUser()) {
      this.prependModerationActions.push({
        label: `Remove & re-draft`,
        iconName: this.faPen,
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
