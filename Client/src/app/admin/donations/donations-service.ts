import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";

import {HttpService} from "app/core/backend/common/api/http.service";
import {RestExtractor} from "../../core/rest/rest-extractor";
import {ITournament} from "../../pages/more/tournaments/tournaments.component";
import {ResultList} from "../../shared/models";

@Injectable()
export class DonationsService {

  constructor(private http: HttpService, private restExtractor: RestExtractor) {
  }

  create(body: object) {
    return this.http.post('admin/donators/create', body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  edit(id: number, body: object) {
    return this.http.post('admin/donators/edit/' + id, body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  delete(id: number) {
    return this.http.post('admin/donators/delete/' + id, {})
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

  listDonators(toListFor: 'public' | 'admin') {
    let url;
    if (toListFor === 'public') {
      url = 'donators/list';
    } else {
      url = 'admin/donators/list';
    }

    return this.http.get<ResultList<ITournament>>(url)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

}
