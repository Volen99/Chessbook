import {ITwitterRequest} from '../Models/Interfaces/ITwitterRequest';
import {IWebExceptionInfoExtractor} from "../../Core/Exceptions/IWebExceptionInfoExtractor";
import {ITwitterExceptionInfo} from "../../Core/Exceptions/ITwitterExceptionInfo";
import {ITwitterException} from "../../Core/Exceptions/ITwitterException";
import {ITwitterResponse} from "../../Core/Web/ITwitterResponse";
import {ITwitterQuery} from "../Models/Interfaces/ITwitterQuery";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface ITwitterExceptionFactory {
  create(exceptionInfosOrTwitterResponseOrWebException: ITwitterExceptionInfo[] | ITwitterResponse | WebException,
         urlOrRequest: string | ITwitterRequest, statusCode: number): TwitterException;
}

export class TwitterExceptionFactory implements ITwitterExceptionFactory {
  private readonly _webExceptionInfoExtractor: IWebExceptionInfoExtractor;

  constructor(webExceptionInfoExtractor: IWebExceptionInfoExtractor) {
    this._webExceptionInfoExtractor = webExceptionInfoExtractor;
  }

  create(exceptionInfosOrTwitterResponseOrWebException: ITwitterExceptionInfo[] | ITwitterResponse | WebException,
         urlOrRequest: string | ITwitterRequest, statusCode: number): TwitterException {
    if (this.isExceptionInfos(exceptionInfosOrTwitterResponseOrWebException)) {
      return new TwitterException(exceptionInfosOrTwitterResponseOrWebException, urlOrRequest);
    } else if (this.isITwitterResponse(exceptionInfosOrTwitterResponseOrWebException)) {
      return new TwitterException(this._webExceptionInfoExtractor, exceptionInfosOrTwitterResponseOrWebException, urlOrRequest as ITwitterRequest);
    } else if (this.isWebException(exceptionInfosOrTwitterResponseOrWebException)) {
      if (statusCode) {
        return new TwitterException(this._webExceptionInfoExtractor, exceptionInfosOrTwitterResponseOrWebException, urlOrRequest as ITwitterRequest, statusCode);
      }
      return new TwitterException(this._webExceptionInfoExtractor, exceptionInfosOrTwitterResponseOrWebException, urlOrRequest as ITwitterRequest);
    }
  }

  private isExceptionInfos(exceptionInfos: ITwitterExceptionInfo[] | ITwitterResponse | WebException):
    exceptionInfos is ITwitterExceptionInfo[] {
    return (exceptionInfos as ITwitterExceptionInfo[])[0].code !== undefined;
  }

  private isITwitterResponse(exceptionInfos: ITwitterExceptionInfo[] | ITwitterResponse | WebException):
    exceptionInfos is ITwitterResponse {
    return (exceptionInfos as ITwitterResponse).statusCode !== undefined;
  }

  private isWebException(exceptionInfos: ITwitterExceptionInfo[] | ITwitterResponse | WebException):
    exceptionInfos is WebException {
    return (exceptionInfos as WebException).Message !== undefined;
  }
}

// Exception raised by the Twitter API.
export class TwitterException extends WebException implements ITwitterException {
  public webException: WebException;
  public URL: string;
  public statusCode: number;
  public twitterDescription: string;
  public creationDate: DateTimeOffset;
  public twitterExceptionInfos: ITwitterExceptionInfo[];
  public twitterQuery: ITwitterQuery;
  public Request: ITwitterRequest;


