import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";
import {IMediaEntity} from "../Entities/IMediaEntity";
import {IMessageEntities} from "../Entities/IMessageEntities";
import {IApp} from "./IApp";
import {IMessageEventDTO} from "./DTO/Events/IMessageEventDTO";
import {ITwitterClient} from "../../ITwitterClient";
import {IQuickReplyOption} from "./IQuickReplyOption";
import {IQuickReplyResponse} from "./IQuickReplyResponse";
import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {Inject, InjectionToken} from "@angular/core";
import {Message} from "../../../Core/Models/Message";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {MessageEventDTO} from "../../../Core/DTO/Events/MessageEventDTO";
import {App} from "../../../Core/Models/Properties/App";

// Message that can be sent privately between Twitter users privately.
// https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-event
export interface IMessage extends IEquatable<IMessage> {
  // Client used by the instance to perform any request to Twitter
  client: ITwitterClient;

  // Underlying DTO representing this message (as an event).
  messageEventDTO: IMessageEventDTO;

  // The App that was used to send this message.
  // If this message is a response to creating it, the app will be null and you can set it here yourself if required.
  app: IApp;

  // Id of the Message.
  id: number;

  // Text contained in the message.
  text: string;

  // Creation date of the message.
  createdAt: DateTime; // DateTimeOffset;

  // Id of the user who sent the message.
  senderId: number;

  // ID of the user who received the message.
  recipientId: number;

  // Entities of the message.
  entities: IMessageEntities;

  // The ID of the Tweet with Direct Message Prompt the conversation was initiated from if one was used.
  initiatedViaTweetId?: number;

  // The ID of the Welcome Message immediately preceding the conversation if one was used.
  iInitiatedViaWelcomeMessageId?: number;

  // The options available for the response
  quickReplyOptions: IQuickReplyOption[];

  // The Quick reply response that the user selected (if any), triggering this message.
  quickReplyResponse: IQuickReplyResponse;

  // Media that was attached to the message.
  attachedMedia: IMediaEntity;

  // Destroy the message.
  destroyAsync(): Promise<void>;
}

export const IMessageToken = new InjectionToken<IMessage>('IMessage', {
  providedIn: 'root',
  factory: () => new Message(Inject(MessageEventDTO), Inject(App), Inject(TwitterClient)),
});
