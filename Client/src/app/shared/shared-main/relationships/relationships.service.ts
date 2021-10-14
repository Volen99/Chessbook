import {Injectable} from "@angular/core";

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
