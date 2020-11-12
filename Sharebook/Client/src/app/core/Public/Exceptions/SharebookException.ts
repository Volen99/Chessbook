import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ITwitterRequest} from '../Models/Interfaces/ITwitterRequest';
import {IWebExceptionInfoExtractor, IWebExceptionInfoExtractorToken} from "../../Core/Exceptions/IWebExceptionInfoExtractor";
import {ITwitterExceptionInfo} from "../../Core/Exceptions/ITwitterExceptionInfo";
import {ISharebookException} from "../../Core/Exceptions/ISharebookException";
import {ITwitterResponse} from "../../Core/Web/ITwitterResponse";
import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import {WebExceptionInfoExtractor} from "../../../logic/Exceptions/WebExceptionInfoExtractor";
import Exception from "typescript-dotnet-commonjs/System/Exception";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface ITwitterExceptionFactory {
  create(exceptionInfos: ITwitterExceptionInfo[], url: string): SharebookException;

  create(exceptionInfos: ITwitterExceptionInfo[], request: ITwitterRequest): SharebookException;

  create(twitterResponse: ITwitterResponse, request: ITwitterRequest): SharebookException;

  create(webException: Exception, request: ITwitterRequest): SharebookException;

  create(webException: Exception, request: ITwitterRequest, statusCode: number): SharebookException;
}

export const ITwitterExceptionFactoryToken = new InjectionToken<ITwitterExceptionFactory>('ITwitterExceptionFactory', {
  providedIn: 'root',
  factory: () => new TwitterExceptionFactory(inject(WebExceptionInfoExtractor)),
});

@Injectable({
  providedIn: 'root',
})
export class TwitterExceptionFactory implements ITwitterExceptionFactory {
  private readonly _webExceptionInfoExtractor: IWebExceptionInfoExtractor;

  constructor(@Inject(IWebExceptionInfoExtractorToken) webExceptionInfoExtractor: IWebExceptionInfoExtractor) {
    this._webExceptionInfoExtractor = webExceptionInfoExtractor;
  }

  create(exceptionInfosOrTwitterResponseOrWebException: ITwitterExceptionInfo[] | ITwitterResponse | Exception,
         urlOrRequest: string | ITwitterRequest,
         statusCode?: number): SharebookException {
    if (this.isExceptionInfos(exceptionInfosOrTwitterResponseOrWebException)) {
      return new SharebookException(exceptionInfosOrTwitterResponseOrWebException, urlOrRequest);
    } else if (this.isITwitterResponse(exceptionInfosOrTwitterResponseOrWebException)) {
      return new SharebookException(this._webExceptionInfoExtractor, exceptionInfosOrTwitterResponseOrWebException, urlOrRequest as ITwitterRequest);
    } else if (this.isWebException(exceptionInfosOrTwitterResponseOrWebException)) {
      if (statusCode) {
        return new SharebookException(this._webExceptionInfoExtractor, exceptionInfosOrTwitterResponseOrWebException, urlOrRequest as ITwitterRequest, statusCode);
      }
      return new SharebookException(this._webExceptionInfoExtractor, exceptionInfosOrTwitterResponseOrWebException, urlOrRequest as ITwitterRequest);
    }
  }

  private isExceptionInfos(exceptionInfos: ITwitterExceptionInfo[] | ITwitterResponse | Exception):
    exceptionInfos is ITwitterExceptionInfo[] {
    return (exceptionInfos as ITwitterExceptionInfo[])[0].code !== undefined;
  }

  private isITwitterResponse(exceptionInfos: ITwitterExceptionInfo[] | ITwitterResponse | Exception):
    exceptionInfos is ITwitterResponse {
    return (exceptionInfos as ITwitterResponse).statusCode !== undefined;
  }

  private isWebException(exceptionInfos: ITwitterExceptionInfo[] | ITwitterResponse | Exception):
    exceptionInfos is Exception {
    return (exceptionInfos as Exception).data !== undefined;
  }
}

// Exception raised by the Twitter API.
export class SharebookException extends Exception /*WebException*/ implements ISharebookException {
  public webException: Exception;
  public URL: string;
  public statusCode: number;
  public twitterDescription: string;
  public creationDate: DateTime; // DateTimeOffset;
  public twitterExceptionInfos: ITwitterExceptionInfo[];
  public twitterQuery: ITwitterQuery;
  public request: ITwitterRequest;


