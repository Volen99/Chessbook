import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

import {HttpService} from "../../core/backend/common/api/http.service";
import {catchError} from "rxjs/operators";
import {RestExtractor} from "../../core/rest/rest-extractor";

@Injectable()
export class StreamersService {
  constructor(private api: HttpService, private restExtractor: RestExtractor) {
  }

  getLiveStreams(params: HttpParams) {
    if (params == null) {
      return this.api.get('streamers')
        .pipe(catchError(err => this.restExtractor.handleError(err)));
    }

    return this.api.get('streamers', {params})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  getLiveStreamByUserLogin(userLogin: string) {
    return this.api.get('streamers/user/' + userLogin)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  getChessbookUsersStream(params: HttpParams) {
    if (params == null) {
      return this.api.get('streamers/users')
        .pipe(catchError(err => this.restExtractor.handleError(err)));
    }

    return this.api.get('streamers/users', {params})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  saveTwitchLoginName(userLogin: string) {
    return this.api.post('streamers/save/' + userLogin, {})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  editTwitchLoginName(userLogin: string, userId: number) {
    return this.api.post('streamers/edit/' + userLogin, {userId})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  deleteTwitchLoginName(userLogin: string, userId: number) {
    return this.api.post('streamers/delete/' + userLogin, {userId})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }
}
