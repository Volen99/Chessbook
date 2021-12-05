import {DomSanitizer} from '@angular/platform-browser';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import truncate from 'lodash-es/truncate';
import {SortMeta} from 'primeng/api';
import * as debug from 'debug';

import {
  faCommentSmile,
  faEllipsisH,
  faChevronRight,
  faChevronDown,
} from '@fortawesome/pro-light-svg-icons';

import {AbuseMessageModalComponent} from './abuse-message-modal.component';
import {ModerationCommentModalComponent} from './moderation-comment-modal.component';
import {ProcessedAbuse} from './processed-abuse.model';
import {RestTable} from "../../core/rest/rest-table";
import {RestPagination} from "../../core/rest/rest-pagination";
import {DropdownAction} from "../shared-main/buttons/action-dropdown.component";
import {AbuseService} from "../shared-moderation/abuse.service";
import {VideoCommentService} from "../shared-post-comment/video-comment.service";
import {MarkdownService} from "../../core/renderer/markdown.service";
import {ConfirmService} from "../../core/confirm/confirm.service";
import {VideoBlockService} from "../shared-moderation/video-block.service";
import {PostsService} from "../posts/posts.service";
import {BlocklistService} from "../shared-moderation/blocklist.service";
import {AdminAbuse} from "../models/moderation/abuse/abuse.model";
import {AbuseState} from "../models/moderation/abuse/abuse-state.model";
import {environment} from "../../../environments/environment";
import {Post} from "../shared-main/post/post.model";
import {User} from "../shared-main/user/user.model";
import {AdvancedInputFilter} from "../shared-forms/advanced-input-filter.component";
import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";
import {buildVideoOrPlaylistEmbed} from "../../../assets/utils";
import {buildVideoEmbedLink, buildVideoLink, decorateVideoLink} from "../../core/utils/common/url";

const logger = debug('peertube:shared-moderation:AbuseListTableComponent');

@Component({
  selector: 'my-abuse-list-table',
  templateUrl: './abuse-list-table.component.html',
  styleUrls: ['../shared-moderation/moderation.scss', './abuse-list-table.component.scss']
})
export class AbuseListTableComponent extends RestTable implements OnInit {
  @Input() viewType: 'admin' | 'user';

  @ViewChild('abuseMessagesModal', {static: true}) abuseMessagesModal: AbuseMessageModalComponent;
  @ViewChild('moderationCommentModal', {static: true}) moderationCommentModal: ModerationCommentModalComponent;

  abuses: ProcessedAbuse[] = [];
  totalRecords = 0;
  sort: SortMeta = {field: 'createdAt', order: 1};
  pagination: RestPagination = {count: this.rowsPerPage, start: 0};

  abuseActions: DropdownAction<ProcessedAbuse>[][] = [];

  inputFilters: AdvancedInputFilter[] = [
    {
      queryParams: {'search': 'state:pending'},
      label: `Unsolved reports`
    },
    {
      queryParams: {'search': 'state:accepted'},
      label: `Accepted reports`
    },
    {
      queryParams: {'search': 'state:rejected'},
      label: `Refused reports`
    },
    {
      queryParams: {'search': 'videoIs:blacklisted'},
      label: `Reports with blocked videos`
    },
    {
      queryParams: {'search': 'videoIs:deleted'},
      label: `Reports with deleted videos`
    }
  ];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private notifier: NbToastrService,
    private abuseService: AbuseService,
    private blocklistService: BlocklistService,
    private commentService: VideoCommentService,
    private postService: PostsService,
    private videoBlocklistService: VideoBlockService,
    private confirmService: ConfirmService,
    private markdownRenderer: MarkdownService,
    private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.abuseActions = [
      this.buildInternalActions(),

      this.buildFlaggedAccountActions(),

      this.buildCommentActions(),

      this.buildVideoActions(),

      this.buildAccountActions()
    ];

