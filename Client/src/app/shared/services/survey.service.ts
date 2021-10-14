import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";

import {HttpService} from "../../core/backend/common/api/http.service";
import {RestExtractor} from "../../core/rest/rest-extractor";

@Injectable()
export class SurveyService {

  constructor(private http: HttpService, private restExtractor: RestExtractor) {
  }

  publish(poll: any) {
    return this.http.post('admin/survey/create', poll)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  vote(selected: {}) {
    return this.http.post(`poll/vote/${selected}`, {})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  getPoll(id: number) {
    return this.http.get(`poll/${id}`)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }
}
