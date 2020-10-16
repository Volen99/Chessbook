import {BaseRequester} from "../BaseRequester";
import {ITimelinesRequester} from "../../../core/Public/Client/Requesters/ITimelinesRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {ITimelineController} from "../../../core/Core/Controllers/ITimelineController";
import {ITimelineClientRequiredParametersValidator} from "../../../core/Core/Client/Validators/TimelineClientRequiredParametersValidator";
import {ITwitterClient} from "../../../core/Public/ITwitterClient";
import {IGetUserTimelineParameters} from "../../../core/Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {ITwitterPageIterator} from "../../../core/Core/Iterators/TwitterPageIterator";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {IGetHomeTimelineParameters} from "../../../core/Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../../core/Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../../core/Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {ITwitterClientEvents} from "../../../core/Core/Events/TweetinviGlobalEvents";

export class TimelinesRequester extends BaseRequester implements ITimelinesRequester {
  private readonly _timelineController: ITimelineController;
  private readonly _validator: ITimelineClientRequiredParametersValidator;

  constructor(client: ITwitterClient, clientEvents: ITwitterClientEvents, timelineController: ITimelineController,
              validator: ITimelineClientRequiredParametersValidator) {
    super(client, clientEvents);
    this._timelineController = timelineController;
    this._validator = validator;
  }

  public getUserTimelineIterator(parameters: IGetUserTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    return this._timelineController.getUserTimelineIterator(parameters, request);
  }

  public getHomeTimelineIterator(parameters: IGetHomeTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    return this._timelineController.getHomeTimelineIterator(parameters, request);
  }

  public getRetweetsOfMeTimelineIterator(parameters: IGetRetweetsOfMeTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> {  // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    return this._timelineController.getRetweetsOfMeTimelineIterator(parameters, request);
  }

  public getMentionsTimelineIterator(parameters: IGetMentionsTimelineParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> { // long?
    this._validator.validate(parameters);

    let request = super.TwitterClient.CreateRequest();
    return this._timelineController.getMentionsTimelineIterator(parameters, request);
  }
}
