import {ITwitterResult} from "../../Core/Web/TwitterResult";
import {TwitterResponseException} from "./TwitterResponseException";

// This exception informs that the authentication process failed.
export class TwitterAuthException extends TwitterResponseException {
  constructor(twitterResult: ITwitterResult, message: string) {
    super(twitterResult, message);
  }
}
