import {Inject, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../Web/TwitterResult";
import {IGetHomeTimelineParameters} from "../../Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetUserTimelineParameters} from "../../Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {ITwitterPageIterator} from "../Iterators/TwitterPageIterator";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";
import {TimelineController} from "../../../controllers/Timeline/TimelineController";
import {TimelineQueryExecutor} from "../../../controllers/Timeline/TimelineQueryExecutor";
import {PageCursorIteratorFactories} from "../Iterators/PageCursorIteratorFactories";

export interface ITimelineController {
  getHomeTimelineIterator(parameters: IGetHomeTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
  getUserTimelineIterator(parameters: IGetUserTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
  getMentionsTimelineIterator(parameters: IGetMentionsTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
  getRetweetsOfMeTimelineIterator(parameters: IGetRetweetsOfMeTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
}

export const ITimelineControllerToken = new InjectionToken<ITimelineController>('ITimelineController', {
  providedIn: 'root',
  factory: () => new TimelineController(Inject(TimelineQueryExecutor), Inject(PageCursorIteratorFactories)),
});
