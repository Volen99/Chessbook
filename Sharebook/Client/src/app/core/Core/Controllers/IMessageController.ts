import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from '../Web/TwitterResult';
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {IPublishMessageParameters} from "../../Public/Parameters/MessageClient/PublishMessageParameters";
import {IDeleteMessageParameters} from "../../Public/Parameters/MessageClient/DestroyMessageParameters";
import {IGetMessageParameters} from "../../Public/Parameters/MessageClient/GetMessageParameters";
import {IGetMessagesParameters} from "../../Public/Parameters/MessageClient/GetMessagesParameters";
import {IGetMessageDTO} from "../../Public/Models/Interfaces/DTO/IGetMessageDTO";
import {ICreateMessageDTO} from "../../Public/Models/Interfaces/DTO/ICreateMessageDTO";
import {IMessageCursorQueryResultDTO} from "../../Public/Models/Interfaces/DTO/QueryDTO/IMessageCursorQueryResultDTO";
import {ITwitterPageIterator} from "../Iterators/TwitterPageIterator";
import {MessageController} from "../../../controllers/Messages/MessageController";
import {MessageQueryExecutor} from "../../../controllers/Messages/MessageQueryExecutor";

export interface IMessageController {
  publishMessageAsync(parameters: IPublishMessageParameters, request: ITwitterRequest): Promise<ITwitterResult<ICreateMessageDTO>>;

  destroyMessageAsync(parameters: IDeleteMessageParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  getMessageAsync(parameters: IGetMessageParameters, request: ITwitterRequest): Promise<ITwitterResult<IGetMessageDTO>>;

  getMessagesIterator(parameters: IGetMessagesParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>>;
}

export const IMessageControllerToken = new InjectionToken<IMessageController>('IMessageController', {
  providedIn: 'root',
  factory: () => new MessageController(inject(MessageQueryExecutor)),
});
