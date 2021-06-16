import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

import {HttpService} from "../../../../core/backend/common/api/http.service";

@Injectable()
export class RelationshipsApi {
  private readonly apiController: string = 'relationships';

  constructor(private api: HttpService) {

  }

  show(params: HttpParams, url: string) {
    return this.api.get(`${this.apiController}/${url}`, {params});
  }

}
