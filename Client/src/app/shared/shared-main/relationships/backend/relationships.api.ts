import {Injectable} from "@angular/core";

import {HttpService} from "../../../../core/backend/common/api/http.service";
import {RestExtractor} from "../../../../core/rest/rest-extractor";
import {catchError} from "rxjs/operators";

@Injectable()
export class RelationshipsApi {
  private readonly apiController: string = 'relationships';

  constructor(private api: HttpService, private restExtractor: RestExtractor) {

  }

  fetchRelationships(url: string) {
    return this.api.get(`${url}`)
      .pipe(catchError(err => this.restExtractor.handleError(err)));
  }

}
