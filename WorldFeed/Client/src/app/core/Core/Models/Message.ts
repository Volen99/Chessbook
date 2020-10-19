import InvalidOperationException from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException";
import {IApp} from "../../Public/Models/Interfaces/IApp";
import {IMessageEntities} from "../../Public/Models/Entities/IMessageEntities";
import {IMediaEntity} from '../../Public/Models/Entities/IMediaEntity';
import {IMessage} from "../../Public/Models/Interfaces/IMessage";
import {IMessageEventDTO} from "../../Public/Models/Interfaces/DTO/Events/IMessageEventDTO";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {IQuickReplyOption} from "../../Public/Models/Interfaces/IQuickReplyOption";
import {IQuickReplyResponse} from "../../Public/Models/Interfaces/IQuickReplyResponse";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

// Message that can be sent privately between Twitter users
export class Message implements IMessage {
  private _app: IApp;
  private _mergedMediaIntoEntities: boolean;

  constructor(messageEventDTO: IMessageEventDTO, app: IApp, client: ITwitterClient) {
    this.messageEventDTO = messageEventDTO;
    this.client = client;
    this._app = app;
  }

  // Properties
  public messageEventDTO: IMessageEventDTO;
  public client: ITwitterClient;

  get app(): IApp {
    return this._app;
  }

  set app(value: IApp) {
    // If the app is already set, it cannot be changed. The set option here is only to allow users to set
    // the app for messages received in response to a create request, where Twitter doesn't return the app.
    if (this._app != null) {
      throw new InvalidOperationException("Cannot set the app on a message if it is already set");
    }

    this._app = value;
  }

  get id(): number {
    return this.messageEventDTO.id;
  }

  get createdAt(): DateTime {
    return this.messageEventDTO.createdAt;
  }

  get senderId(): number {
    return this.messageEventDTO.messageCreate.senderId;
  }

  get recipientId(): number {
    return this.messageEventDTO.messageCreate.target.recipientId;
  }

  get entities(): IMessageEntities {
    // Note: the following updates the underlying DTO and makes it slightly different
    //  to what was actually returned from Twitter. This is so that DM entities mimic
    //  Tweet entities, with media included.
    //  This shouldn't cause any issue, but if the DTO ever needed to be maintained exactly as received
    //  then entities needs to be copied before the media is added to it.
    let entities = this.messageEventDTO.messageCreate.messageData.entities;
    if (!this._mergedMediaIntoEntities) {
      entities.medias = new Array<IMediaEntity>();
      if (this.attachedMedia != null) {
        entities.medias.Add(this.attachedMedia);
      }

      this._mergedMediaIntoEntities = true;
    }

    return entities;
  }

  get text(): string {
    return this.messageEventDTO.messageCreate.messageData?.text;
  }

  get initiatedViaTweetId(): number {  // long?
    return this.messageEventDTO.initiatedVia?.tweetId;
  }

  get iInitiatedViaWelcomeMessageId(): number {     // long?
    return this.messageEventDTO.initiatedVia?.welcomeMessageId;
  }

  get quickReplyOptions(): IQuickReplyOption[] {
    return this.messageEventDTO.messageCreate.messageData?.quickReply?.options;
  }

  get quickReplyResponse(): IQuickReplyResponse {
    return this.messageEventDTO.messageCreate.messageData?.quickReplyResponse;
  }

  get attachedMedia(): IMediaEntity {
    return this.messageEventDTO.messageCreate.messageData?.attachment?.media;
  }

  // Destroy
  public destroyAsync(): Promise<void> {
    return this.client.messages.destroyMessageAsync(this);
  }

  public Equals(other: IMessage): boolean {
    if (other == null) {
      return false;
    }

    return this.id === other.id && this.text === other.text && this.senderId === other.senderId && this.recipientId === other.recipientId;
  }

  public ToString(): string {
    return this.text;
  }
}
