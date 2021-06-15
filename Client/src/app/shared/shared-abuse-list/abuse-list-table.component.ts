import * as debug from 'debug';
import truncate from 'lodash-es/truncate';
import {SortMeta} from 'primeng/api';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AbuseMessageModalComponent} from './abuse-message-modal.component';
import {ModerationCommentModalComponent} from './moderation-comment-modal.component';
import {ProcessedAbuse} from './processed-abuse.model';
import {RestTable} from "../../core/rest/rest-table";
import {RestPagination} from "../../core/rest/rest-pagination";
import {DropdownAction} from "../shared-main/buttons/action-dropdown.component";
import {Notifier} from "../../core/notification/notifier.service";
import {AbuseService} from "../moderation/abuse.service";
import {VideoCommentService} from "../shared-post-comment/video-comment.service";
import {MarkdownService} from "../../core/renderer/markdown.service";
import {ConfirmService} from "../../core/confirm/confirm.service";
import {VideoBlockService} from "../moderation/video-block.service";
import {PostsService} from "../posts/posts.service";
import {BlocklistService} from "../moderation/blocklist.service";
import {AdminAbuse} from "../models/moderation/abuse/abuse.model";
import {AbuseState} from "../models/moderation/abuse/abuse-state.model";
import {buildVideoLink, buildVideoOrPlaylistEmbed} from "../../../assets/utils";
import {environment} from "../../../environments/environment";
import {Post} from "../shared-main/post/post.model";
import {User} from "../shared-main/user/user.model";
import {IUser} from "../../core/interfaces/common/users";

const logger = debug('peertube:moderation:AbuseListTableComponent');

import {
  faCommentSmile,
} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'my-abuse-list-table',
  templateUrl: './abuse-list-table.component.html',
  styleUrls: ['../moderation/moderation.scss', './abuse-list-table.component.scss']
})
export class AbuseListTableComponent extends RestTable implements OnInit, AfterViewInit {
  @Input() viewType: 'admin' | 'user';
  @Input() baseRoute: string;

  @ViewChild('abuseMessagesModal', {static: true}) abuseMessagesModal: AbuseMessageModalComponent;
  @ViewChild('moderationCommentModal', {static: true}) moderationCommentModal: ModerationCommentModalComponent;

  abuses: ProcessedAbuse[] = [];
  totalRecords = 0;
  sort: SortMeta = {field: 'createdAt', order: 1};
  pagination: RestPagination = {count: this.rowsPerPage, start: 0};

