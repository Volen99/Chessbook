import {Inject, Injectable, InjectionToken} from "@angular/core";

import {ComputedTweetMode} from 'src/app/core/Core/QueryGenerators/ComputedTweetMode';
import {
  IUserQueryParameterGenerator,
  IUserQueryParameterGeneratorToken
} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";
import {IGetHomeTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetUserTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {IQueryParameterGenerator, IQueryParameterGeneratorToken, QueryParameterGenerator} from "../Shared/QueryParameterGenerator";
import {UserQueryParameterGenerator} from "../User/UserQueryParameterGenerator";

export interface ITimelineQueryGenerator {
  getHomeTimelineQuery(parameters: IGetHomeTimelineParameters, tweetMode: ComputedTweetMode): string;

  getUserTimelineQuery(parameters: IGetUserTimelineParameters, tweetMode: ComputedTweetMode): string;

  // Mention Timeline
  getMentionsTimelineQuery(getMentionsTimelineParameters: IGetMentionsTimelineParameters, tweetMode: ComputedTweetMode): string;

  // Retweets of Me Timeline
  getRetweetsOfMeTimelineQuery(parameters: IGetRetweetsOfMeTimelineParameters, tweetMode: ComputedTweetMode): string;
}

export const ITimelineQueryGeneratorToken = new InjectionToken<ITimelineQueryGenerator>('ITimelineQueryGenerator', {
  providedIn: 'root',
  factory: () => new TimelineQueryGenerator(Inject(UserQueryParameterGenerator), Inject(QueryParameterGenerator)),
});

@Injectable()
export class TimelineQueryGenerator implements ITimelineQueryGenerator {
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;
  private readonly _queryParameterGenerator: IQueryParameterGenerator;

  constructor(@Inject(IUserQueryParameterGeneratorToken) userQueryParameterGenerator: IUserQueryParameterGenerator,
              @Inject(IQueryParameterGeneratorToken) queryParameterGenerator: IQueryParameterGenerator) {
    this._userQueryParameterGenerator = userQueryParameterGenerator;
    this._queryParameterGenerator = queryParameterGenerator;
  }

  // Home Timeline
  public getHomeTimelineQuery(parameters: IGetHomeTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetHomeTimeline);

    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);

    query.addParameterToQuery("exclude_replies", parameters.excludeReplies);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // User Timeline
  public getUserTimelineQuery(parameters: IGetUserTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetUserTimeline);

    query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));

    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);

    query.addParameterToQuery("exclude_replies", parameters.excludeReplies);
    query.addParameterToQuery("include_rts", parameters.includeRetweets);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Mentions Timeline
  public getMentionsTimelineQuery(parameters: IGetMentionsTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetMentionsTimeline);

    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Retweets of Me Timeline
  public getRetweetsOfMeTimelineQuery(parameters: IGetRetweetsOfMeTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetRetweetsOfMeTimeline);

    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);

    query.addParameterToQuery("include_user_entities", parameters.includeUserEntities);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
