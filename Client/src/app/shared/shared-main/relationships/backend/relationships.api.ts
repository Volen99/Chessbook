import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

import {HttpService} from "../../../../core/backend/common/api/http.service";

@Injectable()
export class RelationshipsApi {
  private readonly apiController: string = 'relationships';

  constructor(private api: HttpService) {

  }

  fetchRelationships(url: string) {
    return this.api.get(`${url}`);
  }

}
