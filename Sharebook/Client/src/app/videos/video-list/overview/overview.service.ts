import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {VideosOverview} from './videos-overview.model';
import {RestExtractor} from "../../../core/rest/rest-extractor.service";
import {ServerService} from "../../../core/server";
import {VideoService} from "../../../shared/main/video/video.service";
import {immutableAssign} from "../../../helpers/utils";
import {peertubeTranslate} from "../../../shared/core-utils/i18n/i18n";
import { VideosOverview as VideosOverviewServer } from '../../../shared/models/overviews/videos-overview';

@Injectable()
export class OverviewService {
  static BASE_OVERVIEW_URL = environment.apiUrl + '/api/v1/overviews/';

  constructor(
    private authHttp: HttpClient,
    private restExtractor: RestExtractor,
    private videosService: VideoService,
    private serverService: ServerService
  ) {
  }

  getVideosOverview(page: number): Observable<VideosOverview> {
    let params = new HttpParams();
    params = params.append('page', page + '');

    return this.authHttp
      .get<VideosOverviewServer>(OverviewService.BASE_OVERVIEW_URL + 'videos', {params})
      .pipe(
        switchMap(serverVideosOverview => this.updateVideosOverview(serverVideosOverview)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  private updateVideosOverview(serverVideosOverview: VideosOverviewServer): Observable<VideosOverview> {
    const observables: Observable<any>[] = [];
    const videosOverviewResult: VideosOverview = {
      tags: [],
      categories: [],
      channels: []
    };

    // Build videos objects
    for (const key of Object.keys(serverVideosOverview)) {
      for (const object of serverVideosOverview[key]) {
        observables.push(
          of(object.videos)
            .pipe(
              switchMap(videos => this.videosService.extractVideos({total: 0, data: videos})),
              map(result => result.data),
              tap(videos => {
                videosOverviewResult[key].push(immutableAssign(object, {videos}));
              })
            )
        );
      }
    }

    if (observables.length === 0) {
      return of(videosOverviewResult);
    }

    return forkJoin(observables)
      .pipe(
        // Translate categories
        switchMap(() => {
          return this.serverService.getServerLocale()
            .pipe(
              tap(translations => {
                for (const c of videosOverviewResult.categories) {
                  c.category.label = peertubeTranslate(c.category.label, translations);
                }
              })
            );
        }),
        map(() => videosOverviewResult)
      );
  }

}
