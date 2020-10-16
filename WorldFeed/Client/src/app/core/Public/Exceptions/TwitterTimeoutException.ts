import {ITwitterException} from "../../Core/Exceptions/ITwitterException";
import {TwitterException} from "./TwitterException";
import {ITwitterRequest} from "../Models/Interfaces/ITwitterRequest";
import {ITwitterExceptionInfo} from "../../Core/Exceptions/ITwitterExceptionInfo";

export interface ITwitterTimeoutException extends ITwitterException {
}

// Exception raised when Twitter did not manage to respond to your request on time.
export class TwitterTimeoutException extends TwitterException implements ITwitterTimeoutException {
  constructor(request: ITwitterRequest) {
    super(request, `${request.query.url} request timed out.`);
    super.twitterDescription = `Twitter was not able to perform your query within the Timeout limit of ${request.query.timeout.getTotalMilliseconds()} ms.`;
    super.webException = null;
    super.statusCode = 408;
    super.twitterExceptionInfos = new ITwitterExceptionInfo[0];
  }
}
