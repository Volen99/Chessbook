import List from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/List";
import TimeSpan from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import {HttpMethod} from "./Models/Enum/HttpMethod";
import DateTime from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {ITweetinviSettings} from "./Settings/TweetinviSettings";
import {CustomRequestHeaders} from "./Models/Interfaces/CustomRequestHeaders";
import {ITwitterQuery} from "./Models/Interfaces/ITwitterQuery";
import {TwitterRequestParameters} from "./TwitterRequestParameters";
import {IProxyConfig} from "./Settings/ProxyConfig";
import {ITwitterCredentials} from "./Models/Authentication/TwitterCredentials";
import {IOAuthQueryParameter} from "../Core/Web/IOAuthQueryParameter";
import {IEndpointRateLimit} from "./Models/RateLimits/IEndpointRateLimit";
import {SharebookConsts} from "./sharebook-consts";

export class TwitterQuery extends TwitterRequestParameters implements ITwitterQuery {
  constructor(queryURL?: string, httpMethod?: HttpMethod, source?: ITwitterQuery) {
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

      let acceptHeaders = new List<string>();
      acceptHeaders.add("image/jpeg");
      acceptHeaders.add("application/json");

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
    let diff = this.dateWhenCredentialsWillHaveTheRequiredRateLimits?.subtract(DateTime.now);     // 1000% bug
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

  initialize(settings: ITweetinviSettings) {
    this.timeout = settings.httpRequestTimeout;
    this.proxyConfig = settings.proxyConfig;
  }

  public ToString(): string {
    return super.url;
  }
}
