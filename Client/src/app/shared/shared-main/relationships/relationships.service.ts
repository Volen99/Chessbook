import {Injectable, OnInit} from "@angular/core";
import {HttpParams} from "@angular/common/http";

import {IGetRelationshipBetweenParameters} from "./models/get-relationship-between-parameters.model";
import {RestService} from "../../../core/rest/rest.service";
import {RelationshipsApi} from "./backend/relationships.api";

@Injectable()
export class RelationshipsService {

  constructor(private restService: RestService, private relationshipsApi: RelationshipsApi) {
  }

  show(parameters: IGetRelationshipBetweenParameters) {
    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, "source_id", parameters.SourceUser.idStr);
    params = this.restService.addParameterToQuery(params, "target_id", parameters.TargetUser.idStr);

    return this.relationshipsApi.show(params, 'show');
  }

}
