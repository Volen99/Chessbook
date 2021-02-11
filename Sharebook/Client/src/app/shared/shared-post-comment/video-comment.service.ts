import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";

import {environment} from '../../../environments/environment';
import {PostCommentThreadTree} from './video-comment-thread-tree.model';
import {PostComment, PostCommentAdmin} from './post-comment';
import {RestExtractor} from "../../core/rest/rest-extractor";
import {RestService} from "../../core/rest/rest.service";
import {IPostCommentCreate, IPostCommentThreadTree} from "./models/post-comment-model";
import {objectLineFeedToHtml} from "../../helpers/utils";
import {RestPagination} from "../../core/rest/rest-pagination";
import {from, Observable} from "rxjs";
import {ResultList} from "../models";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";
import {catchError, concatMap, map, toArray} from "rxjs/operators";
import {FeedFormat} from "../models/enums/feed-format";

@Injectable()
export class VideoCommentService {
  static BASE_FEEDS_URL = environment.apiUrl + '/feeds/video-comments.';

  private static BASE_VIDEO_URL = environment.apiUrl + '/api/v1/videos/';

  constructor(private authHttp: HttpClient,
              private restExtractor: RestExtractor,
              private restService: RestService) {
  }

  addCommentThread(videoId: number | string, comment: IPostCommentCreate) {
    const url = VideoCommentService.BASE_VIDEO_URL + videoId + '/comment-threads';
    const normalizedComment = objectLineFeedToHtml(comment, 'text');

    return this.authHttp.post<{ comment: PostComment }>(url, normalizedComment)
      .pipe(
        map(data => this.extractVideoComment(data.comment)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  addCommentReply(videoId: number | string, inReplyToCommentId: number, comment: IPostCommentCreate) {
    const url = VideoCommentService.BASE_VIDEO_URL + videoId + '/comments/' + inReplyToCommentId;
    const normalizedComment = objectLineFeedToHtml(comment, 'text');

    return this.authHttp.post<{ comment: PostComment }>(url, normalizedComment)
      .pipe(
        map(data => this.extractVideoComment(data.comment)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  getAdminVideoComments(options: {
    pagination: RestPagination,
    sort: any, // SortMeta,
    search?: string
  }): Observable<ResultList<PostCommentAdmin>> {
    const {pagination, sort, search} = options;
    const url = VideoCommentService.BASE_VIDEO_URL + 'comments';

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) {
      params = this.buildParamsFromSearch(search, params);
    }

    return this.authHttp.get<ResultList<PostCommentAdmin>>(url, {params})
      .pipe(
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  getVideoCommentThreads(parameters: {
    videoId: number | string,
    componentPagination: ComponentPaginationLight,
    sort: string
  }): Observable<ResultList<PostComment>> {
    const {videoId, componentPagination, sort} = parameters;

    const pagination = this.restService.componentPaginationToRestPagination(componentPagination);

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    const url = VideoCommentService.BASE_VIDEO_URL + videoId + '/comment-threads';
    return this.authHttp.get<ResultList<PostComment>>(url, {params})
      .pipe(
        map(result => this.extractVideoComments(result)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  getVideoThreadComments(parameters: {
    videoId: number | string,
    threadId: number
  }): Observable<PostCommentThreadTree> {
    const {videoId, threadId} = parameters;
    const url = `${VideoCommentService.BASE_VIDEO_URL + videoId}/comment-threads/${threadId}`;

    // return this.authHttp
    //   .get<IPostCommentThreadTree>(url)
    //   .pipe(
    //     map(tree => this.extractVideoCommentTree(tree)),
    //     catchError(err => this.restExtractor.handleError(err))
    //   );

    return null;
  }

  deleteVideoComment(videoId: number | string, commentId: number) {
    const url = `${VideoCommentService.BASE_VIDEO_URL + videoId}/comments/${commentId}`;

    return this.authHttp
      .delete(url)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  deleteVideoComments(comments: { videoId: number | string, commentId: number }[]) {
    return from(comments)
      .pipe(
        concatMap(c => this.deleteVideoComment(c.videoId, c.commentId)),
        toArray()
      );
  }

  getVideoCommentsFeeds(videoUUID?: string) {
    const feeds = [
      {
        format: FeedFormat.RSS,
        label: 'rss 2.0',
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

    if (videoUUID !== undefined) {
      for (const feed of feeds) {
        feed.url += '?videoId=' + videoUUID;
      }
    }

    return feeds;
  }

  private extractVideoComment(videoComment: PostComment) {
    return new PostComment(videoComment);
  }

  private extractVideoComments(result: ResultList<PostComment>) {
    const videoCommentsJson = result.data;
    const totalComments = result.total;
    const comments: PostComment[] = [];

    for (const videoCommentJson of videoCommentsJson) {
      comments.push(new PostComment(videoCommentJson));
    }

    return {data: comments, total: totalComments};
  }

  private extractVideoCommentTree(tree: IPostCommentThreadTree) {
    if (!tree) {
      return tree as IPostCommentThreadTree;
    }

    tree.comment = new PostComment(tree.comment);
    tree.children.forEach(c => this.extractVideoCommentTree(c));

    return tree as IPostCommentThreadTree;
  }

  private buildParamsFromSearch(search: string, params: HttpParams) {
    const filters = this.restService.parseQueryStringFilter(search, {
      isLocal: {
        prefix: 'local:',
        isBoolean: true,
        handler: v => {
          if (v === 'true') return v;
          if (v === 'false') return v;

          return undefined;
        }
      },

      searchAccount: {prefix: 'account:'},
      searchVideo: {prefix: 'video:'}
    });

    return this.restService.addObjectParams(params, filters);
  }
}
