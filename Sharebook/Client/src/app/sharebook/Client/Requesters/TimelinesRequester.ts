import {Inject, Injectable} from "@angular/core";

import {BaseRequester} from "../BaseRequester";
import {ITimelinesRequester} from "../../../core/Public/Client/Requesters/ITimelinesRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {ITimelineController, ITimelineControllerToken} from "../../../core/Core/Controllers/ITimelineController";
import {
  ITimelineClientRequiredParametersValidator,
  ITimelineClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/TimelineClientRequiredParametersValidator";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IGetUserTimelineParameters} from "../../../core/Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {ITwitterPageIterator} from "../../../core/Core/Iterators/TwitterPageIterator";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {IGetHomeTimelineParameters} from "../../../core/Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../../core/Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../../core/Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";

@Injectable({
  providedIn: 'root',
})
export class TimelinesRequester extends BaseRequester implements ITimelinesRequester {
  private readonly _timelineController: ITimelineController;
  private readonly _validator: ITimelineClientRequiredParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) clientEvents: ITwitterClientEvents,
              @Inject(ITimelineControllerToken) timelineController: ITimelineController,
              @Inject(ITimelineClientRequiredParametersValidatorToken) validator: ITimelineClientRequiredParametersValidator) {
    super(client, clientEvents);

    this._timelineController = timelineController;
    this._validator = validator;
  }

  public getUserTimelineIterator(parameters: IGetUserTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.createRequest();
    return this._timelineController.getUserTimelineIterator(parameters, request);
  }

  public getHomeTimelineIterator(parameters: IGetHomeTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.createRequest();
    return this._timelineController.getHomeTimelineIterator(parameters, request);
  }

  public getRetweetsOfMeTimelineIterator(parameters: IGetRetweetsOfMeTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> {  // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.createRequest();
    return this._timelineController.getRetweetsOfMeTimelineIterator(parameters, request);
  }

  public getMentionsTimelineIterator(parameters: IGetMentionsTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.createRequest();
    return this._timelineController.getMentionsTimelineIterator(parameters, request);
  }
}
