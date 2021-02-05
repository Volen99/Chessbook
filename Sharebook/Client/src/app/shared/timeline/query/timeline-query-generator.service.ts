import {Injectable} from "@angular/core";

import {RestService} from "../../../core/rest/rest.service";
import {UserQueryParameterGeneratorService} from "../../services/user-query-parameter-generator.service";
import {IGetHomeTimelineParameters} from "../../models/timeline/get-home-timeline-parameters";
import {Resources} from "../../../helpers/resourse";
import {IGetUserTimelineParameters} from "../../models/timeline/get-user-timeline-parameters";
import {IGetMentionsTimelineParameters} from "../../models/timeline/get-mentions-timeline-parameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../models/timeline/get-retweets-of-me-timeline-parameters";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class TimelineQueryGeneratorService {
  constructor(private restService: RestService,
              private userQueryParameterGenerator: UserQueryParameterGeneratorService) {
  }

  // Home Timeline
  public getHomeTimelineQuery(parameters: IGetHomeTimelineParameters): HttpParams {
    let params = new HttpParams();

    params = this.restService.addTimelineParameters(params, parameters);

    params = this.restService.addParameterToQuery(params, "exclude_replies", parameters.excludeReplies);
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  // User Timeline
  public getUserTimelineQuery(parameters: IGetUserTimelineParameters): HttpParams {
    let query = new HttpParams();

    this.restService.addFormattedParameterToQuery(query, this.userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));

    this.restService.addTimelineParameters(query, parameters);

    this.restService.addParameterToQuery(query, "exclude_replies", parameters.excludeReplies);
    this.restService.addParameterToQuery(query, "include_rts", parameters.includeRetweets);
    this.restService.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query;
  }

  // Mentions Timeline
  public getMentionsTimelineQuery(parameters: IGetMentionsTimelineParameters): HttpParams {
    let query = new HttpParams();

    this.restService.addTimelineParameters(query, parameters);
    this.restService.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query;
  }

  // Retweets of Me Timeline
  public getRetweetsOfMeTimelineQuery(parameters: IGetRetweetsOfMeTimelineParameters): HttpParams {
    let query = new HttpParams();

    this.restService.addTimelineParameters(query, parameters);

    this.restService.addParameterToQuery(query, "include_user_entities", parameters.includeUserEntities);
    this.restService.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query;
  }
}
