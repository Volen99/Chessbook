import {Inject, Injectable} from "@angular/core";

import {IMessagesClientParametersValidator} from "../../../core/Core/Client/Validators/MessageClientParametersValidator";
import {IUserIdentifier} from "../../../core/Public/Models/Interfaces/IUserIdentifier";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {IMessagesClient} from "../../../core/Public/Client/Clients/IMessagesClient";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IMessageRequester, IMessageRequesterToken} from "../../../core/Public/Client/Requesters/IMessageRequester";
import {IMessage} from "../../../core/Public/Models/Interfaces/IMessage";
import {IPublishMessageParameters, PublishMessageParameters} from "../../../core/Public/Parameters/MessageClient/PublishMessageParameters";
import {GetMessageParameters, IGetMessageParameters} from "../../../core/Public/Parameters/MessageClient/GetMessageParameters";
import {GetMessagesParameters, IGetMessagesParameters} from "../../../core/Public/Parameters/MessageClient/GetMessagesParameters";
import {ITwitterIterator} from "../../../core/Public/Iterators/ITwitterIterator";
import {IMessageCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IMessageCursorQueryResultDTO";
import {TwitterIteratorProxy} from "../../../core/Core/Iterators/TwitterIteratorProxy";
import {MessageEventWithAppDTO} from "../../../core/Core/DTO/MessageEventWithAppDTO";
import {IMessageEventWithAppDTO} from "../../../core/Public/Models/Interfaces/DTO/IMessageEventWithAppDTO";
import {DestroyMessageParameters, IDeleteMessageParameters} from "../../../core/Public/Parameters/MessageClient/DestroyMessageParameters";
import Type from "typescript-dotnet-commonjs/System/Types";

@Injectable({
  providedIn: 'root',
})
export class MessagesClient implements IMessagesClient {
  private readonly _client: ITwitterClient;
  private readonly _messageRequester: IMessageRequester;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IMessageRequesterToken) messageRequester: IMessageRequester) {
    this._client = client;
    this._messageRequester = messageRequester;
  }

  get parametersValidator(): IMessagesClientParametersValidator {
    return this._client.parametersValidator;
  }

  public async publishMessageAsync(textOrParameters: string | IPublishMessageParameters, recipientIdOrUser?: number | IUserIdentifier): Promise<IMessage> {
    let parameters: IPublishMessageParameters;
    if (Type.isString(textOrParameters)) {
      let recipientId: number;
      if (Type.isNumber(recipientIdOrUser)) {
        recipientId = recipientIdOrUser;
      } else {
        recipientId = recipientIdOrUser.id;
      }

      parameters = new PublishMessageParameters(textOrParameters, recipientId);
    } else {
      parameters = textOrParameters;
    }

    let twitterResult = await this._messageRequester.publishMessageAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createMessage(twitterResult?.model);
  }

  public async getMessageAsync(messageIdOrParameters: number | IGetMessageParameters): Promise<IMessage> {
    let parameters: IGetMessageParameters;
    if (Type.isNumber(messageIdOrParameters)) {
      parameters = new GetMessageParameters(messageIdOrParameters);
    } else {
      parameters = messageIdOrParameters;
    }

    let twitterResult = await this._messageRequester.getMessageAsync(parameters); // .ConfigureAwait(false);
    return this._client.factories.createMessage(twitterResult?.model);
  }

  public async getMessagesAsync(parameters?: IGetMessagesParameters): Promise<IMessage[]> {
    let parametersCurrent: IGetMessagesParameters;
    if (!parameters) {
      parametersCurrent = new GetMessagesParameters();
    } else {
      parametersCurrent = parameters;
    }

    let iterator = this.getMessagesIterator(parametersCurrent);
    return [...(await iterator.nextPageAsync())]; // .ConfigureAwait(false)).ToArray();
  }

  public getMessagesIterator(parameters?: IGetMessagesParameters): ITwitterIterator<IMessage> {
    let parametersCurrent: IGetMessagesParameters;
    if (!parameters) {
      parametersCurrent = new GetMessagesParameters();
    } else {
      parametersCurrent = parameters;
    }

    let pageIterator = this._messageRequester.getMessagesIterator(parametersCurrent);

    return new TwitterIteratorProxy<ITwitterResult<IMessageCursorQueryResultDTO>, IMessage>(pageIterator, twitterResult => {
      let messageEventDtos = twitterResult.model.messageEvents;
      let messageDtos = messageEventDtos.map(dto => {
        let messageDto = new MessageEventWithAppDTO();
        messageDto.messageEvent = dto;

        let appId = dto.messageCreate.sourceAppId;
        if (appId != null && twitterResult.model.apps != null && twitterResult.model.apps.containsKey(appId)) {
          messageDto.app = twitterResult.model.apps[appId];
        }

        return messageDto as IMessageEventWithAppDTO;
      });

      return this._client.factories.createMessages(messageDtos);
    });
  }

  public destroyMessageAsync(messageIdOrMessageOrParameters: number | IMessage | IDeleteMessageParameters): Promise<any> {
    let parametersCurrent: IDeleteMessageParameters;
    if (Type.isNumber(messageIdOrMessageOrParameters) || MessagesClient.isIMessage(messageIdOrMessageOrParameters)) {
      parametersCurrent = new DestroyMessageParameters(messageIdOrMessageOrParameters);
    } else {
      parametersCurrent = messageIdOrMessageOrParameters;
    }

    return this._messageRequester.destroyMessageAsync(parametersCurrent);
  }

  private static isIMessage(messageIdOrMessageOrParameters: number | IMessage | IDeleteMessageParameters):
    messageIdOrMessageOrParameters is IMessage {
    return (messageIdOrMessageOrParameters as IMessage).client !== undefined;
  }
}
