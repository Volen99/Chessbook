import {ITwitterExceptionInfo} from "./ITwitterExceptionInfo";
import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {InjectionToken} from "@angular/core";

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
  factory: () => new,
});
