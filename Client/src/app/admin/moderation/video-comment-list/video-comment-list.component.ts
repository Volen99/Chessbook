import {SortMeta} from 'primeng/api';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestTable} from "../../../core/rest/rest-table";
import {RestPagination} from "../../../core/rest/rest-pagination";
import {DropdownAction} from "../../../shared/shared-main/buttons/action-dropdown.component";
import {FeedFormat} from "../../../shared/models/enums/feed-format";
import {VideoCommentService} from "../../../shared/shared-post-comment/video-comment.service";
import {AdvancedInputFilter} from "../../../shared/shared-forms/advanced-input-filter.component";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {ConfirmService} from "../../../core/confirm/confirm.service";
import {MarkdownService} from "../../../core/renderer/markdown.service";
import {BulkService} from "../../../shared/shared-moderation/bulk.service";
import {UserStore} from "../../../core/stores/user.store";
import {UserRight} from "../../../shared/models/users/user-right.enum";

import {
  faTrashAlt,
  faCommentSmile,
} from '@fortawesome/pro-light-svg-icons';

import {PostCommentAdmin} from "../../../shared/shared-post-comment/post-comment";

@Component({
  selector: 'app-video-comment-list',
  templateUrl: './video-comment-list.component.html',
  styleUrls: ['../../../shared/shared-moderation/moderation.scss', './video-comment-list.component.scss']
})
export class VideoCommentListComponent extends RestTable implements OnInit {
  comments: PostCommentAdmin[];
  totalRecords = 0;
  sort: SortMeta = {field: 'createdAt', order: -1};
  pagination: RestPagination = {count: this.rowsPerPage, start: 0};

  videoCommentActions: DropdownAction<PostCommentAdmin>[][] = [];

  syndicationItems = [
    {
      format: FeedFormat.RSS,
      label: 'media rss 2.0',
      url: VideoCommentService.BASE_FEEDS_URL + FeedFormat.RSS.toLowerCase()
    },
    {
      format: FeedFormat.ATOM,
      label: 'atom 1.0',
      url: VideoCommentService.BASE_FEEDS_URL + FeedFormat.ATOM.toLowerCase()
    },
    {
      format: FeedFormat.JSON,
      label: 'json 1.0',
      url: VideoCommentService.BASE_FEEDS_URL + FeedFormat.JSON.toLowerCase()
    }
  ];

  selectedComments: PostCommentAdmin[] = [];
  bulkCommentActions: DropdownAction<PostCommentAdmin[]>[] = [];

  inputFilters: AdvancedInputFilter[] = [
    {
      queryParams: {search: 'local:true'},
      label: `Local comments`
    },
    {
      queryParams: {search: 'local:false'},
      label: `Remote comments`
    }
  ];

  get authUser() {
    return this.auth.getUser();
  }

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    private auth: UserStore,
    private notifier: NbToastrService,
    private confirmService: ConfirmService,
    private videoCommentService: VideoCommentService,
    private markdownRenderer: MarkdownService,
    private bulkService: BulkService
  ) {
    super();

    this.videoCommentActions = [
      [
        {
          label: `Delete this comment`,
          handler: comment => this.deleteComment(comment),
          isDisplayed: () => this.authUser.hasRight(UserRight.REMOVE_ANY_VIDEO_COMMENT)
        },

        {
          label: `Delete all comments of this account`,
          description: `Comments are deleted after a few minutes`,
          handler: comment => this.deleteUserComments(comment),
          isDisplayed: () => this.authUser.hasRight(UserRight.REMOVE_ANY_VIDEO_COMMENT)
        }
      ]
    ];
  }

  ngOnInit() {
    this.initialize();

    this.bulkCommentActions = [
      {
        label: `Delete`,
        handler: comments => this.removeComments(comments),
        isDisplayed: () => this.authUser.hasRight(UserRight.REMOVE_ANY_VIDEO_COMMENT),
        iconName: faTrashAlt,
      }
    ];
  }

  faCommentSmile = faCommentSmile;

  getIdentifier() {
    return 'VideoCommentListComponent';
  }

  toHtml(text: string) {
    return this.markdownRenderer.textMarkdownToHTML(text, true, true);
  }

  isInSelectionMode() {
    return this.selectedComments.length !== 0;
  }

  protected reloadData() {
    this.videoCommentService.getAdminVideoComments({
      pagination: this.pagination,
      sort: this.sort,
      search: this.search
    }).subscribe(
      async resultList => {
        this.totalRecords = resultList.total;

        this.comments = [];

        for (const c of resultList.data) {
          this.comments.push(
            new PostCommentAdmin(c, await this.toHtml(c.text))
          );
        }
      },

      err => this.notifier.danger(err.message, 'error')
    );
  }

  private async removeComments(comments: PostCommentAdmin[]) {
    const commentArgs = comments.map(c => ({videoId: c.video.id, commentId: c.id}));

    this.videoCommentService.deleteVideoComments(commentArgs).subscribe(
      () => {
        this.notifier.success(`${commentArgs.length} comments deleted.`);
        this.reloadData();
      },

      err => this.notifier.danger(err.message, 'Error'),

      () => this.selectedComments = []
    );
  }

  private deleteComment(comment: PostCommentAdmin) {
    this.videoCommentService.deleteVideoComment(comment.video.id, comment.id)
      .subscribe(
        () => this.reloadData(),

        err => this.notifier.danger(err.message, 'Error')
      );
  }

  private async deleteUserComments(comment: PostCommentAdmin) {
    const message = `Do you really want to delete all comments of ${comment.by}?`;
    const res = await this.confirmService.confirm(message, `Delete`);
    if (res === false) return;

    const options = {
      accountName: comment.by,
      scope: 'instance' as 'instance'
    };

    this.bulkService.removeCommentsOf(options)
      .subscribe(
        () => {
          this.notifier.success(`Comments of ${options.accountName} will be deleted in a few minutes`);
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }
}
