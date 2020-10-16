import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../Web/TwitterResult";
import {IGetHomeTimelineParameters} from "../../Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetUserTimelineParameters} from "../../Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {ITwitterPageIterator} from "../Iterators/TwitterPageIterator";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";

export interface ITimelineController {
  getHomeTimelineIterator(parameters: IGetHomeTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
  getUserTimelineIterator(parameters: IGetUserTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
  getMentionsTimelineIterator(parameters: IGetMentionsTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
  getRetweetsOfMeTimelineIterator(parameters: IGetRetweetsOfMeTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number>; // long?
}
