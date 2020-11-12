import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ComputedTweetMode} from 'src/app/core/Core/QueryGenerators/ComputedTweetMode';
import {
  IUserQueryParameterGenerator,
  IUserQueryParameterGeneratorToken
} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {Resources} from "../../properties/resources";
import {IGetHomeTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetUserTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {IQueryParameterGenerator, IQueryParameterGeneratorToken, QueryParameterGenerator} from "../Shared/QueryParameterGenerator";
import {UserQueryParameterGenerator} from "../User/UserQueryParameterGenerator";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

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
  factory: () => new TimelineQueryGenerator(inject(UserQueryParameterGenerator), inject(QueryParameterGenerator)),
});

@Injectable({
  providedIn: 'root',
})
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

    StringBuilderExtensions.addParameterToQuery(query, "exclude_replies", parameters.excludeReplies);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // User Timeline
  public getUserTimelineQuery(parameters: IGetUserTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetUserTimeline);

    StringBuilderExtensions.addFormattedParameterToQuery(query, this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user));

    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);

    StringBuilderExtensions.addParameterToQuery(query, "exclude_replies", parameters.excludeReplies);
    StringBuilderExtensions.addParameterToQuery(query, "include_rts", parameters.includeRetweets);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Mentions Timeline
  public getMentionsTimelineQuery(parameters: IGetMentionsTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetMentionsTimeline);

    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Retweets of Me Timeline
  public getRetweetsOfMeTimelineQuery(parameters: IGetRetweetsOfMeTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetRetweetsOfMeTimeline);

    this._queryParameterGenerator.addTimelineParameters(query, parameters, tweetMode);

    StringBuilderExtensions.addParameterToQuery(query, "include_user_entities", parameters.includeUserEntities);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
