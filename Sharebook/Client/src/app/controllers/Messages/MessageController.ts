import {Inject, Injectable} from "@angular/core";

import {IMessageController} from "../../core/Core/Controllers/IMessageController";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';
import {IMessageQueryExecutor, IMessageQueryExecutorToken} from "./MessageQueryExecutor";
import {IPublishMessageParameters} from "../../core/Public/Parameters/MessageClient/PublishMessageParameters";
import {IDeleteMessageParameters} from "../../core/Public/Parameters/MessageClient/DestroyMessageParameters";
import {ITwitterPageIterator, TwitterPageIterator} from "../../core/Core/Iterators/TwitterPageIterator";
import {IGetMessageDTO} from "../../core/Public/Models/Interfaces/DTO/IGetMessageDTO";
import {IGetMessageParameters} from "../../core/Public/Parameters/MessageClient/GetMessageParameters";
import {GetMessagesParameters, IGetMessagesParameters} from "../../core/Public/Parameters/MessageClient/GetMessagesParameters";
import {IMessageCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/IMessageCursorQueryResultDTO";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ICreateMessageDTO} from "../../core/Public/Models/Interfaces/DTO/ICreateMessageDTO";

@Injectable()
export class MessageController implements IMessageController {
  private readonly _messageQueryExecutor: IMessageQueryExecutor;

  constructor(@Inject(IMessageQueryExecutorToken) messageQueryExecutor: IMessageQueryExecutor) {
    this._messageQueryExecutor = messageQueryExecutor;
  }

  public publishMessageAsync(parameters: IPublishMessageParameters, request: ITwitterRequest): Promise<ITwitterResult<ICreateMessageDTO>> {
    return this._messageQueryExecutor.publishMessageAsync(parameters, request);
  }

  public destroyMessageAsync(parameters: IDeleteMessageParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    return this._messageQueryExecutor.destroyMessageAsync(parameters, request);
  }

  public getMessageAsync(parameters: IGetMessageParameters, request: ITwitterRequest): Promise<ITwitterResult<IGetMessageDTO>> {
    return this._messageQueryExecutor.getMessageAsync(parameters, request);
  }

  public getMessagesIterator(parameters: IGetMessagesParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>> {
    return new TwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>>(parameters.cursor,
      cursor => {
        let cursoredParameters = new GetMessagesParameters(parameters);
        cursoredParameters.cursor = cursor;

        return this._messageQueryExecutor.getMessagesAsync(cursoredParameters, new TwitterRequest(request));
      },
      page => page.model.nextCursorStr,
      page => {
        return page.model.nextCursorStr === "0" || !(page.model.nextCursorStr);
      });
  }
}
