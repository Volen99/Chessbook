import {Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Video as VideoServerModel} from '../../shared/models/videos/video.model';
import {VideoChannel as VideoChannelServerModel} from '../../shared/models/videos/channel/video-channel.model';
import {environment} from '../../../environments/environment';
import {AdvancedSearch} from './advanced-search.model';
import {RestExtractor} from "../../core/rest/rest-extractor.service";
import {RestService} from "../../core/rest/rest.service";
import {peertubeLocalStorage} from "../../../root-helpers/sharebook-web-storage";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";
import {RestPagination} from "../../core/rest/rest-pagination";
import {ResultList} from "../models/result-list.model";
import {VideoService} from "../main/video/video.service";
import {SearchTargetType} from "../models/search/search-target-query.model";
import {VideoChannel} from "../main/video-channel/video-channel.model";
import {Video} from "../main/video/video.model";
import {VideoChannelService} from "../main/video-channel/video-channel.service";

@Injectable()
export class SearchService {
  static BASE_SEARCH_URL = environment.apiUrl + '/api/v1/search/';

  constructor(
    private authHttp: HttpClient,
    private restExtractor: RestExtractor,
    private restService: RestService,
    private videoService: VideoService
  ) {
    // Add ability to override search endpoint if the user updated this local storage key
    const searchUrl = peertubeLocalStorage.getItem('search-url');
    if (searchUrl) {
      SearchService.BASE_SEARCH_URL = searchUrl;
    }
  }

  searchVideos(parameters: {
    search: string,
    componentPagination?: ComponentPaginationLight,
    advancedSearch?: AdvancedSearch
  }): Observable<ResultList<Video>> {
    const {search, componentPagination, advancedSearch} = parameters;

    const url = SearchService.BASE_SEARCH_URL + 'videos';
    let pagination: RestPagination;

    if (componentPagination) {
      pagination = this.restService.componentPaginationToRestPagination(componentPagination);
    }

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination);

    if (search) {
      params = params.append('search', search);
    }

    if (advancedSearch) {
      const advancedSearchObject = advancedSearch.toAPIObject();
      params = this.restService.addObjectParams(params, advancedSearchObject);
    }

    return this.authHttp
      .get<ResultList<VideoServerModel>>(url, {params})
      .pipe(
        switchMap(res => this.videoService.extractVideos(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  searchVideoChannels(parameters: {
    search: string,
    searchTarget?: SearchTargetType,
    componentPagination?: ComponentPaginationLight
  }): Observable<ResultList<VideoChannel>> {
    const {search, componentPagination, searchTarget} = parameters;

    const url = SearchService.BASE_SEARCH_URL + 'video-channels';

    let pagination: RestPagination;
    if (componentPagination) {
      pagination = this.restService.componentPaginationToRestPagination(componentPagination);
    }

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination);
    params = params.append('search', search);

    if (searchTarget) {
      params = params.append('searchTarget', searchTarget as string);
    }

    return this.authHttp
      .get<ResultList<VideoChannelServerModel>>(url, {params})
      .pipe(
        map(res => VideoChannelService.extractVideoChannels(null)), // null was "res"!!
        catchError(err => this.restExtractor.handleError(err))
      );
  }
}
