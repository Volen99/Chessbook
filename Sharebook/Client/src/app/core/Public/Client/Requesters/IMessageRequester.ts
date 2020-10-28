import {Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {IPublishMessageParameters} from "../../Parameters/MessageClient/PublishMessageParameters";
import {ICreateMessageDTO} from "../../Models/Interfaces/DTO/ICreateMessageDTO";
import {IDeleteMessageParameters} from "../../Parameters/MessageClient/DestroyMessageParameters";
import {IGetMessageParameters} from "../../Parameters/MessageClient/GetMessageParameters";
import {IGetMessageDTO} from "../../Models/Interfaces/DTO/IGetMessageDTO";
import {IGetMessagesParameters} from "../../Parameters/MessageClient/GetMessagesParameters";
import {IMessageCursorQueryResultDTO} from "../../Models/Interfaces/DTO/QueryDTO/IMessageCursorQueryResultDTO";
import {ITwitterPageIterator} from "../../../Core/Iterators/TwitterPageIterator";
import {MessageRequester} from "../../../../sharebook/Client/Requesters/MessageRequester";
import {
  MessagesClientParametersValidator
} from "../../../Core/Client/Validators/MessageClientParametersValidator";
import {ITwitterClientEvents, TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {MessageController} from "../../../../controllers/Messages/MessageController";

export interface IMessageRequester {
  /// <summary>
  /// Publishes a private message
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-event </para>
  /// <returns>Twitter result containing the published message</returns>
  publishMessageAsync(parameters: IPublishMessageParameters): Promise<ITwitterResult<ICreateMessageDTO>>;

  /// <summary>
  /// Destroy a specific message
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/guides/direct-message-migration </para>
  destroyMessageAsync(parameters: IDeleteMessageParameters): Promise<ITwitterResult>;

  /// <summary>
  /// Gets a specific message
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/get-event </para>
  /// <returns>Twitter result containing the requested message</returns>
  getMessageAsync(parameters: IGetMessageParameters): Promise<ITwitterResult<IGetMessageDTO>>;

  /// <summary>
  /// Gets latest messages
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/list-events </para>
  /// <returns>An iterator to list the recent messages of the user</returns>
  getMessagesIterator(parameters: IGetMessagesParameters): ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>>;
}


export const IMessageRequesterToken = new InjectionToken<IMessageRequester>('IMessageRequester', {
  providedIn: 'root',
  factory: () => new MessageRequester(Inject(TwitterClient), Inject(MessageController),
    Inject(MessagesClientParametersValidator), Inject(TwitterClientEvents)),
});
