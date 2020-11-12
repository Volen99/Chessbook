import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";

import {ITwitterClientHandler} from "../core/Core/Web/ITwitterClientHandler";
import {IOAuthWebRequestGenerator} from "../core/Core/Web/IOAuthWebRequestGenerator";
import {ITwitterQuery} from '../core/Public/Models/Interfaces/ITwitterQuery';
import {CustomHeaderWill} from "../core/Public/Models/Interfaces/CustomRequestHeaders";
import {Observable} from "rxjs";
import Type from "typescript-dotnet-commonjs/System/Types";

export class TwitterClientHandler extends HttpHandler implements ITwitterClientHandler {
  private readonly _action: (twitterQuery: ITwitterQuery, httpRequestMessage: HttpRequest<any>) => void;
  private readonly _func: (twitterQuery: ITwitterQuery, httpRequestMessage: HttpRequest<any>) => string;
  protected WebRequestGenerator: IOAuthWebRequestGenerator;

  private _twitterQuery: ITwitterQuery;

  constructor(oAuthWebRequestGenerator: IOAuthWebRequestGenerator, func?: (twitterQuery: ITwitterQuery, httpRequestMessage: HttpRequest<any>) => string | void,
              isFuncReturningVoid?: boolean) {
    super();

    if (func) {
      if (isFuncReturningVoid) {
        this._action = func;
      } else {
        this._func = func as ((twitterQuery: ITwitterQuery, httpRequestMessage: HttpRequest<HttpRequest<any>>) => string);
      }
    }

    // super.useCookies = false;
    // super.useDefaultCredentials = false;

    this.WebRequestGenerator = oAuthWebRequestGenerator;
  }

  get twitterQuery(): ITwitterQuery {
    return this._twitterQuery;
  }

  set twitterQuery(value: ITwitterQuery) {
    this._twitterQuery = value;

    // if (value != null) {
    //   super.proxy = value.proxyConfig;
    //
    //   if (Proxy != null) {
    //     UseProxy = true;
    //   }
    // }
    // else {
    //   super.Proxy = null;
    //   super.UseProxy = false;
    // }
  }

  protected async SendAsync(request: HttpRequest<any>, twitterQueryOrAuthorizationHeader?: ITwitterQuery | string): Promise<HttpResponse<any>> {
    let twitterQueryCurrent: ITwitterQuery;
    let authorizationHeaderCurrent: string;

    if (!twitterQueryOrAuthorizationHeader) {
      twitterQueryCurrent = this._twitterQuery;
    }

    if (Type.isString(twitterQueryOrAuthorizationHeader)) {
      authorizationHeaderCurrent = twitterQueryOrAuthorizationHeader;
      twitterQueryCurrent = this._twitterQuery;
    } else {
      twitterQueryCurrent = twitterQueryOrAuthorizationHeader;

      this._action(twitterQueryCurrent, request);

      if (this._func != null) {
        twitterQueryCurrent.authorizationHeader = this._func(twitterQueryCurrent, request);
      } else {
        await this.WebRequestGenerator.setTwitterQueryAuthorizationHeaderAsync(twitterQueryCurrent);
      }

      authorizationHeaderCurrent = twitterQueryCurrent.authorizationHeader;
    }

    request.headers.set("User-Agent", "Tweetinvi/5.0.0-beta-1");
    // request.headers.ExpectContinue = false;
    // request.headers.CacheControl = new CacheControlHeaderValue { NoCache = true };
    request.headers.set("Authorization", authorizationHeaderCurrent);
    // request.version = new Version("1.1");

    twitterQueryCurrent?.acceptHeaders.forEach(contentType => {
      // request.headers.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType));
    });

    [...this._twitterQuery?.customHeaders].forEach(customHeader => {
      if (customHeader.behaviour === CustomHeaderWill.RemoveGeneratedHeaders) {
        request.headers.delete(customHeader.key);
        return;
      }

      if (customHeader.behaviour === CustomHeaderWill.OverrideGeneratedHeaders) {
        if (request.headers.has(customHeader.key)) {
          request.headers.delete(customHeader.key);
        }
      }

      request.headers.set(customHeader.key, customHeader.values); // TryAddWithoutValidation
    });

    // return base.SendAsync(request);
    return null;
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return undefined;
  }
}
