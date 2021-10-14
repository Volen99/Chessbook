import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";

import {HttpService} from "../../../core/backend/common/api/http.service";
import {RestExtractor} from "../../../core/rest/rest-extractor";

@Injectable()
export class GdprService {

  constructor(private http: HttpService, private restExtractor: RestExtractor) {
  }

  export() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9');

    return this.http.post('users/gdpr-tools', {}, {headers, observe: 'response', responseType: 'blob'})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  delete() {
    return this.http.post('users/delete-account', {})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }
}
