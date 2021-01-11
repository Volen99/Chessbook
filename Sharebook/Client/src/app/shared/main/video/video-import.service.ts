import {SortMeta} from 'primeng/api';
import {Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {RestService} from "../../../core/rest/rest.service";
import {RestExtractor} from "../../../core/rest/rest-extractor.service";
import {ServerService} from "../../../core/server";
import {VideoUpdate} from "../../models/videos/video-update.model";
import {VideoImport} from "../../models/videos/import/video-import.model";
import {objectToFormData} from "../../../helpers/utils";
import {VideoImportCreate} from "../../models/videos/import/video-import-create.model";
import {RestPagination} from "../../../core/rest/rest-pagination";
import {ResultList} from "../../models/result-list.model";
import {peertubeTranslate} from "../../core-utils/i18n/i18n";
import {UserService} from "../../../core/users/user.service";

@Injectable()
export class VideoImportService {
  private static BASE_VIDEO_IMPORT_URL = environment.apiUrl + '/api/v1/videos/imports/';

  constructor(
    private authHttp: HttpClient,
    private restService: RestService,
    private restExtractor: RestExtractor,
    private serverService: ServerService
  ) {
  }

  importVideoUrl(targetUrl: string, video: VideoUpdate): Observable<VideoImport> {
    const url = VideoImportService.BASE_VIDEO_IMPORT_URL;

    const body = this.buildImportVideoObject(video);
    body.targetUrl = targetUrl;

    const data = objectToFormData(body);
    return this.authHttp.post<VideoImport>(url, data)
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }

  importVideoTorrent(target: string | Blob, video: VideoUpdate): Observable<VideoImport> {
    const url = VideoImportService.BASE_VIDEO_IMPORT_URL;
    const body: VideoImportCreate = this.buildImportVideoObject(video);

    if (typeof target === 'string') {
      body.magnetUri = target;
    } else {
      body.torrentfile = target;
    }

    const data = objectToFormData(body);
    return this.authHttp.post<VideoImport>(url, data)
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }

  getMyVideoImports(pagination: RestPagination, sort: SortMeta): Observable<ResultList<VideoImport>> {
    let params = new HttpParams();
    params = this.restService.addRestGetParams(params, pagination, sort);

    return this.authHttp
      .get<ResultList<VideoImport>>(UserService.BASE_USERS_URL + '/me/videos/imports', {params})
      .pipe(
        switchMap(res => this.extractVideoImports(res)),
        map(res => this.restExtractor.convertResultListDateToHuman(res)),
        catchError(err => this.restExtractor.handleError(err))
      );
  }

  private buildImportVideoObject(video: VideoUpdate): VideoImportCreate {
    const language = video.language || null;
    const licence = video.licence || null;
    const category = video.category || null;
    const description = video.description || null;
    const support = video.support || null;
    const scheduleUpdate = video.scheduleUpdate || null;
    const originallyPublishedAt = video.originallyPublishedAt || null;

    return {
      name: video.name,
      category,
      licence,
      language,
      support,
      description,
      channelId: video.channelId,
      privacy: video.privacy,
      tags: video.tags,
      nsfw: video.nsfw,
      waitTranscoding: video.waitTranscoding,
      commentsEnabled: video.commentsEnabled,
      downloadEnabled: video.downloadEnabled,
      thumbnailfile: video.thumbnailfile,
      previewfile: video.previewfile,
      scheduleUpdate,
      originallyPublishedAt
    };
  }

  private extractVideoImports(result: ResultList<VideoImport>): Observable<ResultList<VideoImport>> {
    return this.serverService.getServerLocale()
      .pipe(
        map(translations => {
          result.data.forEach(d =>
            d.state.label = peertubeTranslate(d.state.label, translations)
          );

          return result;
        })
      );
  }
}
