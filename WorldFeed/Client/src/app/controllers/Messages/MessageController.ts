import {IMessageController} from "../../core/Core/Controllers/IMessageController";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import { ITwitterRequest } from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';

export class MessageController implements IMessageController
    {
        private readonly _messageQueryExecutor: IMessageQueryExecutor;

        constructor(messageQueryExecutor: IMessageQueryExecutor)
        {
            this._messageQueryExecutor = messageQueryExecutor;
        }

        public publishMessageAsync(parameters: IPublishMessageParameters, request: ITwitterRequest):  Task<ITwitterResult<ICreateMessageDTO>>
        {
            return this._messageQueryExecutor.PublishMessageAsync(parameters, request);
        }

        public  destroyMessageAsync(parameters: IDeleteMessageParameters, request: ITwitterRequest): Task<ITwitterResult>
        {
            return this._messageQueryExecutor.DestroyMessageAsync(parameters, request);
        }

        public  getMessageAsync(parameters: IGetMessageParameters, request: ITwitterRequest): Task<ITwitterResult<IGetMessageDTO>>
        {
            return this._messageQueryExecutor.GetMessageAsync(parameters, request);
        }

        public  getMessagesIterator(parameters: IGetMessagesParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>>
        {
            return new TwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>>(
                parameters.cursor,
                cursor =>
                {
                    var cursoredParameters = new GetMessagesParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this._messageQueryExecutor.GetMessagesAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page =>
                {
                    return page.Model.NextCursorStr == "0" || string.IsNullOrEmpty(page.Model.NextCursorStr);
                });
        }
    }
