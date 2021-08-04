import {Injectable, OnInit} from "@angular/core";
import {HttpParams} from "@angular/common/http";

import {IGetRelationshipBetweenParameters} from "./models/get-relationship-between-parameters.model";
import {RestService} from "../../../core/rest/rest.service";
import {RelationshipsApi} from "./backend/relationships.api";

@Injectable()
export class RelationshipsService {

  constructor(private restService: RestService, private relationshipsApi: RelationshipsApi) {
  }

  fetchRelationships(accountIds: number[]) {
    return this.relationshipsApi.fetchRelationships(`relationships?${accountIds.map(id => `id[]=${id}`).join('&')}`);
  }

}
