import {ITimelineController} from "../../core/Core/Controllers/ITimelineController";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";

export class TimelineController implements ITimelineController
    {
        private readonly _timelineQueryExecutor: ITimelineQueryExecutor;
        private readonly _pageCursorIteratorFactories: IPageCursorIteratorFactories;

        constructor(timelineQueryExecutor: ITimelineQueryExecutor, pageCursorIteratorFactories: IPageCursorIteratorFactories)
        {
            this._timelineQueryExecutor = timelineQueryExecutor;
            this._pageCursorIteratorFactories = pageCursorIteratorFactories;
        }

        // Home Timeline

        public getHomeTimelineIterator(parameters: IGetHomeTimelineParameters, request: ITwitterRequest):  ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> // long?
        {
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetHomeTimelineParameters(parameters)
                {
                    MaxId = cursor
                };

                return this._timelineQueryExecutor.GetHomeTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public getUserTimelineIterator(parameters: IGetUserTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> // long?
{
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetUserTimelineParameters(parameters)
                {
                    MaxId = cursor
                };

                return this._timelineQueryExecutor.GetUserTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public getMentionsTimelineIterator(parameters: IGetMentionsTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> // long?
{
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetMentionsTimelineParameters(parameters)
                {
                    MaxId = cursor
                };

                return  this._timelineQueryExecutor.GetMentionsTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public getRetweetsOfMeTimelineIterator(parameters: IGetRetweetsOfMeTimelineParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> // long?
{
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetRetweetsOfMeTimelineParameters(parameters)
                {
                    MaxId = cursor
                };

                return this._timelineQueryExecutor.GetRetweetsOfMeTimelineAsync(cursoredParameters, new TwitterRequest(request));
            });
        }
    }
