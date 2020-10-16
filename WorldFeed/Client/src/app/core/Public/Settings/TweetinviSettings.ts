import TimeSpan from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import {TwitterLimits} from "./TwitterLimits";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {IProxyConfig, ProxyConfig} from "./ProxyConfig";

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

export interface ITweetinviSettings {
  // Proxy used to execute Http Requests.
  ProxyConfig: IProxyConfig;

  // Http Requests Timeout duration in milliseconds.
  HttpRequestTimeout: TimeSpan;

  // Solution used to track the RateLimits.
  RateLimitTrackerMode: RateLimitTrackerMode;

  // How much additional time to wait than should be strictly necessary for a new batch of Twitter rate limits
  // to be available. Required to account for timing discrepancies both within Twitter's servers and between Twitter and us.
  RateLimitWaitFudge: TimeSpan;

  // Specify whether you want your tweet to use the extended mode.
  TweetMode?: TweetMode;

  // A method allowing developers to specify how to retrieve the current DateTime.
  // The DateTime must be valid for the HttpRequest signature to be accepted by Twitter.
  GetUtcDateTime: () => DateTime;

  // Converters used by Tweetinvi to transform json received from Twitter
  // into models understandable by Tweetinvi.
  Converters: JsonConverter[];

  // Limits that Tweetinvi will use to communicate with Twitter
  Limits: TwitterLimits;

  // Initialize a setting from another one.
  Initialize(other: ITweetinviSettings): void;
}

export class TweetinviSettings implements ITweetinviSettings {
  constructor(source?: ITweetinviSettings) {
    if (!source) {
      this.GetUtcDateTime = () => DateTime.now; /*UtcNow*/
      this.Limits = new TwitterLimits();
      this.HttpRequestTimeout = TimeSpan.fromSeconds(10);
      this.TweetMode = TweetMode.Extended;
    } else {
      this.ProxyConfig = source.ProxyConfig == null || source.ProxyConfig.Address == null ? null : new ProxyConfig(source.ProxyConfig);
      this.HttpRequestTimeout = source.HttpRequestTimeout;
      this.RateLimitTrackerMode = source.RateLimitTrackerMode;
      this.RateLimitWaitFudge = source.RateLimitWaitFudge;
      this.TweetMode = source.TweetMode;
      this.GetUtcDateTime = source.GetUtcDateTime;
      this.Converters = source.Converters;
      this.Limits = new TwitterLimits(source.Limits);
    }
  }

  public ProxyConfig: IProxyConfig;
  public HttpRequestTimeout: TimeSpan;
  public RateLimitTrackerMode: RateLimitTrackerMode;
  public RateLimitWaitFudge: TimeSpan;
  public TweetMode?: TweetMode;
  public GetUtcDateTime: () => DateTime;
  public Limits: TwitterLimits;

  public Converters: JsonConverter[];

  public Initialize(other: ITweetinviSettings): void {
    this.ProxyConfig = other.ProxyConfig;
    this.HttpRequestTimeout = other.HttpRequestTimeout;
    this.RateLimitTrackerMode = other.RateLimitTrackerMode;
    this.RateLimitWaitFudge = other.RateLimitWaitFudge;
    this.TweetMode = other.TweetMode;
    this.GetUtcDateTime = other.GetUtcDateTime;
    this.Converters = other.Converters;
    this.Limits = new TwitterLimits(other.Limits);
  }
}
