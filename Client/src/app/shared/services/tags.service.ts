import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";

import {HttpService} from "../../core/backend/common/api/http.service";
import {RestService} from "../../core/rest/rest.service";
import {RestExtractor} from "../../core/rest/rest-extractor";

@Injectable()
export class TagsService {

  constructor(private http: HttpService, private restService: RestService,
              private restExtractor: RestExtractor) {
  }

  // pass 0 to get all tags
  getPostTags(count: number) {
    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, 'count', count.toString());

    let url = 'posts/tags';
    return this.http.get(url, {params})
      .pipe(catchError(res => this.restExtractor.handleError(res)));
  }
}
