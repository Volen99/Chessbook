import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {catchError, concatMap, map, toArray} from 'rxjs/operators';
import {SortMeta} from 'primeng/api';

import {environment} from '../../../environments/environment';
import {RestExtractor} from "../../core/rest/rest-extractor";
import {RestService} from "../../core/rest/rest.service";
import {objectLineFeedToHtml} from "../../helpers/utils";
import {RestPagination} from "../../core/rest/rest-pagination";
import {ResultList, ThreadsResultList} from "../models";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";
import {
  IPostComment,
  IPostCommentThreadTree,
  IPostCommentAdmin,
  IPostCommentCreate
} from "../models/posts/comment/post-comment.model";
import {PostComment} from "./post-comment-model";
import {PostCommentThreadTree} from "./video-comment-thread-tree.model";
import {HttpService} from "../../core/backend/common/api/http.service";

@Injectable()
export class VideoCommentService {
  static BASE_FEEDS_URL = environment.apiUrl + '/feeds/video-comments.';

  private static BASE_VIDEO_URL = 'posts/';

  constructor(
    private authHttp: HttpService,
    private restExtractor: RestExtractor,
    private restService: RestService) {
  }

  addCommentThread(videoId: number | string, comment: IPostCommentCreate) {
    const url = VideoCommentService.BASE_VIDEO_URL + videoId + '/comment-threads';
    const normalizedComment = objectLineFeedToHtml(comment, 'text');

    return this.authHttp.post<{ comment: IPostComment }>(url, normalizedComment)
      .pipe(
        map(data => this.extractVideoComment(data)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  addCommentReply(videoId: number | string, inReplyToCommentId: number, comment: IPostCommentCreate) {
    const url = VideoCommentService.BASE_VIDEO_URL + videoId + '/comments/' + inReplyToCommentId;
    const normalizedComment = objectLineFeedToHtml(comment, 'text');

    return this.authHttp.post<{ comment: IPostComment }>(url, normalizedComment)
      .pipe(
        map(data => this.extractVideoComment(data)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  getAdminVideoComments(options: {
    pagination: RestPagination,
    sort: SortMeta,
    search?: string
  }): Observable<ResultList<IPostCommentAdmin>> {
    const {pagination, sort, search} = options;
    const url = VideoCommentService.BASE_VIDEO_URL + 'comments';

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (search) {
      params = this.buildParamsFromSearch(search, params);
    }

    return this.authHttp.get<ResultList<IPostCommentAdmin>>(url, {params})
      .pipe(
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  getVideoCommentThreads(parameters: {
    videoId: number | string,
    componentPagination: ComponentPaginationLight,
    sort: string
  }): Observable<ThreadsResultList<PostComment>> {
    const {videoId, componentPagination, sort} = parameters;

    const pagination = this.restService.componentPaginationToRestPagination(componentPagination);

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    const url = VideoCommentService.BASE_VIDEO_URL + videoId + '/comment-threads';
    return this.authHttp.get<ThreadsResultList<IPostComment>>(url, {params})
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

    return this.authHttp
      .get<IPostCommentThreadTree>(url)
      .pipe(
        map(tree => this.extractVideoCommentTree(tree)),
        catchError(err => this.restExtractor.handleError(err))
      );
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

  // getVideoCommentsFeeds(video: Pick<Post, 'uuid'>) {
  // }

  private extractVideoComment(postComment: IPostComment) {
    return new PostComment(postComment);
  }

  private extractVideoComments(result: ThreadsResultList<IPostComment>) {
    const videoCommentsJson = result.data;
    const totalComments = result.total;
    const comments: PostComment[] = [];

    for (const videoCommentJson of videoCommentsJson) {
      comments.push(new PostComment(videoCommentJson));
    }

    return {data: comments, total: totalComments, totalNotDeletedComments: result.totalNotDeletedComments};
  }

  private extractVideoCommentTree(serverTree: IPostCommentThreadTree): PostCommentThreadTree {
    if (!serverTree) return null;

    const tree = {
      comment: new PostComment(serverTree.comment),
      children: serverTree.children.map(c => this.extractVideoCommentTree(c))
    };

    const hasDisplayedChildren = tree.children.length === 0
      ? !tree.comment.isDeleted
      : tree.children.some(c => c.hasDisplayedChildren);

    return Object.assign(tree, {hasDisplayedChildren});
  }

  private buildParamsFromSearch(search: string, params: HttpParams) {
    const filters = this.restService.parseQueryStringFilter(search, {
      isLocal: {
        prefix: 'local:',
        isBoolean: true
      },

      searchAccount: {prefix: 'account:'},
      searchVideo: {prefix: 'video:'}
    });

    return this.restService.addObjectParams(params, filters);
  }
}
