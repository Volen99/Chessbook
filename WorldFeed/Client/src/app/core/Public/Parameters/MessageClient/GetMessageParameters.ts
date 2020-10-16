import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit : https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/get-event
export interface IGetMessageParameters extends ICustomRequestParameters {
  messageId: number;
}

export class GetMessageParameters extends CustomRequestParameters implements IGetMessageParameters {
  constructor(messageId: number) {
    super();

    this.messageId = messageId;
  }

  public messageId: number;
}

// public GetMessageParameters(long messageId)
// {
//   MessageId = messageId;
// }
