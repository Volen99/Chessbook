import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

import {IHttpClientWebHelper} from "../core/Core/Helpers/IHttpClientWebHelper";
import {ITwitterQuery} from "../core/Public/Models/Interfaces/ITwitterQuery";
import {ITwitterClientHandler} from "../core/Core/Web/ITwitterClientHandler";
import {
  IOAuthWebRequestGeneratorFactory,
  IOAuthWebRequestGeneratorFactoryToken,
  OAuthWebRequestGeneratorFactory
} from "./OAuthWebRequestGenerator";
import {TwitterClientHandler} from "./TwitterClientHandler";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";
import {HttpMethod} from "../core/Public/Models/Enum/HttpMethod";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {SharebookConsts} from "../core/Public/sharebook-consts";
import {ok} from "assert";
import {FileUploader} from "../global-modules/upload/file-uploader.class";
import {FileItem} from "../global-modules/upload/file-item.class";
import {Guid} from "../../guid";
import {SecurityService} from "../shared/services/security.service";

@Injectable({
  providedIn: 'root',
})
export class HttpClientWebHelper implements IHttpClientWebHelper {
  private readonly _oAuthWebRequestGeneratorFactory: IOAuthWebRequestGeneratorFactory;
  private _http: HttpClient;
  private uploader: FileUploader;

  // All observables returned from HttpClient methods are cold by design. Execution of the HTTP request is
  // deferred, allowing you to extend the observable with additional operations such as tap and catchError
  // before anything actually happens.
  constructor(@Inject(IOAuthWebRequestGeneratorFactoryToken) oAuthWebRequestGeneratorFactory: IOAuthWebRequestGeneratorFactory,
              httpClient: HttpClient, private securityService: SecurityService) {
    this._oAuthWebRequestGeneratorFactory = oAuthWebRequestGeneratorFactory;
    this._http = httpClient;
  }

  // 1. The observe option specifies how much of the response to return.
  // 2. The responseType option specifies the format in which to return data.
  // 3.
  public async getHttpResponseAsync(twitterQuery: ITwitterQuery, handler?: ITwitterClientHandler): Promise<Response> {
    // using {}
    let client = this.getHttpClient(twitterQuery, handler);

    // client.Timeout = twitterQuery.timeout;

    let httpMethod = HttpMethod[twitterQuery.httpMethod]; // new HttpMethod(twitterQuery.httpMethod.toString()); TODO: beware! Not full http method

    let options = {
      observe: 'response',
      responseType: "arraybuffer"
    };
    this.setHeaders(options, true);

    if (twitterQuery.httpContent == null) {
      return await this._http.get(twitterQuery.url, options)
        .toPromise()
        .then((data: Response) => {
          debugger
          return data;
        });
    } else {
      if (httpMethod !== 'POST') {
        throw new ArgumentException("Cannot send HttpContent in a WebRequest that is not POST.");
      }

      let formData = new FormData();
      let file = SharebookConsts.fileCurrent;

      formData.append(`${file.name}`, file);

      return this._http.post(twitterQuery.url, formData, options)
         .toPromise()
         .then((data?: Response) => {
         debugger
         return new HttpResponse<any>({statusText: "ok"});
       });
    }
  }

  public getHttpClient(twitterQuery: ITwitterQuery, twitterHandler?: ITwitterClientHandler): HttpClient {
    let oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.create();
    let handler: TwitterClientHandler = (twitterHandler as TwitterClientHandler) ?? new TwitterClientHandler(oAuthWebRequestGenerator);
    handler.twitterQuery = twitterQuery;

    let client = new HttpClient(handler);
    client.timeout = twitterQuery.timeout;

    return client;
  }

  private setHeaders(options: any, needId?: boolean) {
    debugger
    if (needId && this.securityService) {
      options["headers"] = new HttpHeaders()
        .append('authorization', 'Bearer ' + this.securityService.getToken())
        .append('x-requestid', Guid.newGuid());
    } else if (this.securityService) {
      options["headers"] = new HttpHeaders()
        .append('authorization', 'Bearer ' + this.securityService.getToken());
    }
  }
}
