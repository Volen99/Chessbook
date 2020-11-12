import {Inject} from "@angular/core";

import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {IUserIdentifier} from "../../../core/Public/Models/Interfaces/IUserIdentifier";
import {ITimelinesClient} from "../../../core/Public/Client/Clients/ITimelinesClient";
import {ITwitterIterator} from "../../../core/Public/Iterators/ITwitterIterator";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITimelinesRequester} from "../../../core/Public/Client/Requesters/ITimelinesRequester";
import {ITimelineClientParametersValidator} from "../../../core/Core/Client/Validators/TimelineClientParametersValidator";
import {ITweet} from "../../../core/Public/Models/Interfaces/ITweet";
import {
  GetHomeTimelineParameters,
  IGetHomeTimelineParameters
} from "../../../core/Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {TwitterIteratorProxy} from "../../../core/Core/Iterators/TwitterIteratorProxy";
import {
  GetUserTimelineParameters,
  IGetUserTimelineParameters
} from "../../../core/Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {
  GetMentionsTimelineParameters,
  IGetMentionsTimelineParameters
} from "../../../core/Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {
  GetRetweetsOfMeTimelineParameters,
  IGetRetweetsOfMeTimelineParameters
} from "../../../core/Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import Type from "typescript-dotnet-commonjs/System/Types";
import {TwitterClient} from "../../TwitterClient";

export class TimelinesClient implements ITimelinesClient {
  private readonly _client: ITwitterClient;
  private readonly _timelinesRequester: ITimelinesRequester;

  constructor(/*@Inject(ITwitterClientToken) *//*client: TwitterClient*/) {
    // this._client = client;
    // this._timelinesRequester = this._client.raw.timelines;
  }

  get parametersValidator(): ITimelineClientParametersValidator {
    return this._client.parametersValidator;
  }

  public async getHomeTimelineAsync(parameters?: IGetHomeTimelineParameters): Promise<ITweet[]> {
    let parametersCurrent: IGetHomeTimelineParameters;
    if (parameters) {
      parametersCurrent = parameters;
    } else {
      parametersCurrent = new GetHomeTimelineParameters();
    }

    let iterator = this.getHomeTimelineIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())];            // .ConfigureAwait(false)).ToArray();
  }

  public getHomeTimelineIterator(parameters?: IGetHomeTimelineParameters): ITwitterIterator<ITweet, number> {    // long?
    let parametersCurrent: IGetHomeTimelineParameters;
    if (parameters) {
      parametersCurrent = parameters;
    } else {
      parametersCurrent = new GetHomeTimelineParameters();
    }

    let pageIterator = this._timelinesRequester.getHomeTimelineIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, number>(pageIterator, twitterResult =>
      this._client.factories.createTweets(twitterResult?.model));
  }

  public async getUserTimelineAsync(userIdOrUsernameOrUserIdentifierOrParameters: number | string | IUserIdentifier | IGetUserTimelineParameters): Promise<ITweet[]> {
    let parameters: IGetUserTimelineParameters;
    if (Type.isNumber(userIdOrUsernameOrUserIdentifierOrParameters) || Type.isString(userIdOrUsernameOrUserIdentifierOrParameters)
      || this.isIUserIdentifier(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = new GetUserTimelineParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    } else {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    }

    let iterator = this.getUserTimelineIterator(parameters);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getUserTimelineIterator(userIdOrUsernameOrUserIdentifierOrParameters: number | string | IUserIdentifier | IGetUserTimelineParameters): ITwitterIterator<ITweet, number> {   // long?
    let parameters: IGetUserTimelineParameters;
    if (Type.isNumber(userIdOrUsernameOrUserIdentifierOrParameters) || Type.isString(userIdOrUsernameOrUserIdentifierOrParameters)
      || this.isIUserIdentifier(userIdOrUsernameOrUserIdentifierOrParameters)) {
      parameters = new GetUserTimelineParameters(userIdOrUsernameOrUserIdentifierOrParameters);
    } else {
      parameters = userIdOrUsernameOrUserIdentifierOrParameters;
    }

    let pageIterator = this._timelinesRequester.getUserTimelineIterator(parameters);

    return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, number>(pageIterator, twitterResult =>
      this._client.factories.createTweets(twitterResult?.model));
  }

  public async getMentionsTimelineAsync(parameters?: IGetMentionsTimelineParameters): Promise<ITweet[]> {
    let parametersCurrent: IGetMentionsTimelineParameters;
    if (parameters) {
      parametersCurrent = parameters;
    } else {
      parametersCurrent = new GetMentionsTimelineParameters();
    }

    let iterator = this.getMentionsTimelineIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getMentionsTimelineIterator(parameters?: IGetMentionsTimelineParameters): ITwitterIterator<ITweet, number> {    // long?
    let parametersCurrent: IGetMentionsTimelineParameters;
    if (parameters) {
      parametersCurrent = parameters;
    } else {
      parametersCurrent = new GetMentionsTimelineParameters();
    }

    let pageIterator = this._timelinesRequester.getMentionsTimelineIterator(parametersCurrent);
    return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, number>(pageIterator, twitterResult =>
      this._client.factories.createTweets(twitterResult?.model));
  }

  public async getRetweetsOfMeTimelineAsync(parameters?: IGetRetweetsOfMeTimelineParameters): Promise<ITweet[]> {
    let parametersCurrent: IGetRetweetsOfMeTimelineParameters;
    if (parameters) {
      parametersCurrent = parameters;
    } else {
      parametersCurrent = new GetRetweetsOfMeTimelineParameters();
    }

    let iterator = this.getRetweetsOfMeTimelineIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())];
  }

  public getRetweetsOfMeTimelineIterator(parameters?: IGetRetweetsOfMeTimelineParameters): ITwitterIterator<ITweet, number> {   // long?
    let parametersCurrent: IGetRetweetsOfMeTimelineParameters;
    if (parameters) {
      parametersCurrent = parameters;
    } else {
      parametersCurrent = new GetRetweetsOfMeTimelineParameters();
    }

    let pageIterator = this._timelinesRequester.getRetweetsOfMeTimelineIterator(parametersCurrent);

    return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, number>(pageIterator,  // long?
      twitterResult => this._client.factories.createTweets(twitterResult?.model));
  }

  private isIUserIdentifier(userIdOrUsernameOrUserIdentifierOrParameters: any): userIdOrUsernameOrUserIdentifierOrParameters is IUserIdentifier {
    return (userIdOrUsernameOrUserIdentifierOrParameters as IUserIdentifier).screenName !== undefined;
  }
}
