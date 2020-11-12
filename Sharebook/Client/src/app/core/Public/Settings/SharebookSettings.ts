import {SharebookLimits} from "./SharebookLimits";
import {IProxyConfig, ProxyConfig} from "./ProxyConfig";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import {Inject, InjectionToken} from "@angular/core";

// Provide a set of preconfigured solutions that you can use to track the Twitter rate limits.
export enum RateLimitTrackerMode {
  // By default Tweetinvi let you handle the RateLimits on your own
  None,

  // This option will track the actions performed and update the internal RateLimits.
  // If not enought RateLimits are available to perform the query, the current thread will
  // await for the RateLimits to be available before continuing its process.
  TrackAndAwait,

  // This option will only track the actions performed and update the internal RateLimits.
  // This option won't pause a thread if you do not have enough RateLimits to perform a query.
  TrackOnly,
}

// Specify whether you want your tweet to use Twitter extended mode.
export enum TweetMode {
  Extended = 0,
  Compat = 1,
  None = 2
}

export interface ISharebookSettings {
  // Proxy used to execute Http Requests.
  proxyConfig: IProxyConfig;

  // Http Requests Timeout duration in milliseconds.
  httpRequestTimeout: TimeSpan;

  // Solution used to track the RateLimits.
  rateLimitTrackerMode: RateLimitTrackerMode;

  // How much additional time to wait than should be strictly necessary for a new batch of Twitter rate limits
  // to be available. Required to account for timing discrepancies both within Twitter's servers and between Twitter and us.
  rateLimitWaitFudge: TimeSpan;

  // Specify whether you want your tweet to use the extended mode.
  tweetMode?: TweetMode;

  // A method allowing developers to specify how to retrieve the current DateTime.
  // The DateTime must be valid for the HttpRequest signature to be accepted by Sharebook.
  getUtcDateTime: () => DateTime;

  // Converters used by Tweetinvi to transform json received from Sharebook
  // into models understandable by Tweetinvi.
  converters: any; // JsonConverter[];

  // Limits that Tweetinvi will use to communicate with Sharebook
  limits: SharebookLimits;

  // Initialize a setting from another one.
  initialize(other: ISharebookSettings): void;
}

export const ISharebookSettingsToken = new InjectionToken<ISharebookSettings>('ISharebookSettings', {
  providedIn: 'root',
  factory: () => new SharebookSettings(),
});

export class SharebookSettings implements ISharebookSettings {
  constructor(@Inject(ISharebookSettingsToken) source?: ISharebookSettings) {
    if (!source) {
      this.getUtcDateTime = () => DateTime.now; /*UtcNow*/
      this.limits = new SharebookLimits();
      this.httpRequestTimeout = TimeSpan.fromSeconds(10);
      this.tweetMode = TweetMode.Extended;
    } else {
      this.proxyConfig = source.proxyConfig == null || source.proxyConfig.address == null ? null : new ProxyConfig(source.proxyConfig);
      this.httpRequestTimeout = source.httpRequestTimeout;
      this.rateLimitTrackerMode = source.rateLimitTrackerMode;
      this.rateLimitWaitFudge = source.rateLimitWaitFudge;
      this.tweetMode = source.tweetMode;
      this.getUtcDateTime = source.getUtcDateTime;
      this.converters = source.converters;
      this.limits = new SharebookLimits(source.limits);
    }
  }

  public proxyConfig: IProxyConfig;
  public httpRequestTimeout: TimeSpan;
  public rateLimitTrackerMode: RateLimitTrackerMode;
  public rateLimitWaitFudge: TimeSpan;
  public tweetMode?: TweetMode;
  public getUtcDateTime: () => DateTime;
  public limits: SharebookLimits;

  public converters: any; // JsonConverter[];

  public initialize(other: ISharebookSettings): void {
    this.proxyConfig = other.proxyConfig;
    this.httpRequestTimeout = other.httpRequestTimeout;
    this.rateLimitTrackerMode = other.rateLimitTrackerMode;
    this.rateLimitWaitFudge = other.rateLimitWaitFudge;
    this.tweetMode = other.tweetMode;
    this.getUtcDateTime = other.getUtcDateTime;
    this.converters = other.converters;
    this.limits = new SharebookLimits(other.limits);
  }
}
