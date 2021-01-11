import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {RestExtractor} from "../../core/rest/rest-extractor.service";
import {LiveVideo} from "../models/videos/live/live-video.model";
import {LiveVideoUpdate} from "../models/videos/live/live-video-update.model";
import {LiveVideoCreate} from "../models/videos/live/live-video-create.model";

@Injectable()
export class LiveVideoService {
  static BASE_VIDEO_LIVE_URL = environment.apiUrl + '/api/v1/videos/live/';

  constructor(
    private authHttp: HttpClient,
    private restExtractor: RestExtractor,
  ) {
  }

  goLive(video: LiveVideoCreate) {
    return this.authHttp
      .post<{ video: { id: number, uuid: string } }>(LiveVideoService.BASE_VIDEO_LIVE_URL, video)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  getVideoLive(videoId: number | string) {
    return this.authHttp
      .get<LiveVideo>(LiveVideoService.BASE_VIDEO_LIVE_URL + videoId)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  updateLive(videoId: number | string, liveUpdate: LiveVideoUpdate) {
    return this.authHttp
      .put(LiveVideoService.BASE_VIDEO_LIVE_URL + videoId, liveUpdate)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }
}
