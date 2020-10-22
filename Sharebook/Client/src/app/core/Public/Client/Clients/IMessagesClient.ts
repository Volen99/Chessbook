import {IMessagesClientParametersValidator} from "../../../Core/Client/Validators/MessageClientParametersValidator";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {ITwitterIterator} from "../../Iterators/ITwitterIterator";
import {IMessage} from "../../Models/Interfaces/IMessage";
import {IPublishMessageParameters} from "../../Parameters/MessageClient/PublishMessageParameters";
import {IGetMessageParameters} from "../../Parameters/MessageClient/GetMessageParameters";
import {IGetMessagesParameters} from "../../Parameters/MessageClient/GetMessagesParameters";
import {IDeleteMessageParameters} from "../../Parameters/MessageClient/DestroyMessageParameters";
import {InjectionToken} from "@angular/core";

export interface IMessagesClient {
  // Validate all the message client parameters
  parametersValidator: IMessagesClientParametersValidator;

  publishMessageAsync(text: string, recipient: IUserIdentifier): Promise<IMessage>;

  publishMessageAsync(text: string, recipientId: number): Promise<IMessage>;

  /// <summary>
  /// Publishes a private message
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-event </para>
  /// <returns>Message published</returns>
  publishMessageAsync(parameters: IPublishMessageParameters): Promise<IMessage>;

  getMessageAsync(messageId: number): Promise<IMessage>;

  /// <summary>
  /// Gets a specific message
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/get-event </para>
  /// <returns>Requested message</returns>
  getMessageAsync(parameters: IGetMessageParameters): Promise<IMessage>;

  getMessagesAsync(): Promise<IMessage[]>;

  /// <summary>
  /// Gets latest messages
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/list-events </para>
  /// <returns>List the recent messages of the user</returns>
  getMessagesAsync(parameters: IGetMessagesParameters): Promise<IMessage[]>;

  getMessagesIterator(): ITwitterIterator<IMessage>;

  /// <summary>
  /// Gets latest messages
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/list-events </para>
  /// <returns>An iterator to list the recent messages of the user</returns>
  getMessagesIterator(parameters: IGetMessagesParameters): ITwitterIterator<IMessage>;

  destroyMessageAsync(messageId: number): Promise<void>;

  destroyMessageAsync(message: IMessage): Promise<void>;

  /// <summary>
  /// Destroy a specific message
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/guides/direct-message-migration </para>
  destroyMessageAsync(parameters: IDeleteMessageParameters): Promise<void>;
}

export const IMessagesClientToken = new InjectionToken<IMessagesClient>('IMessagesClient', {
  providedIn: 'root',
  factory: () => new,
});
