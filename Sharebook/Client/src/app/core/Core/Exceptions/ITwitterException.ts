import {Inject, InjectionToken} from "@angular/core";

import {ITwitterExceptionInfo} from "./ITwitterExceptionInfo";
import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {TwitterException} from "../../Public/Exceptions/TwitterException";
import {TwitterRequest} from "../../Public/TwitterRequest";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";

export interface ITwitterException {
  webException: WebException;

  URL: string;
  statusCode: number;
  twitterDescription: string;
  creationDate: DateTime;  // DateTimeOffset;
  twitterExceptionInfos: ITwitterExceptionInfo[];
  twitterQuery: ITwitterQuery;
}

export const ITwitterExceptionToken = new InjectionToken<ITwitterException>('ITwitterException', {
  providedIn: 'root',
  factory: () => new TwitterException(Inject(TwitterRequest), Inject(String), Inject(Number)),
});
