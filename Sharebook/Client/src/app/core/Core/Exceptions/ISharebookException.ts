import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterExceptionInfo} from "./ITwitterExceptionInfo";
import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";
import {SharebookException} from "../../Public/Exceptions/SharebookException";
import {TwitterRequest} from "../../Public/TwitterRequest";
import Exception from "typescript-dotnet-commonjs/System/Exception";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface ISharebookException {
  webException: Exception; // WebException;

  URL: string;
  statusCode: number;
  twitterDescription: string;
  creationDate: DateTime;  // DateTimeOffset;
  twitterExceptionInfos: ITwitterExceptionInfo[];
  twitterQuery: ITwitterQuery;
}

export const ITwitterExceptionToken = new InjectionToken<ISharebookException>('ITwitterException', {
  providedIn: 'root',
  factory: () => new SharebookException(inject(TwitterRequest), inject(String), inject(Number)),
});
