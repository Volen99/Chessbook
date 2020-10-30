import {Stream} from "stream";
import {ITwitterExceptionInfo} from "./ITwitterExceptionInfo";
import Exception from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";

export interface IWebExceptionInfoExtractor {
  getWebExceptionStatusNumber(wex: /*WebException*/ Exception): number;

  getWebExceptionStatusNumber(wex: /*WebException*/ Exception, defaultStatusCode: number): number;

  getStatusCodeDescription(statusCode: number): string;

  getTwitterExceptionInfo(wex: /*WebException*/ Exception): ITwitterExceptionInfo[];

  getTwitterExceptionInfosFromStream(stream: Stream): ITwitterExceptionInfo[];
}
