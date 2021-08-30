import {SortMeta} from 'primeng/api';
import {switchMap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {RestTable} from "../../../core/rest/rest-table";
import {VideoBlacklist, VideoBlacklistType} from "../../../shared/posts/blacklist/video-blacklist.model";
import {RestPagination} from "../../../core/rest/rest-pagination";
import {DropdownAction} from "../../../shared/shared-main/buttons/action-dropdown.component";
import {AdvancedInputFilter} from "../../../shared/shared-forms/advanced-input-filter.component";
import {NbToastrService} from "../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {ServerService} from "../../../core/server/server.service";
import {ConfirmService} from "../../../core/confirm/confirm.service";
import {VideoBlockService} from "../../../shared/shared-moderation/video-block.service";
import {MarkdownService} from "../../../core/renderer/markdown.service";
import {PostsService} from "../../../shared/posts/posts.service";
import {Post} from "../../../shared/shared-main/post/post.model";
import {environment} from "../../../../environments/environment";

import {
  faTimes,
  faMobileAndroid,
} from '@fortawesome/pro-light-svg-icons';
import {buildVideoOrPlaylistEmbed} from "../../../../assets/utils";
import {buildVideoEmbedLink, buildVideoLink, decorateVideoLink} from "../../../core/utils/common/url";

@Component({
  selector: 'app-video-block-list',
  templateUrl: './video-block-list.component.html',
  styleUrls: ['../../../shared/shared-moderation/moderation.scss', './video-block-list.component.scss']
})
export class VideoBlockListComponent extends RestTable implements OnInit {
  blocklist: (VideoBlacklist & { reasonHtml?: string, embedHtml?: string })[] = [];
  totalRecords = 0;
  sort: SortMeta = {field: 'createdAt', order: -1};
  pagination: RestPagination = {count: this.rowsPerPage, start: 0};
  blocklistTypeFilter: VideoBlacklistType = undefined;

  videoBlocklistActions: DropdownAction<VideoBlacklist>[][] = [];

  inputFilters: AdvancedInputFilter[] = [
    {
      queryParams: {search: 'type:auto'},
      label: `Automatic blocks`
    },
    {
      queryParams: {search: 'type:manual'},
      label: `Manual blocks`
    }
  ];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private notifier: NbToastrService,
    private serverService: ServerService,
    private confirmService: ConfirmService,
    private videoBlocklistService: VideoBlockService,
    private markdownRenderer: MarkdownService,
    private sanitizer: DomSanitizer,
    private videoService: PostsService
  ) {
    super();

    this.videoBlocklistActions = [
      [
        {
          label: `Internal actions`,
          isHeader: true,
          isDisplayed: videoBlock => videoBlock.type === VideoBlacklistType.AUTO_BEFORE_PUBLISHED
        },
        {
          label: `Switch video block to manual`,
          handler: videoBlock => {
            this.videoBlocklistService.unblockVideo(videoBlock.video.id).pipe(
              switchMap(_ => this.videoBlocklistService.blockVideo(videoBlock.video.id, undefined))
            ).subscribe(
              () => {
                this.notifier.success(`Video ${videoBlock.video.id} switched to manual block.`);
                this.reloadData();
              },

              err => this.notifier.danger(err.message, 'Error')
            );
          },
          isDisplayed: videoBlock => videoBlock.type === VideoBlacklistType.AUTO_BEFORE_PUBLISHED
        }
      ],
      [
        {
          label: `Actions for the video`,
          isHeader: true
        },
        {
          label: `Unblock`,
          handler: videoBlock => this.unblockVideo(videoBlock)
        },

        {
          label: `Delete`,
          handler: async videoBlock => {
            const res = await this.confirmService.confirm(
              `Do you really want to delete this video?`,
              `Delete`
            );
            if (res === false) return;

            this.videoService.removePost(videoBlock.video.id)
              .subscribe(
                () => {
                  this.notifier.success(`Video deleted.`);
                },

                err => this.notifier.danger(err.message, 'Error')
              );
          }
        }
      ]
    ];
  }

  ngOnInit() {
    const serverConfig = this.serverService.getHTMLConfig();

    // Don't filter if auto-blacklist is not enabled as this will be the only list
    if (serverConfig.autoBlacklist.videos.ofUsers.enabled) {
      this.blocklistTypeFilter = VideoBlacklistType.MANUAL;
    }

    this.initialize();
  }

  faTimes = faTimes;
  faMobileAndroid = faMobileAndroid;


  getIdentifier() {
    return 'VideoBlockListComponent';
  }

  getVideoUrl(videoBlock: VideoBlacklist) {
    return Post.buildClientUrl(videoBlock.video.idStr);
  }

  toHtml(text: string) {
    return this.markdownRenderer.textMarkdownToHTML(text);
  }

  async unblockVideo(entry: VideoBlacklist) {
    const confirmMessage = `Do you really want to unblock this video? It will be available again in the videos list.`;

    const res = await this.confirmService.confirm(confirmMessage, `Unblock`);
    if (res === false) return;

    this.videoBlocklistService.unblockVideo(entry.video.id).subscribe(
      () => {
        this.notifier.success(`Video ${entry.video.id} unblocked.`);
        this.reloadData();
      },

      err => this.notifier.danger(err.message, 'Error')
    );
  }

  getVideoEmbed (entry: VideoBlacklist) {
    return buildVideoOrPlaylistEmbed(
      decorateVideoLink({
        url: buildVideoEmbedLink(entry.video.user.screenName, entry.video.id, environment.apiUrl), // originServerUrl

        title: false,
        warningTitle: false
      }),
      entry.video.status
    );
  }

  protected reloadData() {
    this.videoBlocklistService.listBlocks({
      pagination: this.pagination,
      sort: this.sort,
      search: this.search
    })
      .subscribe(
        async resultList => {
          this.totalRecords = resultList.total;

          this.blocklist = resultList.data;

          for (const element of this.blocklist) {
            Object.assign(element, {
              reasonHtml: await this.toHtml(element.reason),
              embedHtml: this.sanitizer.bypassSecurityTrustHtml(this.getVideoEmbed(element))
            });
          }
        },

        err => this.notifier.danger(err.message, 'Error')
      );
  }
}
