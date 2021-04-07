import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {RestExtractor} from "../../../core/rest/rest-extractor";
import {RestService} from "../../../core/rest/rest.service";
import {ComponentPaginationLight} from "../../../core/rest/component-pagination.model";
import {ResultList} from "../../models";
import {PostsService} from "../../posts/posts.service";
import { Post } from '../post/post.model';

@Injectable()
export class UserHistoryService {
  static BASE_USER_VIDEOS_HISTORY_URL = environment.apiUrl + '/api/v1/users/me/history/videos';

  constructor(
    private authHttp: HttpClient,
    private restExtractor: RestExtractor,
    private restService: RestService,
    private postService: PostsService
  ) {
  }

  getUserVideosHistory(historyPagination: ComponentPaginationLight, search?: string) {
    const pagination = this.restService.componentPaginationToRestPagination(historyPagination);

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination);

    if (search) params = params.append('search', search);

    return this.authHttp
      .get<ResultList<Post>>(UserHistoryService.BASE_USER_VIDEOS_HISTORY_URL, {params})
      .pipe(                    // @ts-ignore
        switchMap(res => this.postService.extractVideos(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  deleteUserVideosHistory() {
    return this.authHttp
      .post(UserHistoryService.BASE_USER_VIDEOS_HISTORY_URL + '/remove', {})
      .pipe(
        map(() => this.restExtractor.extractDataBool()),
        catchError(err => this.restExtractor.handleError(err))
      );
  }
}
