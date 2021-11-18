import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';

import {HttpService} from '../../core/backend/common/api/http.service';
import {RestExtractor} from '../../core/rest/rest-extractor';
import {IVideoItem} from './models/video-item.model';

@Injectable()
export class YoutubeVideosService {
  private readonly apiController: string = 'videos';

  constructor(private http: HttpService, private restExtractor: RestExtractor) {
  }

  getVideos(userId: number) {
      return this.http.get(`${this.apiController}/get/${userId}`)
        .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  addVideo(data: IVideoItem) {
    return this.http.post(`${this.apiController}/add`, data)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  editVideo(id: number, data: IVideoItem) {
    return this.http.post(`${this.apiController}/edit/${id}`, data)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  deleteVideo(id: number) {
    return this.http.post(`${this.apiController}/delete/${id}`, {})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

}
