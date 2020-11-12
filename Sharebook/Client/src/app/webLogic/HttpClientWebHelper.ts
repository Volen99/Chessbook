import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";

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

@Injectable({
  providedIn: 'root',
})
export class HttpClientWebHelper implements IHttpClientWebHelper {
  private readonly _oAuthWebRequestGeneratorFactory: IOAuthWebRequestGeneratorFactory;
  private _http: HttpClient;

  // All observables returned from HttpClient methods are cold by design. Execution of the HTTP request is
  // deferred, allowing you to extend the observable with additional operations such as tap and catchError
  // before anything actually happens.
  constructor(@Inject(IOAuthWebRequestGeneratorFactoryToken) oAuthWebRequestGeneratorFactory: IOAuthWebRequestGeneratorFactory,
              httpClient: HttpClient) {
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

    debugger
    if (twitterQuery.httpContent?.binary == null) {
      let options = {
        observe: 'response',
        responseType: "arraybuffer"
      };
      // this.setHeaders(options, needId);

      return await this._http.get('https://jsonplaceholder.typicode.com/todos/1', options)
        .toPromise()
        .then((data: Response) => {
          debugger
          return data;
        });
    } else {
      if (httpMethod !== 'POST') {
        throw new ArgumentException("Cannot send HttpContent in a WebRequest that is not POST.");
      }

      return client.post('https://jsonplaceholder.typicode.com/todos/1',
        twitterQuery.httpContent.binary,
        twitterQuery.httpContent.headers)
        .toPromise()
        .then((data: Response) => {
        debugger
        return data;
      });
    }

    return response;
  }

  public getHttpClient(twitterQuery: ITwitterQuery, twitterHandler?: ITwitterClientHandler): HttpClient {
    let oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.create();
    let handler: TwitterClientHandler = (twitterHandler as TwitterClientHandler) ?? new TwitterClientHandler(oAuthWebRequestGenerator);
    handler.twitterQuery = twitterQuery;

    let client = new HttpClient(handler);
    client.timeout = twitterQuery.timeout;

    return client;
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side network error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error('Backend - ' +
        `status: ${error.status}, ` +
        `statusText: ${error.statusText}, ` +
        `message: ${error.error.message}`);
    }

    // return an observable with a user-facing error message
    return throwError(error || 'server error');
  }
}
