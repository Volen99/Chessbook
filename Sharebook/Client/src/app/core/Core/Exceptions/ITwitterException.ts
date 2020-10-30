import {Inject, InjectionToken} from "@angular/core";

import {ITwitterExceptionInfo} from "./ITwitterExceptionInfo";
import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {SharebookException} from "../../Public/Exceptions/SharebookException";
import {TwitterRequest} from "../../Public/TwitterRequest";
import Exception from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";

export interface ITwitterException {
  webException: Exception; // WebException;

  URL: string;
  statusCode: number;
  twitterDescription: string;
  creationDate: DateTime;  // DateTimeOffset;
  twitterExceptionInfos: ITwitterExceptionInfo[];
  twitterQuery: ITwitterQuery;
}

export const ITwitterExceptionToken = new InjectionToken<ITwitterException>('ITwitterException', {
  providedIn: 'root',
  factory: () => new SharebookException(Inject(TwitterRequest), Inject(String), Inject(Number)),
});
