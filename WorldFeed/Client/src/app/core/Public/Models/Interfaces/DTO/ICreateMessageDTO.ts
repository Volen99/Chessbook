﻿import {IMessageEventDTO} from "./Events/IMessageEventDTO";

// DTO for both the request and response when creating a message
// https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-event
export interface ICreateMessageDTO {
  messageEvent: IMessageEventDTO;

  // Note the lack of the App field.
  // The client would need to fill this themselves on the Message if required
}