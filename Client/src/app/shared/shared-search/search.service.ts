import {Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AdvancedSearch} from './advanced-search.model';
import {RestExtractor} from "../../core/rest/rest-extractor";
import {RestService} from "../../core/rest/rest.service";
import {PostsService} from "../posts/posts.service";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";
import { Post } from '../shared-main/post/post.model';
import { RestPagination } from '../../core/rest/rest-pagination';
import {chessbookLocalStorage} from "../../../root-helpers/sharebook-web-storage";
import {ResultList} from "../models";
import { User } from '../shared-main/user/user.model';
import {HttpService} from "../../core/backend/common/api/http.service";

@Injectable()
export class SearchService {
  static BASE_SEARCH_URL = 'search/';

  constructor(
    private authHttp: HttpService,
    private restExtractor: RestExtractor,
    private restService: RestService,
    private videoService: PostsService,
  ) {
    // Add ability to override search endpoint if the user updated this local storage key
    const searchUrl = chessbookLocalStorage.getItem('search-url');
    if (searchUrl) SearchService.BASE_SEARCH_URL = searchUrl;
  }

  searchVideos(parameters: {
    search?: string
    componentPagination?: ComponentPaginationLight
    advancedSearch?: AdvancedSearch
    uuids?: string[]
  }): Observable<ResultList<Post>> {
    const {search, uuids, componentPagination, advancedSearch} = parameters;

    const url = SearchService.BASE_SEARCH_URL + 'posts/';
    let pagination: RestPagination;

    if (componentPagination) {
      pagination = this.restService.componentPaginationToRestPagination(componentPagination);
    }

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination);

    if (search) params = params.append('search', search);
    if (uuids) params = this.restService.addArrayParams(params, 'uuids', uuids);

    if (advancedSearch) {
      const advancedSearchObject = advancedSearch.toVideosAPIObject();
      params = this.restService.addObjectParams(params, advancedSearchObject);
    }

    return this.authHttp
      .get<ResultList<Post>>(url, {params})
      .pipe(
        switchMap(res => this.videoService.extractVideos(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  searchVideoChannels(parameters: {
    search?: string
    advancedSearch?: AdvancedSearch
    componentPagination?: ComponentPaginationLight
    handles?: string[]
  }): Observable<ResultList<User>> {
    const {search, advancedSearch, componentPagination, handles} = parameters;

    const url = SearchService.BASE_SEARCH_URL + 'video-channels';

    let pagination: RestPagination;
    if (componentPagination) {
      pagination = this.restService.componentPaginationToRestPagination(componentPagination);
    }

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination);

    if (search) params = params.append('search', search);
    if (handles) params = this.restService.addArrayParams(params, 'handles', handles);

    // if (advancedSearch) {
    //   const advancedSearchObject = advancedSearch.toChannelAPIObject();
    //   params = this.restService.addObjectParams(params, advancedSearchObject);
    // }

    return this.authHttp
      .get<ResultList<User>>(url, {params})
      .pipe(
        map(res => User.extractVideoChannels(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }
}