  constructor(
    requestOrExceptionInfosOrWebExceptionInfoExtractor: ITwitterRequest
      | ITwitterExceptionInfo[]
      | IWebExceptionInfoExtractor,
    messageOrUrlOrRequestOrResponseOrWebException: string
      | ITwitterRequest
      | WebException
      | ITwitterResponse = `{request.Query.Url} request failed.`, request?: ITwitterRequest,
    statusCode?: number) {


    if (this.isITwitterRequest(requestOrExceptionInfosOrWebExceptionInfoExtractor)) {
      super(messageOrUrlOrRequestOrResponseOrWebException);
      this.init(requestOrExceptionInfosOrWebExceptionInfoExtractor);
    } else if (this.isITwitterExceptionInfo(requestOrExceptionInfosOrWebExceptionInfoExtractor)) {
      this.creationDate = DateTime.now;
      this.twitterExceptionInfos = requestOrExceptionInfosOrWebExceptionInfoExtractor;
      if (typeof messageOrUrlOrRequestOrResponseOrWebException === 'string') {
        this.URL = messageOrUrlOrRequestOrResponseOrWebException;
      } else {
        let requestCurrent: ITwitterRequest = messageOrUrlOrRequestOrResponseOrWebException as ITwitterRequest;
        super(`${requestCurrent.query.url} request failed.`);
        this.init(requestCurrent);
      }
    } else if (this.isIWebExceptionInfoExtractor(requestOrExceptionInfosOrWebExceptionInfoExtractor)) {
      if (this.isITwitterResponse(messageOrUrlOrRequestOrResponseOrWebException)) {
        this.init(request);

        this.statusCode = messageOrUrlOrRequestOrResponseOrWebException.StatusCode;
        this.twitterExceptionInfos = requestOrExceptionInfosOrWebExceptionInfoExtractor.getTwitterExceptionInfosFromStream(messageOrUrlOrRequestOrResponseOrWebException.ResultStream);
        this.twitterDescription = requestOrExceptionInfosOrWebExceptionInfoExtractor.getStatusCodeDescription(this.statusCode);
      } else if (this.isWebException(messageOrUrlOrRequestOrResponseOrWebException)) {
        this.init(request, messageOrUrlOrRequestOrResponseOrWebException.Message);

        let webException: WebException = messageOrUrlOrRequestOrResponseOrWebException;
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
    this.Request = request;
    this.creationDate = DateTime.now;
    this.URL = request.query.url;
    this.twitterQuery = request.query;


  }
  public toString(): string {
    let date = `--- Date : ${this.creationDate.ToLocalTime()}\r\n`;
    let url = URL == null ? "" : `URL : ${URL}\r\n`;
    let code = `Code : ${(this.statusCode)}\r\n`;
    let description = `Error documentation description : ${(this.twitterDescription)}\r\n`;
    let exceptionMessage = `Error message : ${super.Message}\r\n`;

    let exceptionInfos: string = "";

    if (this.twitterExceptionInfos != null) {
      for (let twitterExceptionInfo of this.twitterExceptionInfos) {
        exceptionInfos += `${twitterExceptionInfo.message} (${twitterExceptionInfo.code})\r\n`;
      }
    }

    return `${date}${url}${code}${description}${exceptionMessage}${exceptionInfos}`;
  }

  private isITwitterRequest(requestOrExceptionInfosOrWebExceptionInfoExtractor: ITwitterRequest | ITwitterExceptionInfo[] | IWebExceptionInfoExtractor): requestOrExceptionInfosOrWebExceptionInfoExtractor is ITwitterRequest {
    return (requestOrExceptionInfosOrWebExceptionInfoExtractor as ITwitterRequest).query !== undefined;
  }

  private isITwitterExceptionInfo(requestOrExceptionInfosOrWebExceptionInfoExtractor: ITwitterRequest | ITwitterExceptionInfo[] | IWebExceptionInfoExtractor): requestOrExceptionInfosOrWebExceptionInfoExtractor is ITwitterExceptionInfo[] {
    return (requestOrExceptionInfosOrWebExceptionInfoExtractor as ITwitterExceptionInfo[])[0].code !== undefined;
  }

  private isIWebExceptionInfoExtractor(requestOrExceptionInfosOrWebExceptionInfoExtractor: ITwitterRequest | ITwitterExceptionInfo[] | IWebExceptionInfoExtractor): requestOrExceptionInfosOrWebExceptionInfoExtractor is IWebExceptionInfoExtractor {
    return (requestOrExceptionInfosOrWebExceptionInfoExtractor as IWebExceptionInfoExtractor).getTwitterExceptionInfosFromStream !== undefined;
  }

  private isITwitterResponse(messageOrUrlOrRequestOrResponseOrWebException: string | ITwitterRequest | WebException | ITwitterResponse): requestOrExceptionInfosOrWebExceptionInfoExtractor is ITwitterResponse {
    return (messageOrUrlOrRequestOrResponseOrWebException as ITwitterResponse).statusCode !== undefined;
  }

  private isWebException(messageOrUrlOrRequestOrResponseOrWebException: string | ITwitterRequest | WebException | ITwitterResponse): requestOrExceptionInfosOrWebExceptionInfoExtractor is WebException {
    return (messageOrUrlOrRequestOrResponseOrWebException as WebException).StatusCode !== undefined;
  }
}


// Create(exceptionInfos: ITwitterExceptionInfo[], url: string): TwitterException;
//
// Create(exceptionInfos: ITwitterExceptionInfo[], request: ITwitterRequest): TwitterException;
//
// Create(twitterResponse: ITwitterResponse, request: ITwitterRequest): TwitterException;
//
// Create(webException: WebException, request: ITwitterRequest): TwitterException;
//
// Create(webException: WebException, request: ITwitterRequest, statusCode: number): TwitterException;


// public Create(exceptionInfos: ITwitterExceptionInfo[], url: string): TwitterException {
//   return new TwitterException(exceptionInfos, url);
// }
//
// public Create(exceptionInfos: ITwitterExceptionInfo[], request: ITwitterRequest): TwitterException {
//   return new TwitterException(exceptionInfos, request);
// }

// public Create(twitterResponse: ITwitterResponse, request: ITwitterRequest): TwitterException {
//   return new TwitterException(this._webExceptionInfoExtractor, twitterResponse, request);
// }

// public Create(webException: WebException, request: ITwitterRequest): TwitterException {
//   return new TwitterException(this._webExceptionInfoExtractor, webException, request);
// }
//
// public Create(webException: WebException, request: ITwitterRequest, statusCode: number): TwitterException {
//   return new TwitterException(this._webExceptionInfoExtractor, webException, request, statusCode);
// }


// protected TwitterException(ITwitterRequest request, string message) : base(message)
// {
//     Request = request;
//     this.CreationDate = DateTime.Now;
//     URL = request.Query.Url;
//     TwitterQuery = request.Query;
// }

// private TwitterException(ITwitterRequest request) : this(request, $"{request.Query.Url} request failed.")
// {
// }

// public TwitterException(ITwitterExceptionInfo[] exceptionInfos, string url)
// {
//     CreationDate = DateTime.Now;
//     TwitterExceptionInfos = exceptionInfos;
//     URL = url;
// }

// public TwitterException(ITwitterExceptionInfo[] exceptionInfos, ITwitterRequest request)
//     : this(request)
// {
//     CreationDate = DateTime.Now;
//     TwitterExceptionInfos = exceptionInfos;
// }

// public TwitterException(IWebExceptionInfoExtractor webExceptionInfoExtractor, ITwitterResponse twitterResponse,
//     ITwitterRequest request)
//     : this(request)
// {
//     StatusCode = twitterResponse.StatusCode;
//     TwitterExceptionInfos = webExceptionInfoExtractor.GetTwitterExceptionInfosFromStream(twitterResponse.ResultStream);
//     TwitterDescription = webExceptionInfoExtractor.GetStatusCodeDescription(StatusCode);
// }

// public TwitterException(IWebExceptionInfoExtractor webExceptionInfoExtractor, WebException webException,
//     ITwitterRequest request)
//     : this(request, webException.Message)
// {
//     WebException = webException;
//     StatusCode = webExceptionInfoExtractor.GetWebExceptionStatusNumber(webException);
//     TwitterExceptionInfos = webExceptionInfoExtractor.GetTwitterExceptionInfo(webException);
//     TwitterDescription = webExceptionInfoExtractor.GetStatusCodeDescription(StatusCode);
// }

// public TwitterException(IWebExceptionInfoExtractor webExceptionInfoExtractor, WebException webException,
//     ITwitterRequest request,
//     int statusCode)
//     : this(request, webException.Message)
// {
//     WebException = webException;
//     StatusCode = webExceptionInfoExtractor.GetWebExceptionStatusNumber(webException, statusCode);
//     TwitterExceptionInfos = webExceptionInfoExtractor.GetTwitterExceptionInfo(webException);
//     TwitterDescription = webExceptionInfoExtractor.GetStatusCodeDescription(StatusCode);
// }
