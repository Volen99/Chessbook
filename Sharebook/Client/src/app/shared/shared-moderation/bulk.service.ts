import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {RestExtractor} from "../../core/rest/rest-extractor.service";
import {BulkRemoveCommentsOfBody} from "../models/bulk/bulk-remove-comments-of-body.model";

@Injectable()
export class BulkService {
  static BASE_BULK_URL = environment.apiUrl + '/api/v1/bulk';

  constructor(
    private authHttp: HttpClient,
    private restExtractor: RestExtractor,
  ) {
  }

  removeCommentsOf(body: BulkRemoveCommentsOfBody) {
    const url = BulkService.BASE_BULK_URL + '/remove-comments-of';

    return this.authHttp.post(url, body)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }
}
