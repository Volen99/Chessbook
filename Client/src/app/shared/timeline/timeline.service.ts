import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {IGetHomeTimelineParameters} from "../models/timeline/get-home-timeline-parameters";
import {IGetUserTimelineParameters} from "../models/timeline/get-user-timeline-parameters";
import {IGetMentionsTimelineParameters} from "../models/timeline/get-mentions-timeline-parameters";
import {IGetRetweetsOfMeTimelineParameters} from "../models/timeline/get-retweets-of-me-timeline-parameters";
import {RestService} from "../../core/rest/rest.service";
import {TimelineQueryGeneratorService} from "./query/timeline-query-generator.service";
import {TimelineApi} from "./backend/timeline.api";
import {IPost} from "../posts/models/post.model";

@Injectable()
export class TimelineService {

  constructor(private restService: RestService,
              private timelineQueryGeneratorService : TimelineQueryGeneratorService,
              private timelineApi: TimelineApi) {
  }

  // Home Timeline
  public getHomeTimelineAsync(parameters: IGetHomeTimelineParameters): Observable<IPost[]> {
    let params = this.timelineQueryGeneratorService.getHomeTimelineQuery(parameters);

    return  null;  // this.timelineApi.getHomeTimelineAsync(params);
  }

  public getUserTimelineAsync(parameters: IGetUserTimelineParameters): Observable<any[]> {
    let params = this.timelineQueryGeneratorService.getUserTimelineQuery(parameters);

    return null; // this.timelineApi.getUserTimelineAsync(params);
  }

  // Mention Timeline
  public getMentionsTimelineAsync(parameters: IGetMentionsTimelineParameters): Observable<any[]> {
    let params = this.timelineQueryGeneratorService.getMentionsTimelineQuery(parameters);

    return this.timelineApi.getMentionsTimelineAsync(params);
  }

  // Retweets of Me Timeline
  public getRetweetsOfMeTimelineAsync(parameters: IGetRetweetsOfMeTimelineParameters): Observable<any[]> {
    let params = this.timelineQueryGeneratorService.getRetweetsOfMeTimelineQuery(parameters);

    return this.timelineApi.getRetweetsOfMeTimelineAsync(params);
  }
}
