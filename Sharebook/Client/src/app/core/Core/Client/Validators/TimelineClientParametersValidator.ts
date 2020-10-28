import {Inject, Injectable, InjectionToken} from "@angular/core";

import {IGetUserTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {IGetHomeTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {ITwitterClient, ITwitterClientToken} from "../../../Public/ITwitterClient";
import {
  ITimelineClientRequiredParametersValidator,
  ITimelineClientRequiredParametersValidatorToken, TimelineClientRequiredParametersValidator
} from "./TimelineClientRequiredParametersValidator";
import {TwitterLimits} from "../../../Public/Settings/TwitterLimits";
import {TimelineParameters} from "./parameters-types";
import {TwitterArgumentLimitException} from "../../../Public/Exceptions/TwitterArgumentLimitException";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface ITimelineClientParametersValidator {
  validate(parameters: IGetHomeTimelineParameters): void;

  validate(parameters: IGetUserTimelineParameters): void;

  validate(parameters: IGetMentionsTimelineParameters): void;

  validate(parameters: IGetRetweetsOfMeTimelineParameters): void;
}

export const ITimelineClientParametersValidatorToken = new InjectionToken<ITimelineClientParametersValidator>('ITimelineClientParametersValidator', {
  providedIn: 'root',
  factory: () => new TimelineClientParametersValidator(Inject(TwitterClient), Inject(TimelineClientRequiredParametersValidator)),
});

@Injectable()
export class TimelineClientParametersValidator implements ITimelineClientParametersValidator {
  private readonly _timelineClientRequiredParametersValidator: ITimelineClientRequiredParametersValidator;
  private readonly _client: ITwitterClient;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITimelineClientRequiredParametersValidatorToken) timelineClientRequiredParametersValidator: ITimelineClientRequiredParametersValidator) {
    this._client = client;
    this._timelineClientRequiredParametersValidator = timelineClientRequiredParametersValidator;
  }

  get Limits(): TwitterLimits {
    return this._client.config.limits;
  }

  public validate(parameters: TimelineParameters): void {
    this._timelineClientRequiredParametersValidator.validate(parameters);

    let maxPageSize: number;
    if (this.isIGetHomeTimelineParameters(parameters)) {
      maxPageSize = this.Limits.TIMELINE_HOME_PAGE_MAX_PAGE_SIZE;
    } else if (this.isIGetUserTimelineParameters(parameters)) {
      maxPageSize = this.Limits.TIMELINE_USER_PAGE_MAX_PAGE_SIZE;
    } else if (this.isIGetMentionsTimelineParameters(parameters)) {
      maxPageSize = this.Limits.TIMELINE_MENTIONS_PAGE_MAX_PAGE_SIZE;
    } else if (this.isIGetRetweetsOfMeTimelineParameters(parameters)) {
      maxPageSize = this.Limits.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE;
    }

    if (parameters.pageSize > maxPageSize) {
      throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.TIMELINE_RETWEETS_OF_ME_MAX_PAGE_SIZE), "page size");
    }

  }

  private isIGetHomeTimelineParameters(parameters: TimelineParameters): parameters is IGetHomeTimelineParameters {
    return (parameters as IGetHomeTimelineParameters).excludeReplies !== undefined;
  }

  private isIGetUserTimelineParameters(parameters: TimelineParameters): parameters is IGetUserTimelineParameters {
    return (parameters as IGetUserTimelineParameters).excludeReplies !== undefined;
  }

  private isIGetMentionsTimelineParameters(parameters: TimelineParameters): parameters is IGetMentionsTimelineParameters {
    return (parameters as IGetMentionsTimelineParameters).maxId !== undefined;
  }

  private isIGetRetweetsOfMeTimelineParameters(parameters: TimelineParameters): parameters is IGetRetweetsOfMeTimelineParameters {
    return (parameters as IGetRetweetsOfMeTimelineParameters).maxId !== undefined;
  }
}