  constructor(
    requestOrExceptionInfosOrWebExceptionInfoExtractor: ITwitterRequest
      | ITwitterExceptionInfo[]
      | IWebExceptionInfoExtractor,
    messageOrUrlOrRequestOrResponseOrWebException: string
      | ITwitterRequest
      | Exception
      | ITwitterResponse,
    twitterRequest?: ITwitterRequest,
    statusCode?: number) {


    if (SharebookException.isITwitterRequest(requestOrExceptionInfosOrWebExceptionInfoExtractor)) { // private ctor
      super(`${requestOrExceptionInfosOrWebExceptionInfoExtractor.query.url} request failed.`);

      this.init(requestOrExceptionInfosOrWebExceptionInfoExtractor);
    } else if (SharebookException.isITwitterExceptionInfo(requestOrExceptionInfosOrWebExceptionInfoExtractor)) {
      this.creationDate = DateTime.now;
      this.twitterExceptionInfos = requestOrExceptionInfosOrWebExceptionInfoExtractor;
      if (typeof messageOrUrlOrRequestOrResponseOrWebException === 'string') {
        this.URL = messageOrUrlOrRequestOrResponseOrWebException;
      } else {
        let requestCurrent: ITwitterRequest = messageOrUrlOrRequestOrResponseOrWebException as ITwitterRequest;
        super(`${requestCurrent.query.url} request failed.`);
        this.init(requestCurrent);
      }
    } else if (SharebookException.isIWebExceptionInfoExtractor(requestOrExceptionInfosOrWebExceptionInfoExtractor)) {
      if (SharebookException.isITwitterResponse(messageOrUrlOrRequestOrResponseOrWebException)) {
        this.init(twitterRequest);

        this.statusCode = messageOrUrlOrRequestOrResponseOrWebException.statusCode;
        this.twitterExceptionInfos = requestOrExceptionInfosOrWebExceptionInfoExtractor.getTwitterExceptionInfosFromStream(messageOrUrlOrRequestOrResponseOrWebException.resultStream);
        this.twitterDescription = requestOrExceptionInfosOrWebExceptionInfoExtractor.getStatusCodeDescription(this.statusCode);
      } else if (SharebookException.isWebException(messageOrUrlOrRequestOrResponseOrWebException)) {
        super(messageOrUrlOrRequestOrResponseOrWebException.message);

        this.init(twitterRequest);

        let webException: Exception = messageOrUrlOrRequestOrResponseOrWebException;
        this.webException = webException;
        if (statusCode) {
          this.statusCode = requestOrExceptionInfosOrWebExceptionInfoExtractor.getWebExceptionStatusNumber(webException, statusCode);
        }
        this.statusCode = requestOrExceptionInfosOrWebExceptionInfoExtractor.getWebExceptionStatusNumber(webException);
        this.twitterExceptionInfos = requestOrExceptionInfosOrWebExceptionInfoExtractor.getTwitterExceptionInfo(webException);
        this.twitterDescription = requestOrExceptionInfosOrWebExceptionInfoExtractor.getStatusCodeDescription(this.statusCode);
      }
    }
  }

  private init(request: ITwitterRequest): void {
    this.request = request;
    this.creationDate = DateTime.now;
    this.URL = request.query.url;
    this.twitterQuery = request.query;
  }

  public toString(): string {
    let date = `--- Date : ${this.creationDate/*.toLocalTime()*/}\r\n`;
    let url = URL == null ? "" : `URL : ${URL}\r\n`;
    let code = `Code : ${(this.statusCode)}\r\n`;
    let description = `Error documentation description : ${(this.twitterDescription)}\r\n`;
    let exceptionMessage = `Error message : ${super.message}\r\n`;

    let exceptionInfos: string = "";

    if (this.twitterExceptionInfos != null) {
      for (let twitterExceptionInfo of this.twitterExceptionInfos) {
        exceptionInfos += `${twitterExceptionInfo.message} (${twitterExceptionInfo.code})\r\n`;
      }
    }

    return `${date}${url}${code}${description}${exceptionMessage}${exceptionInfos}`;
  }

  private static isITwitterRequest(requestOrExceptionInfosOrWebExceptionInfoExtractor: ITwitterRequest | ITwitterExceptionInfo[] | IWebExceptionInfoExtractor): requestOrExceptionInfosOrWebExceptionInfoExtractor is ITwitterRequest {
    return (requestOrExceptionInfosOrWebExceptionInfoExtractor as ITwitterRequest).query !== undefined;
  }

  private static isITwitterExceptionInfo(requestOrExceptionInfosOrWebExceptionInfoExtractor: ITwitterRequest | ITwitterExceptionInfo[] | IWebExceptionInfoExtractor): requestOrExceptionInfosOrWebExceptionInfoExtractor is ITwitterExceptionInfo[] {
    return (requestOrExceptionInfosOrWebExceptionInfoExtractor as ITwitterExceptionInfo[])[0].code !== undefined;
  }

  private static isIWebExceptionInfoExtractor(requestOrExceptionInfosOrWebExceptionInfoExtractor: ITwitterRequest | ITwitterExceptionInfo[] | IWebExceptionInfoExtractor): requestOrExceptionInfosOrWebExceptionInfoExtractor is IWebExceptionInfoExtractor {
    return (requestOrExceptionInfosOrWebExceptionInfoExtractor as IWebExceptionInfoExtractor).getTwitterExceptionInfosFromStream !== undefined;
  }

  private static isITwitterResponse(messageOrUrlOrRequestOrResponseOrWebException: any): messageOrUrlOrRequestOrResponseOrWebException is ITwitterResponse {
    return (messageOrUrlOrRequestOrResponseOrWebException as ITwitterResponse).statusCode !== undefined;
  }

  private static isWebException(messageOrUrlOrRequestOrResponseOrWebException: any): messageOrUrlOrRequestOrResponseOrWebException is Exception {
    return (messageOrUrlOrRequestOrResponseOrWebException as Exception).data !== undefined;
  }
}
