import {Inject, Injectable} from "@angular/core";

import {BaseRequester} from "../BaseRequester";
import {IMessageRequester} from "../../../core/Public/Client/Requesters/IMessageRequester";
import {
  IMessagesClientParametersValidator,
  IMessagesClientParametersValidatorToken
} from "../../../core/Core/Client/Validators/MessageClientParametersValidator";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {IMessageController, IMessageControllerToken} from "../../../core/Core/Controllers/IMessageController";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {IPublishMessageParameters} from "../../../core/Public/Parameters/MessageClient/PublishMessageParameters";
import {ICreateMessageDTO} from "../../../core/Public/Models/Interfaces/DTO/ICreateMessageDTO";
import {IDeleteMessageParameters} from "../../../core/Public/Parameters/MessageClient/DestroyMessageParameters";
import {IGetMessageDTO} from "../../../core/Public/Models/Interfaces/DTO/IGetMessageDTO";
import {IGetMessageParameters} from "../../../core/Public/Parameters/MessageClient/GetMessageParameters";
import {IGetMessagesParameters} from "../../../core/Public/Parameters/MessageClient/GetMessagesParameters";
import {ITwitterPageIterator} from "../../../core/Core/Iterators/TwitterPageIterator";
import {IMessageCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IMessageCursorQueryResultDTO";
import {JsonQueryConverterRepository} from "../../../core/Core/JsonConverters/JsonQueryConverterRepository";

@Injectable({
  providedIn: 'root',
})
export class MessageRequester extends BaseRequester implements IMessageRequester {
  private readonly _messageController: IMessageController;
  private readonly _messagesClientParametersValidator: IMessagesClientParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IMessageControllerToken) messageController: IMessageController,
              @Inject(IMessagesClientParametersValidatorToken) messagesClientParametersValidator: IMessagesClientParametersValidator,
              @Inject(ITwitterClientEventsToken) twitterClientEvents: ITwitterClientEvents) {
    super(client, twitterClientEvents);
    this._messageController = messageController;
    this._messagesClientParametersValidator = messagesClientParametersValidator;
  }

  public publishMessageAsync(parameters: IPublishMessageParameters): Promise<ITwitterResult<ICreateMessageDTO>> {
    this._messagesClientParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._messageController.publishMessageAsync(parameters, request));
  }

  public destroyMessageAsync(parameters: IDeleteMessageParameters): Promise<ITwitterResult> {
    this._messagesClientParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._messageController.destroyMessageAsync(parameters, request));
  }

  public getMessageAsync(parameters: IGetMessageParameters): Promise<ITwitterResult<IGetMessageDTO>> {
    this._messagesClientParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._messageController.getMessageAsync(parameters, request));
  }

  public getMessagesIterator(parameters: IGetMessagesParameters): ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>> {
    this._messagesClientParametersValidator.validate(parameters);

    let request = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._messageController.getMessagesIterator(parameters, request);
  }
}
