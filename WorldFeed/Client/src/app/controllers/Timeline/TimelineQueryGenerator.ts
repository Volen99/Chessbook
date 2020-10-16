import {ComputedTweetMode} from 'src/app/core/Core/QueryGenerators/ComputedTweetMode';
import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";

export interface ITimelineQueryGenerator {
  GetHomeTimelineQuery(parameters: IGetHomeTimelineParameters, tweetMode: ComputedTweetMode): string;

  GetUserTimelineQuery(parameters: IGetUserTimelineParameters, tweetMode: ComputedTweetMode): string;

  // Mention Timeline
  GetMentionsTimelineQuery(getMentionsTimelineParameters: IGetMentionsTimelineParameters, tweetMode: ComputedTweetMode): string;

  // Retweets of Me Timeline
  GetRetweetsOfMeTimelineQuery(parameters: IGetRetweetsOfMeTimelineParameters, tweetMode: ComputedTweetMode): string;
}

export class TimelineQueryGenerator implements ITimelineQueryGenerator {
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;
  private readonly _queryParameterGenerator: IQueryParameterGenerator;

  constructor(userQueryParameterGenerator: IUserQueryParameterGenerator, queryParameterGenerator: IQueryParameterGenerator) {
    this._userQueryParameterGenerator = userQueryParameterGenerator;
    this._queryParameterGenerator = queryParameterGenerator;
  }

  // Home Timeline
  public GetHomeTimelineQuery(parameters: IGetHomeTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetHomeTimeline);

    this._queryParameterGenerator.AddTimelineParameters(query, parameters, tweetMode);

    query.addParameterToQuery("exclude_replies", parameters.ExcludeReplies);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.toString();
  }

  // User Timeline
  public GetUserTimelineQuery(parameters: IGetUserTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetUserTimeline);

    query.addFormattedParameterToQuery(this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.User));

    this._queryParameterGenerator.AddTimelineParameters(query, parameters, tweetMode);

    query.addParameterToQuery("exclude_replies", parameters.ExcludeReplies);
    query.addParameterToQuery("include_rts", parameters.IncludeRetweets);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.toString();
  }

  // Mentions Timeline
  public GetMentionsTimelineQuery(parameters: IGetMentionsTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetMentionsTimeline);

    this._queryParameterGenerator.AddTimelineParameters(query, parameters, tweetMode);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.toString();
  }

  // Retweets of Me Timeline
  public GetRetweetsOfMeTimelineQuery(parameters: IGetRetweetsOfMeTimelineParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Timeline_GetRetweetsOfMeTimeline);

    this._queryParameterGenerator.AddTimelineParameters(query, parameters, tweetMode);

    query.addParameterToQuery("include_user_entities", parameters.IncludeUserEntities);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.toString();
  }
}
