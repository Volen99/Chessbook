import {Stream} from "stream";
import {ITwitterExceptionInfo} from "./ITwitterExceptionInfo";

export interface IWebExceptionInfoExtractor {
  getWebExceptionStatusNumber(wex: WebException): number;

  getWebExceptionStatusNumber(wex: WebException, defaultStatusCode: number): number;

  getStatusCodeDescription(statusCode: number): string;

  getTwitterExceptionInfo(wex: WebException): ITwitterExceptionInfo[];

  getTwitterExceptionInfosFromStream(stream: Stream): ITwitterExceptionInfo[];
}
