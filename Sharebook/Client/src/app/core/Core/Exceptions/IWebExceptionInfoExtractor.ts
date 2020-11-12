import {InjectionToken} from "@angular/core";

import {ITwitterExceptionInfo} from "./ITwitterExceptionInfo";
import {WebExceptionInfoExtractor} from "../../../logic/Exceptions/WebExceptionInfoExtractor";
import Exception from "typescript-dotnet-commonjs/System/Exception";

export interface IWebExceptionInfoExtractor {
  getWebExceptionStatusNumber(wex: /*WebException*/ Exception): number;

  getWebExceptionStatusNumber(wex: /*WebException*/ Exception, defaultStatusCode: number): number;

  getStatusCodeDescription(statusCode: number): string;

  getTwitterExceptionInfo(wex: /*WebException*/ Exception): ITwitterExceptionInfo[];

  getTwitterExceptionInfosFromStream(stream: any): ITwitterExceptionInfo[];
}

export const IWebExceptionInfoExtractorToken = new InjectionToken<IWebExceptionInfoExtractor>('IWebExceptionInfoExtractor', {
  providedIn: 'root',
  factory: () => new WebExceptionInfoExtractor()
});
