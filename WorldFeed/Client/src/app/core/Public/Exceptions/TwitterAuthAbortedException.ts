import {TwitterAuthException} from "./TwitterAuthException";
import {ITwitterResult} from "../../Core/Web/TwitterResult";

// This exception informs that the authentication process failed.
export class TwitterAuthAbortedException extends TwitterAuthException {
  constructor(twitterResult: ITwitterResult) {
    super(twitterResult, "Authentication did not proceed until the end");
  }
}
