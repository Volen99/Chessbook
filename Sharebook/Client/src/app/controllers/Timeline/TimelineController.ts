import {Inject, Injectable} from "@angular/core";

import {ITimelineController} from "../../core/Core/Controllers/ITimelineController";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITimelineQueryExecutor, ITimelineQueryExecutorToken} from "./TimelineQueryExecutor";
import {IPageCursorIteratorFactories, IPageCursorIteratorFactoriesToken} from "../../core/Core/Iterators/PageCursorIteratorFactories";
import {GetHomeTimelineParameters, IGetHomeTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {ITweetDTO} from "../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterPageIterator} from "../../core/Core/Iterators/TwitterPageIterator";
import {GetUserTimelineParameters, IGetUserTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {
  GetMentionsTimelineParameters,
  IGetMentionsTimelineParameters
} from "../../core/Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {
  GetRetweetsOfMeTimelineParameters,
  IGetRetweetsOfMeTimelineParameters
} from "../../core/Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";

@Injectable({
  providedIn: 'root',
})
export class TimelineController implements ITimelineController {
  private readonly _timelineQueryExecutor: ITimelineQueryExecutor;
  private readonly _pageCursorIteratorFactories: IPageCursorIteratorFactories;

  constructor(@Inject(ITimelineQueryExecutorToken) timelineQueryExecutor: ITimelineQueryExecutor,
              @Inject(IPageCursorIteratorFactoriesToken) pageCursorIteratorFactories: IPageCursorIteratorFactories) {
    this._timelineQueryExecutor = timelineQueryExecutor;
    this._pageCursorIteratorFactories = pageCursorIteratorFactories;
  }

  // Home Timeline
  public getHomeTimelineIterator(parameters: IGetHomeTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> {        // long?
    return this._pageCursorIteratorFactories.create(parameters, cursor => {
      let cursoredParameters = new GetHomeTimelineParameters(parameters);
      cursoredParameters.maxId = cursor;

      return this._timelineQueryExecutor.getHomeTimelineAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

  public getUserTimelineIterator(parameters: IGetUserTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> {          // long?
    return this._pageCursorIteratorFactories.create(parameters, cursor => {
      let cursoredParameters = new GetUserTimelineParameters(parameters);
      cursoredParameters.maxId = cursor;

      return this._timelineQueryExecutor.getUserTimelineAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

  public getMentionsTimelineIterator(parameters: IGetMentionsTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> {   // long?
    return this._pageCursorIteratorFactories.create(parameters, cursor => {
      let cursoredParameters = new GetMentionsTimelineParameters(parameters);
      cursoredParameters.maxId = cursor;


      return this._timelineQueryExecutor.getMentionsTimelineAsync(cursoredParameters, new TwitterRequest(request));
    });
  }

  public getRetweetsOfMeTimelineIterator(parameters: IGetRetweetsOfMeTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> {  // long?
    return this._pageCursorIteratorFactories.create(parameters, cursor => {
      let cursoredParameters = new GetRetweetsOfMeTimelineParameters(parameters);
      cursoredParameters.maxId = cursor;

      return this._timelineQueryExecutor.getRetweetsOfMeTimelineAsync(cursoredParameters, new TwitterRequest(request));
    });
  }
}
