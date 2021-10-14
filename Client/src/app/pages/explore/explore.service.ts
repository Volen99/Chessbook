import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {RestService} from "../../core/rest/rest.service";
import {RestExtractor} from "../../core/rest/rest-extractor";
import {catchError} from "rxjs/operators";

export class NewsPost {
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
}

export interface Pagination {
  limit: number;
  offset: number;
  count: number;
  total: number;
}


const TOTAL_PAGES = 7;

@Injectable()
export class ExploreService {
  private readonly ACCESS_KEY = 'da15f48b7a3df86235e7cb85e0379467';

  constructor(private http: HttpClient, private restService: RestService, private restExtractor: RestExtractor) {

  }

  load(limit: number, offset: number): Observable<any> {
    // const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;

    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, 'access_key', this.ACCESS_KEY);
    params = this.restService.addParameterToQuery(params, 'keywords', 'chess');
    params = this.restService.addParameterToQuery(params, 'sort', 'published_desc');
    params = this.restService.addParameterToQuery(params, 'limit', `${limit}`);
    params = this.restService.addParameterToQuery(params, 'offset', `${offset}`);

    // Access Restricted - Your current Subscription Plan does not support HTTPS Encryption.
    return this.http
      .get<any>(`http://api.mediastack.com/v1/news?${params}`)
      .pipe(catchError(err => this.restExtractor.handleError(err))); //
      // .pipe(
      //   map(news => news.splice(startIndex, pageSize)),
      //   delay(1500),
      // );
  }
}
