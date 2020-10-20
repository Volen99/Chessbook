import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IQuickReplyOption} from "../../Models/Interfaces/IQuickReplyOption";

// For more information visit : https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-event
export interface IPublishMessageParameters extends ICustomRequestParameters {
  // Content of the message
  text: string;

  // UserId of the recipient
  recipientId: number;

  // Uploaded media id
  mediaId?: number;

  // Quick reply options
  quickReplyOptions: IQuickReplyOption[];
}

export class PublishMessageParameters extends CustomRequestParameters implements IPublishMessageParameters {
  constructor(text: string, recipientId: number) {
    super();
    this.text = text;
    this.recipientId = recipientId;
  }

  public text: string;

  public recipientId: number;

  public mediaId?: number;

  public quickReplyOptions: IQuickReplyOption[];
}
