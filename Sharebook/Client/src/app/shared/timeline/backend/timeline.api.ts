import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {HttpService} from "../../../core/backend/common/api/http.service";
import {Post} from "../../shared-main/post/post.model";
import {ResultList} from "../../models";

// I love you God Almighty ♥
@Injectable()
export class TimelineApi {
  private readonly apiController: string = 'posts';

  constructor(private api: HttpService) {

  }

  getHomeTimelineAsync(params: HttpParams): Observable<ResultList<Post>> {
    return this.api.get<ResultList<Post>>(`${this.apiController}/home_timeline`, { params });
  }

  getUserTimelineAsync(params: HttpParams): Observable<any[]> {
    return this.api.get(this.apiController, { params });
  }

  getMentionsTimelineAsync(params: HttpParams): Observable<any[]> {
    return this.api.get(this.apiController, { params });
  }

  getRetweetsOfMeTimelineAsync(params: HttpParams): Observable<any[]> {
    return this.api.get(this.apiController, { params });
  }

}