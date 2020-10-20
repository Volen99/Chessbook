import {IMessageEventDTO} from "./Events/IMessageEventDTO";
import {IApp} from "../IApp";

// DTO for encapsulating an MessageEvent and an App together for storage.
// Not used for transfer to or from Twitter.
export interface IMessageEventWithAppDTO {
  messageEvent: IMessageEventDTO;
  app: IApp;
}
