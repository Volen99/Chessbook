import {Inject, Injectable} from "@angular/core";
import {HttpResponse} from "@angular/common/http";

import {IWebRequestExecutor} from "../core/Core/Web/IWebRequestExecutor";
import {ITwitterExceptionFactory, ITwitterExceptionFactoryToken} from "../core/Public/Exceptions/SharebookException";
import {IHttpClientWebHelper, IHttpClientWebHelperToken} from '../core/Core/Helpers/IHttpClientWebHelper';
import {ITwitterResponse, ITwitterResponseToken} from "../core/Core/Web/ITwitterResponse";
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterClientHandler} from "../core/Core/Web/ITwitterClientHandler";
import {TwitterTimeoutException} from "../core/Public/Exceptions/TwitterTimeoutException";
import Exception from "typescript-dotnet-commonjs/System/Exception";
import {Observable} from "rxjs";
import {Factory, IFactory, IFactoryToken} from "../core/Core/Injectinvi/IFactory";
import {AppInjector} from "../sharebook/Injectinvi/app-injector";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
// Generate a Token that can be used to perform OAuth queries
export class WebRequestExecutor implements IWebRequestExecutor {
  private readonly _twitterExceptionFactory: ITwitterExceptionFactory;
  private readonly _httpClientWebHelper: IHttpClientWebHelper;
  private readonly _webRequestResultFactory: IFactory<ITwitterResponse>;

  private _utf8 = require('utf8');
  private _textDecoder = new TextDecoder('utf-8');

  constructor(@Inject(ITwitterExceptionFactoryToken) twitterExceptionFactory: ITwitterExceptionFactory,
              @Inject(IHttpClientWebHelperToken) httpClientWebHelper: IHttpClientWebHelper,
              @Inject(IFactoryToken) webRequestResultFactory: IFactory<ITwitterResponse>) {
    this._twitterExceptionFactory = twitterExceptionFactory;
    this._httpClientWebHelper = httpClientWebHelper;
    this._webRequestResultFactory = webRequestResultFactory;
  }

  // Simple Query
  public executeQueryAsync(request: ITwitterRequest, handler: ITwitterClientHandler = null): Promise<ITwitterResponse> {
    return this.executeTwitterQuerySafelyAsync(request, async () => {
      let httpResponseMessage: Response = null;
      try {
        httpResponseMessage = await this._httpClientWebHelper.getHttpResponseAsync(request.query, handler);

        let result: ITwitterResponse = await this.getWebResultFromResponse(request.query.url, httpResponseMessage);

        if (!result.isSuccessStatusCode) {
          throw this._twitterExceptionFactory.create(result, request);
        }

        // let stream = result.resultStream;

        if (httpResponseMessage != null) {
          result.binary = WebRequestExecutor.streamToBinary(httpResponseMessage);
          result.content = this._utf8.encode(this._textDecoder.decode(result.binary)); // Encoding.UTF8.GetString(result.binary);
        }

        return result;
      } catch (ex) {
        debugger
        throw Error;

        // httpResponseMessage?.Dispose();
        // throw;
      }
    });
  }

  // Multipart

  private static streamToBinary(stream: HttpResponse<any>): ArrayBuffer {
    if (stream == null) {
      return null;
    }

    return stream.body;

    // let binary: number[];

    // using (var tempMemStream = new MemoryStream())
    // {
    //     byte[] buffer = new byte[128];
    //
    //     while (true)
    //     {
    //         int read = stream.Read(buffer, 0, buffer.Length);
    //
    //         if (read <= 0)
    //         {
    //             binary = tempMemStream.ToArray();
    //             break;
    //         }
    //
    //         tempMemStream.Write(buffer, 0, read);
    //     }
    // }

    // return stream;
    return undefined;
  }

  public executeMultipartQueryAsync(request: ITwitterRequest): Promise<ITwitterResponse> {
    return this.executeTwitterQuerySafelyAsync(request, async () => {
      let httpResponseMessage: HttpResponse<any> = null;

      try {
        httpResponseMessage = await this._httpClientWebHelper.getHttpResponseAsync(request.query);

        let result = this.getWebResultFromResponse(request.query.url, httpResponseMessage);

        let stream = result.resultStream;


        if (stream != null) {
          result.binary = WebRequestExecutor.streamToBinary(stream);
          result.content = this._utf8.encode(this._textDecoder.decode(result.binary));
        }

        return result;
      } catch (Exception) {
        // httpResponseMessage?.Dispose();

        throw new Exception();
      }
    });
  }

  // Helpers
  private getWebResultFromResponse(url: string, httpResponseMessage: Response): ITwitterResponse {
    // let httpResponseMessage: Response;
    // let stream$: Observable<any> = httpResponseMessage$;

    let webRequestResult: ITwitterResponse = AppInjector.get(Factory).create('TwitterResponse');  // this._webRequestResultFactory.create('TwitterResponse');

    // webRequestResult.resultStream = stream$;
    webRequestResult.statusCode = httpResponseMessage.status; // I love God so much ♥

    const TON_API_SUCCESS_STATUS_CODE: number = 308;

    let isTonApiRequest = url.startsWith("https://ton.twitter.com");
    let isTonApiRequestSuccess = httpResponseMessage.status === TON_API_SUCCESS_STATUS_CODE;

    webRequestResult.isSuccessStatusCode = httpResponseMessage.ok || (isTonApiRequest && isTonApiRequestSuccess);

    webRequestResult.URL = url;
    webRequestResult.headers = httpResponseMessage.headers; // .ToDictionary(x => x.Key, x => x.Value);
    for (let key in Object.keys(httpResponseMessage.headers)) {
      if (httpResponseMessage[key] != null) {
        webRequestResult.headers.setValue(key, httpResponseMessage.headers[key]);
      }
    }

    return webRequestResult;
  }

  private async executeTwitterQuerySafelyAsync<T>(request: ITwitterRequest, action: () => Promise<T>): Promise<T> {
    try {
      return await action();
    } catch (aex) {
      let webException = aex.InnerException as Exception;
      let httpRequestMessageException = aex.InnerException as Exception; // HttpRequestException;
      let taskCanceledException = aex.InnerException as Exception; // TaskCanceledException;

      if (httpRequestMessageException != null) {
        // webException = httpRequestMessageException.InnerException as WebException;
      }

      if (webException != null) {
        throw this._twitterExceptionFactory.create(webException, request);
      }

      if (taskCanceledException != null) {
        throw new TwitterTimeoutException(request);
      }

      throw new Exception((aex as Exception).message);
    }
  }
}
