import {SortMeta} from 'primeng/api';
import {concat, Observable} from 'rxjs';
import {catchError, map, toArray} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {RestService} from "../../../core/rest/rest.service";
import {RestExtractor} from "../../../core/rest/rest-extractor";
import {RestPagination} from "../../../core/rest/rest-pagination";
import {ResultList} from "../../models";
import {VideoRedundanciesTarget} from "../../models/redundancy/video-redundancies-filters.model";
import {VideoRedundancy} from "../../models/redundancy/video-redundancy.model";
import {Post} from "./post.model";

@Injectable()
export class RedundancyService {
  static BASE_REDUNDANCY_URL = environment.apiUrl + '/api/v1/server/redundancy';

  constructor(private authHttp: HttpClient, private restService: RestService, private restExtractor: RestExtractor) {
  }

  updateRedundancy(host: string, redundancyAllowed: boolean) {
    const url = RedundancyService.BASE_REDUNDANCY_URL + '/' + host;

    const body = {redundancyAllowed};

    return this.authHttp.put(url, body)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  listVideoRedundancies(options: {
    pagination: RestPagination,
    sort: SortMeta,
    target?: VideoRedundanciesTarget
  }): Observable<ResultList<VideoRedundancy>> {
    const {pagination, sort, target} = options;

    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    if (target) params = params.append('target', target);

    return this.authHttp.get<ResultList<VideoRedundancy>>(RedundancyService.BASE_REDUNDANCY_URL + '/videos', {params})
      .pipe(
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  addVideoRedundancy(video: Post) {
    return this.authHttp.post(RedundancyService.BASE_REDUNDANCY_URL + '/videos', {videoId: video.id})
      .pipe(
        catchError(res => this.restExtractor.handleError(res))
      );
  }

  removeVideoRedundancies(redundancy: VideoRedundancy) {
    const observables = redundancy.redundancies.streamingPlaylists.map(r => r.id)
      .concat(redundancy.redundancies.files.map(r => r.id))
      .map(id => this.removeRedundancy(id));

    return concat(...observables)
      .pipe(toArray());
  }

  private removeRedundancy(redundancyId: number) {
    return this.authHttp.delete(RedundancyService.BASE_REDUNDANCY_URL + '/videos/' + redundancyId)
      .pipe(
        map(this.restExtractor.extractDataBool),
        catchError(res => this.restExtractor.handleError(res))
      );
  }
}