  abuseActions: DropdownAction<ProcessedAbuse>[][] = [];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private notifier: Notifier,
    private abuseService: AbuseService,
    private blocklistService: BlocklistService,
    private commentService: VideoCommentService,
    private postService: PostsService,
    private videoBlocklistService: VideoBlockService,
    private confirmService: ConfirmService,
    private markdownRenderer: MarkdownService,
    private sanitizer: DomSanitizer
  ) {
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
    this.listenToSearchChange();
  }

  ngAfterViewInit() {
    if (this.search) {
      this.setTableFilter(this.search, false);
    }
  }

  faCommentSmile = faCommentSmile;

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
    this.loadData();
  }

  isAbuseAccepted(abuse: AdminAbuse) {
    return abuse.state.id === AbuseState.ACCEPTED;
  }

  isAbuseRejected(abuse: AdminAbuse) {
    return abuse.state.id === AbuseState.REJECTED;
  }

  getVideoUrl(abuse: AdminAbuse) {
    return Post.buildClientUrl(abuse.video.uuid);
  }

  getCommentUrl(abuse: AdminAbuse) {
    return Post.buildClientUrl(abuse.comment.video.uuid) + ';threadId=' + abuse.comment.threadId;
  }

  getAccountUrl(abuse: ProcessedAbuse) {
    return '/accounts/' + abuse.flaggedAccount.screenName; // or displayname idk
  }

  getVideoEmbed(abuse: AdminAbuse) {
    return buildVideoOrPlaylistEmbed(
      buildVideoLink({
        baseUrl: `${environment.apiUrl}/videos/embed/${abuse.video.uuid}`,
        title: false,
        warningTitle: false,
        startTime: abuse.video.startAt,
        stopTime: abuse.video.endAt
      })
    );
  }

  switchToDefaultAvatar($event: Event) {
    ($event.target as HTMLImageElement).src = User.GET_DEFAULT_AVATAR_URL();
  }

  async removeAbuse(abuse: AdminAbuse) {
    const res = await this.confirmService.confirm(`Do you really want to delete this abuse report?`, `Delete`);
    if (res === false) return;

    this.abuseService.removeAbuse(abuse).subscribe(
      () => {
        this.notifier.success(`Abuse deleted.`);
        this.loadData();
      },

      err => this.notifier.error(err.message)
    );
  }

  updateAbuseState(abuse: AdminAbuse, state: AbuseState) {
    this.abuseService.updateAbuse(abuse, {state})
      .subscribe(
        () => this.loadData(),

        err => this.notifier.error(err.message)
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

    // return UserData.IS_LOCAL(abuse.reporterAccount.host);
  }

  protected loadData() {
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

          if (abuse.video) {
            abuse.embedHtml = this.sanitizer.bypassSecurityTrustHtml(this.getVideoEmbed(abuse));

            if (abuse.video.channel?.ownerAccount) {
              abuse.video.channel.ownerAccount = new User(abuse.video.channel.ownerAccount);
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

      err => this.notifier.error(err.message)
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
    if (!this.isAdminView()) return [];

    return [
      {
        label: `Actions for the flagged account`,
        isHeader: true,
        isDisplayed: abuse => abuse.flaggedAccount && !abuse.comment && !abuse.video
      },

      {
        label: `Mute account`,
        isDisplayed: abuse => abuse.flaggedAccount && !abuse.comment && !abuse.video,
        handler: abuse => this.muteAccountHelper(abuse.flaggedAccount)
      },

      // {
      //   label: `Mute server account`,
      //   isDisplayed: abuse => abuse.flaggedAccount && !abuse.reply-comment && !abuse.video,
      //   handler: abuse => this.muteServerHelper(abuse.flaggedAccount.host)
      // }
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

      // {
      //   label: `Mute server`,
      //   isDisplayed: abuse => abuse.reporterAccount && !abuse.reporterAccount.userId,
      //   handler: abuse => this.muteServerHelper(abuse.reporterAccount.host)
      // }
    ];
  }

  private buildVideoActions(): DropdownAction<ProcessedAbuse>[] {
    if (!this.isAdminView()) return [];

    return [
      {
        label: `Actions for the video`,
        isHeader: true,
        isDisplayed: abuse => abuse.video && !abuse.video.deleted
      },
      {
        label: `Block video`,
        isDisplayed: abuse => abuse.video && !abuse.video.deleted && !abuse.video.blacklisted,
        handler: abuse => {
          this.videoBlocklistService.blockVideo(abuse.video.id, undefined)
            .subscribe(
              () => {
                this.notifier.success(`Video blocked.`);

                this.updateAbuseState(abuse, AbuseState.ACCEPTED);
              },

              err => this.notifier.error(err.message)
            );
        }
      },
      {
        label: `Unblock video`,
        isDisplayed: abuse => abuse.video && !abuse.video.deleted && abuse.video.blacklisted,
        handler: abuse => {
          this.videoBlocklistService.unblockVideo(abuse.video.id)
            .subscribe(
              () => {
                this.notifier.success(`Video unblocked.`);

                this.updateAbuseState(abuse, AbuseState.ACCEPTED);
              },

              err => this.notifier.error(err.message)
            );
        }
      },
      {
        label: `Delete video`,
        isDisplayed: abuse => abuse.video && !abuse.video.deleted,
        handler: async abuse => {
          const res = await this.confirmService.confirm(
            `Do you really want to delete this video?`,
            `Delete`
          );
          if (res === false) return;

          this.postService.removePost(abuse.video.id)
            .subscribe(
              () => {
                this.notifier.success(`Video deleted.`);

                this.updateAbuseState(abuse, AbuseState.ACCEPTED);
              },

              err => this.notifier.error(err.message)
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

              err => this.notifier.error(err.message)
            );
        }
      }
    ];
  }

  private muteAccountHelper(account: IUser) {
    // this.blocklistService.blockAccountByInstance(account)
    //   .subscribe(
    //     () => {
    //       this.notifier.success(`Account ${account.nameWithHost} muted by the instance.`);
    //       account.mutedByInstance = true;
    //     },
    //
    //     err => this.notifier.error(err.message)
    //   );
  }

  private muteServerHelper(host: string) {
    this.blocklistService.blockServerByInstance(host)
      .subscribe(
        () => {
          this.notifier.success(`Server ${host} muted by the instance.`);
        },

        err => this.notifier.error(err.message)
      );
  }

  private toHtml(text: string) {
    return this.markdownRenderer.textMarkdownToHTML(text);
  }
}
