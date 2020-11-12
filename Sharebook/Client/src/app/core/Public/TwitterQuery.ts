import {Inject, Injectable} from "@angular/core";

import {HttpMethod} from "./Models/Enum/HttpMethod";
import {ISharebookSettings} from "./Settings/SharebookSettings";
import {CustomRequestHeaders} from "./Models/Interfaces/CustomRequestHeaders";
import {ITwitterQuery, ITwitterQueryToken} from "./Models/Interfaces/ITwitterQuery";
import {TwitterRequestParameters} from "./TwitterRequestParameters";
import {IProxyConfig} from "./Settings/ProxyConfig";
import {ITwitterCredentials} from "./Models/Authentication/TwitterCredentials";
import {IOAuthQueryParameter} from "../Core/Web/IOAuthQueryParameter";
import {IEndpointRateLimit} from "./Models/RateLimits/IEndpointRateLimit";
import {SharebookConsts} from "./sharebook-consts";
import {ICredentialsRateLimits} from "./Models/RateLimits/ICredentialsRateLimits";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

@Injectable({
  providedIn: 'root',
})
export class TwitterQuery extends TwitterRequestParameters implements ITwitterQuery {
  constructor(queryURL?: string,
              httpMethod?: HttpMethod,
              @Inject(ITwitterQueryToken) source?: ITwitterQuery) {
    super(source);

    if (source != null) {
      this.proxyConfig = source.proxyConfig;
      this.timeout = source.timeout;
      this.queryParameters = source.queryParameters;
      this.twitterCredentials = source.twitterCredentials;
      this.credentialsRateLimits = source.credentialsRateLimits;
      this.queryRateLimit = source.queryRateLimit;
      this.dateWhenCredentialsWillHaveTheRequiredRateLimits = source.dateWhenCredentialsWillHaveTheRequiredRateLimits;
    } else {
      this._timeout = TimeSpan.fromSeconds(10);

      let acceptHeaders = new Array<string>();
      acceptHeaders.push("image/jpeg");
      acceptHeaders.push("application/json");

      super.acceptHeaders = acceptHeaders;
      super.httpMethod = HttpMethod.GET;
      super.customHeaders = new CustomRequestHeaders();

      if (queryURL && httpMethod) {
        super.url = queryURL;
        super.httpMethod = httpMethod;
      }
    }
  }

  public proxyConfig: IProxyConfig;
  private _timeout: TimeSpan;

  get timeout(): TimeSpan {
    return this._timeout;
  }

  set timeout(value: TimeSpan) {
    if (value.getTotalMilliseconds() === 0) {   // (int)value.TotalMilliseconds == 0
      this._timeout = TimeSpan.fromSeconds(10);
      return;
    }

    if (value.getTotalMilliseconds() < 0) {   // Infinite
      this._timeout = TimeSpan.fromMilliseconds(SharebookConsts.INFINITE);  // System.Threading.Timeout.Infinite
      return;
    }

    this._timeout = value;
  }

  get timeToWaitBeforeExecutingTheQuery(): TimeSpan {
    // @ts-ignore
    let diff: TimeSpan = this.dateWhenCredentialsWillHaveTheRequiredRateLimits?.subtract(DateTime.now); // 1000% bug
    if (diff == null) {
      return null;
    }

    return diff > TimeSpan.zero ? diff : TimeSpan.zero;
  }

  public twitterCredentials: ITwitterCredentials;
  public queryParameters: IOAuthQueryParameter[];
  public queryRateLimit: IEndpointRateLimit;
  public credentialsRateLimits: ICredentialsRateLimits;
  public dateWhenCredentialsWillHaveTheRequiredRateLimits?: DateTime;

  public void;

  initialize(settings: ISharebookSettings) {
    this.timeout = settings.httpRequestTimeout;
    this.proxyConfig = settings.proxyConfig;
  }

  public ToString(): string {
    return super.url;
  }
}
