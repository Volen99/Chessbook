import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {CommentReportComponent} from "../../../shared/shared-moderation/report-modals/comment-report.component";
import {Video} from "../../../shared/main/video/video.model";
import {VideoComment} from "../../../shared/shared-video-comment/video-comment.model";
import {VideoCommentThreadTree} from "../../../shared/shared-video-comment/video-comment-thread-tree.model";
import {DropdownAction} from "../../../shared/main/buttons/action-dropdown.component";
import {User} from "../../../shared/models/users/user.model";
import {MarkdownService} from "../../../core/renderer/markdown.service";
import {AuthService} from "../../../core/auth/auth.service";
import {UserService} from "../../../core/users/user.service";
import {Notifier} from "../../../core/notification/notifier-service";
import {UserRight} from "../../../shared/models/users/user-right.enum";
import {Account} from '../../../shared/models/actors/account.model';

@Component({
  selector: 'my-video-comment',
  templateUrl: './video-comment.component.html',
  styleUrls: ['./video-comment.component.scss']
})
export class VideoCommentComponent implements OnInit, OnChanges {
  @ViewChild('commentReportModal') commentReportModal: CommentReportComponent;

  @Input() video: Video;
  @Input() comment: VideoComment;
  @Input() parentComments: VideoComment[] = [];
  @Input() commentTree: VideoCommentThreadTree;
  @Input() inReplyToCommentId: number;
  @Input() highlightedComment = false;
  @Input() firstInThread = false;
  @Input() redraftValue?: string;

  @Output() wantedToReply = new EventEmitter<VideoComment>();
  @Output() wantedToDelete = new EventEmitter<VideoComment>();
  @Output() wantedToRedraft = new EventEmitter<VideoComment>();
  @Output() threadCreated = new EventEmitter<VideoCommentThreadTree>();
  @Output() resetReply = new EventEmitter();
  @Output() timestampClicked = new EventEmitter<number>();

  prependModerationActions: DropdownAction<any>[];

  sanitizedCommentHTML = '';
  newParentComments: VideoComment[] = [];

  commentAccount: Account;
  commentUser: User;

  constructor(
    private markdownService: MarkdownService,
    private authService: AuthService,
    private userService: UserService,
    private notifier: Notifier,
  ) {
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

  onCommentReplyCreated(createdComment: VideoComment) {
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

  onWantToReply(comment?: VideoComment) {
    this.wantedToReply.emit(comment || this.comment);
  }

  onWantToDelete(comment?: VideoComment) {
    this.wantedToDelete.emit(comment || this.comment);
  }

  onWantToRedraft(comment?: VideoComment) {
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
    return this.comment.account && this.isUserLoggedIn() &&
      (
        this.user.account.id === this.comment.account.id ||
        this.user.account.id === this.video.account.id ||
        this.user.hasRight(UserRight.REMOVE_ANY_VIDEO_COMMENT)
      );
  }

  isRedraftableByUser() {
    return (
      this.comment.account &&
      this.isUserLoggedIn() &&
      this.user.account.id === this.comment.account.id &&
      this.comment.totalReplies === 0
    );
  }

  isReportableByUser() {
    return (
      this.comment.account &&
      this.isUserLoggedIn() &&
      this.comment.isDeleted === false &&
      this.user.account.id !== this.comment.account.id
    );
  }

  switchToDefaultAvatar($event: Event) {
    ($event.target as HTMLImageElement).src = Account.GET_DEFAULT_AVATAR_URL();
  }

  isNotDeletedOrDeletedWithReplies() {
    return !this.comment.isDeleted || this.comment.isDeleted && this.comment.totalReplies !== 0;
  }

  private getUserIfNeeded(account: Account) {
    if (!account.userId) {
      return;
    }
    if (!this.authService.isLoggedIn()) {
      return;
    }

    const user = this.authService.getUser();
    if (user.hasRight(UserRight.MANAGE_USERS)) {
      this.userService.getUserWithCache(account.userId)
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

    if (this.comment.account) {
      this.commentAccount = new Account(this.comment.account);
      this.getUserIfNeeded(this.commentAccount);
    } else {
      this.comment.account = null;
    }

    this.prependModerationActions = [];

    if (this.isReportableByUser()) {
      this.prependModerationActions.push({
        label: $localize`Report this comment`,
        iconName: 'flag',
        handler: () => this.showReportModal()
      });
    }

    if (this.isRemovableByUser()) {
      this.prependModerationActions.push({
        label: $localize`Remove`,
        iconName: 'delete',
        handler: () => this.onWantToDelete()
      });
    }

    if (this.isRedraftableByUser()) {
      this.prependModerationActions.push({
        label: $localize`Remove & re-draft`,
        iconName: 'edit',
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