    this.initialize();
  }

  faCommentSmile = faCommentSmile;
  faEllipsisH = faEllipsisH;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  isAdminView() {
    return this.viewType === 'admin';
  }

  getIdentifier() {
    return 'AbuseListTableComponent';
  }

  openModerationCommentModal(abuse: AdminAbuse) {
    this.moderationCommentModal.openModal(abuse);
  }

  onModerationCommentUpdated() {
    this.reloadData();
  }

  isAbuseAccepted(abuse: AdminAbuse) {
    return abuse.state.id === AbuseState.ACCEPTED;
  }

  isAbuseRejected(abuse: AdminAbuse) {
    return abuse.state.id === AbuseState.REJECTED;
  }

  // by mi kk
  isAbusePending(abuse: AdminAbuse) {
    return abuse.state.id === AbuseState.PENDING;
  }

  getVideoUrl(abuse: AdminAbuse) {
    return Post.buildClientUrl(abuse.post.channel.screenName, abuse.post.id);
  }

  getCommentUrl(abuse: AdminAbuse) {
    return Post.buildClientUrl(abuse.comment.video.screenName, abuse.comment.video.id) + ';threadId=' + abuse.comment?.threadId;
  }

  getAccountUrl(abuse: ProcessedAbuse) {
    return '/' + abuse.flaggedAccount.screenName.substring(1);
  }

  getVideoEmbed (abuse: AdminAbuse) {
    return buildVideoOrPlaylistEmbed(
      decorateVideoLink({
        url: buildVideoEmbedLink(abuse.post.channel.screenName, abuse.post.id, environment.apiUrl), // originServerUrl
        title: false,
        warningTitle: false,
        startTime: abuse.post.startAt,
        stopTime: abuse.post.endAt
      }),
      abuse.post.name
    );
  }

  async removeAbuse(abuse: AdminAbuse) {
    // const res = await this.confirmService.confirm(`Do you really want to delete this abuse report?`, `Delete`);
    // if (res === false) return;

    this.abuseService.removeAbuse(abuse).subscribe(
      () => {
        this.notifier.success(`Abuse deleted.`, 'Success');
        this.reloadData();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  updateAbuseState(abuse: AdminAbuse, state: AbuseState) {
    this.abuseService.updateAbuse(abuse, {state})
      .subscribe(
        () => this.reloadData(),

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  onCountMessagesUpdated(event: { abuseId: number, countMessages: number }) {
    const abuse = this.abuses.find(a => a.id === event.abuseId);

    if (!abuse) {
      console.error('Cannot find abuse %d.', event.abuseId);
      return;
    }

    abuse.countMessages = event.countMessages;
  }

  openAbuseMessagesModal(abuse: AdminAbuse) {
    this.abuseMessagesModal.openModal(abuse);
  }

  isLocalAbuse(abuse: AdminAbuse) {
    if (this.viewType === 'user') {
      return true;
    }

    return false;   // Actor.IS_LOCAL(abuse.reporterAccount.host);
  }

  protected reloadData() {
    logger('Loading data.');

    const options = {
      pagination: this.pagination,
      sort: this.sort,
      search: this.search
    };

    const observable = this.viewType === 'admin'
      ? this.abuseService.getAdminAbuses(options)
      : this.abuseService.getUserAbuses(options);

    return observable.subscribe(
      async resultList => {
        this.totalRecords = resultList.total;

        this.abuses = [];

        for (const a of resultList.data) {
          const abuse = a as ProcessedAbuse;

          abuse.reasonHtml = await this.toHtml(abuse.reason);

          if (abuse.moderationComment) {
            abuse.moderationCommentHtml = await this.toHtml(abuse.moderationComment);
          }

          if (abuse.post && !abuse.post.deleted) {
            abuse.embedHtml = this.sanitizer.bypassSecurityTrustHtml(this.getVideoEmbed(abuse));

            if (abuse.post.channel) {
              abuse.post.channel = new User(abuse.post.channel);
            }
          }

          if (abuse.comment) {
            if (abuse.comment.deleted) {
              abuse.truncatedCommentHtml = abuse.commentHtml = `Deleted comment`;
            } else {
              const truncated = truncate(abuse.comment.text, {length: 100});
              abuse.truncatedCommentHtml = await this.markdownRenderer.textMarkdownToHTML(truncated, true);
              abuse.commentHtml = await this.markdownRenderer.textMarkdownToHTML(abuse.comment.text, true);
            }
          }

          if (abuse.reporterAccount) {
            abuse.reporterAccount = new User(abuse.reporterAccount);
          }

          if (abuse.flaggedAccount) {
            abuse.flaggedAccount = new User(abuse.flaggedAccount);
          }

          if (abuse.updatedAt === abuse.createdAt) delete abuse.updatedAt;

          this.abuses.push(abuse);
        }
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  private buildInternalActions(): DropdownAction<ProcessedAbuse>[] {
    return [
      {
        label: `Internal actions`,
        isHeader: true
      },
      {
        label: this.isAdminView()
          ? `Messages with reporter`
          : `Messages with moderators`,
        handler: abuse => this.openAbuseMessagesModal(abuse),
        isDisplayed: abuse => this.isLocalAbuse(abuse)
      },
      {
        label: `Update internal note`,
        handler: abuse => this.openModerationCommentModal(abuse),
        isDisplayed: abuse => this.isAdminView() && !!abuse.moderationComment
      },
      {
        label: `Mark as accepted`,
        handler: abuse => this.updateAbuseState(abuse, AbuseState.ACCEPTED),
        isDisplayed: abuse => this.isAdminView() && !this.isAbuseAccepted(abuse)
      },
      {
        label: `Mark as rejected`,
        handler: abuse => this.updateAbuseState(abuse, AbuseState.REJECTED),
        isDisplayed: abuse => this.isAdminView() && !this.isAbuseRejected(abuse)
      },
      {
        label: `Add internal note`,
        handler: abuse => this.openModerationCommentModal(abuse),
        isDisplayed: abuse => this.isAdminView() && !abuse.moderationComment
      },
      {
        label: `Delete report`,
        handler: abuse => this.isAdminView() && this.removeAbuse(abuse)
      }
    ];
  }

  private buildFlaggedAccountActions(): DropdownAction<ProcessedAbuse>[] {
    if (!this.isAdminView()) {
      return [];
    }

    return [
      {
        label: `Actions for the flagged account`,
        isHeader: true,
        isDisplayed: abuse => abuse.flaggedAccount && !abuse.comment && !abuse.post
      },

      {
        label: `Mute account`,
        isDisplayed: abuse => abuse.flaggedAccount && !abuse.comment && !abuse.post,
        handler: abuse => this.muteAccountHelper(abuse.flaggedAccount)
      },
    ];
  }

  private buildAccountActions(): DropdownAction<ProcessedAbuse>[] {
    if (!this.isAdminView()) return [];

    return [
      {
        label: `Actions for the reporter`,
        isHeader: true,
        isDisplayed: abuse => !!abuse.reporterAccount
      },

      {
        label: `Mute reporter`,
        isDisplayed: abuse => !!abuse.reporterAccount,
        handler: abuse => this.muteAccountHelper(abuse.reporterAccount)
      },
    ];
  }

  private buildVideoActions(): DropdownAction<ProcessedAbuse>[] {
    if (!this.isAdminView()) return [];

    return [
      {
        label: `Actions for the video`,
        isHeader: true,
        isDisplayed: abuse => abuse.post && !abuse.post.deleted
      },
      {
        label: `Block video`,
        isDisplayed: abuse => abuse.post && !abuse.post.deleted && !abuse.post.blacklisted,
        handler: abuse => {
          this.videoBlocklistService.blockVideo(abuse.post.id, undefined)
            .subscribe(
              () => {
                this.notifier.success(`Video blocked.`);

                this.updateAbuseState(abuse, AbuseState.ACCEPTED);
              },

              err => this.notifier.danger(err.message, 'Error')
            );
        }
      },
      {
        label: `Unblock video`,
        isDisplayed: abuse => abuse.post && !abuse.post.deleted && abuse.post.blacklisted,
        handler: abuse => {
          this.videoBlocklistService.unblockVideo(abuse.post.id)
            .subscribe(
              () => {
                this.notifier.success(`Video unblocked.`);

                this.updateAbuseState(abuse, AbuseState.ACCEPTED);
              },

              err => this.notifier.danger(err.message, 'Error')
            );
        }
      },
      {
        label: `Delete video`,
        isDisplayed: abuse => abuse.post && !abuse.post.deleted,
        handler: async abuse => {
          const res = await this.confirmService.confirm(
            `Do you really want to delete this video?`,
            `Delete`
          );
          if (res === false) {
            return;
          }

          this.postService.removePost(abuse.post.id)
            .subscribe(
              () => {
                this.notifier.success(`Video deleted.`);

                this.updateAbuseState(abuse, AbuseState.ACCEPTED);
              },

              err => this.notifier.danger(err.message, 'Error')
            );
        }
      }
    ];
  }

  private buildCommentActions(): DropdownAction<ProcessedAbuse>[] {
    if (!this.isAdminView()) return [];

    return [
      {
        label: `Actions for the comment`,
        isHeader: true,
        isDisplayed: abuse => abuse.comment && !abuse.comment.deleted
      },

      {
        label: `Delete comment`,
        isDisplayed: abuse => abuse.comment && !abuse.comment.deleted,
        handler: async abuse => {
          const res = await this.confirmService.confirm(
            `Do you really want to delete this comment?`,
            `Delete`
          );
          if (res === false) return;

          this.commentService.deleteVideoComment(abuse.comment.video.id, abuse.comment.id)
            .subscribe(
              () => {
                this.notifier.success(`Comment deleted.`);

                this.updateAbuseState(abuse, AbuseState.ACCEPTED);
              },

              err => this.notifier.danger(err.message, 'Error')
            );
        }
      }
    ];
  }

  private muteAccountHelper(account: User) {
    this.blocklistService.blockAccountByInstance(account)
      .subscribe(
        () => {
          this.notifier.success(`Account ${account.screenName} muted by the instance.`, 'Success');
          // account.mutedByInstance = true;
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  private toHtml(text: string) {
    return this.markdownRenderer.textMarkdownToHTML(text);
  }
}
