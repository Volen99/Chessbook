import {Inject, InjectionToken} from "@angular/core";

import {ITwitterException} from "../../Core/Exceptions/ITwitterException";
import {SharebookException} from "./SharebookException";
import {ITwitterRequest} from "../Models/Interfaces/ITwitterRequest";
import {ITwitterExceptionInfo} from "../../Core/Exceptions/ITwitterExceptionInfo";
import {TwitterRequest} from "../TwitterRequest";

export interface ITwitterTimeoutException extends ITwitterException {
}

// Exception raised when Twitter did not manage to respond to your request on time.
export class TwitterTimeoutException extends SharebookException implements ITwitterTimeoutException {
  constructor(request: ITwitterRequest) {
    super(request, `${request.query.url} request timed out.`);
    super.twitterDescription = `Twitter was not able to perform your query within the Timeout limit of ${request.query.timeout.getTotalMilliseconds()} ms.`;
    super.webException = null;
    super.statusCode = 408;
    super.twitterExceptionInfos = new Array<ITwitterExceptionInfo>(0);  // new ITwitterExceptionInfo[0];
  }
}

export const ITwitterTimeoutExceptionToken = new InjectionToken<ITwitterTimeoutException>('ITwitterTimeoutException', {
  providedIn: 'root',
  factory: () => new TwitterTimeoutException(Inject(TwitterRequest)),
});
