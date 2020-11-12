import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IMessageEventDTO} from "../../Models/Interfaces/DTO/Events/IMessageEventDTO";
import {IMessage} from "../../Models/Interfaces/IMessage";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/guides/direct-message-migration
export interface IDeleteMessageParameters extends ICustomRequestParameters {
  // Identifier of the message that you want to delete
  messageId: number;
}

export class DestroyMessageParameters extends CustomRequestParameters implements IDeleteMessageParameters {
  constructor(messageIdOrMessageOrMessageEvent: number | IMessage | IMessageEventDTO) {
    super();

    if (Type.isNumber(messageIdOrMessageOrMessageEvent)) {
      this.messageId = messageIdOrMessageOrMessageEvent;
    } else if (DestroyMessageParameters.isIMessage(messageIdOrMessageOrMessageEvent)) {
      this.messageId = messageIdOrMessageOrMessageEvent.id;
    } else {
      this.messageId = messageIdOrMessageOrMessageEvent.id;
    }
  }

  public messageId: number;

  private static isIMessage(messageIdOrMessageOrMessageEvent: number | IMessage | IMessageEventDTO):
    messageIdOrMessageOrMessageEvent is IMessage {
    return (messageIdOrMessageOrMessageEvent as IMessage).client !== undefined;
  }
}

// public DestroyMessageParameters(long messageId)
//     {
//         MessageId = messageId;
//     }

// public DestroyMessageParameters(IMessage message)
// {
//   MessageId = message.Id;
// }
//
//     public DestroyMessageParameters(IMessageEventDTO messageEvent)
//     {
//         MessageId = messageEvent.Id;
//     }
// }
