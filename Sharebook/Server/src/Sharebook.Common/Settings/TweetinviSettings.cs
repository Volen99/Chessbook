﻿namespace Sharebook.Common.Settings
{
    using System;
    using Newtonsoft.Json;

    /// <summary>
    /// Provide a set of preconfigured solutions that you can use to track the Twitter rate limits.
    /// https://linvi.github.io/tweetinvi/dist/credentials/rate-limits.html
    /// </summary>
    public enum RateLimitTrackerMode
    {
        /// <summary>
        /// By default Tweetinvi let you handle the RateLimits on your own
        /// </summary>
        None,

        /// <summary>
        /// This option will track the actions performed and update the internal RateLimits.
        /// If not enought RateLimits are available to perform the query, the current thread will
        /// await for the RateLimits to be available before continuing its process.
        /// </summary>
        TrackAndAwait,

        /// <summary>
        /// This option will only track the actions performed and update the internal RateLimits.
        /// This option won't pause a thread if you do not have enough RateLimits to perform a query.
        /// </summary>
        TrackOnly,
    }

    /// <summary>
    /// Specify whether you want your tweet to use Twitter extended mode.
    /// </summary>
    public enum TweetMode
    {
        Extended = 0,
        Compat = 1,
        None = 2
    }

    public interface ITweetinviSettings
    {
        /// <summary>
        /// Proxy used to execute Http Requests.
        /// </summary>
        IProxyConfig ProxyConfig { get; set; }

        /// <summary>
        /// Http Requests Timeout duration in milliseconds.
        /// </summary>
        TimeSpan HttpRequestTimeout { get; set; }

        /// <summary>
        /// Solution used to track the RateLimits.
        /// </summary>
        RateLimitTrackerMode RateLimitTrackerMode { get; set; }

        /// <summary>
        /// How much additional time to wait than should be strictly necessary for a new batch of Twitter rate limits
        /// to be available. Required to account for timing discrepancies both within Twitter's servers and between
        /// Twitter and us.
        /// </summary>
        TimeSpan RateLimitWaitFudge { get; set; }

        /// <summary>
        /// Specify whether you want your tweet to use the extended mode.
        /// </summary>
        TweetMode? TweetMode { get; set; }

        /// <summary>
        /// A method allowing developers to specify how to retrieve the current DateTime.
        /// The DateTime must be valid for the HttpRequest signature to be accepted by Twitter.
        /// </summary>
        Func<DateTime> GetUtcDateTime { get; set; }

        /// <summary>
        /// Converters used by Tweetinvi to transform json received from Twitter
        /// into models understandable by Tweetinvi.
        /// </summary>
        JsonConverter[] Converters { get; set; }

        /// <summary>
        /// Limits that Tweetinvi will use to communicate with Twitter
        /// </summary>
        WorldFeedLimits Limits { get; set; }

        /// <summary>
        /// Initialize a setting from another one.
        /// </summary>
        void Initialize(ITweetinviSettings other);
    }

    public class TweetinviSettings : ITweetinviSettings
    {
        public TweetinviSettings()
        {
            GetUtcDateTime = () => DateTime.UtcNow;
            Limits = new WorldFeedLimits();
            HttpRequestTimeout = TimeSpan.FromSeconds(57);
        }

        public TweetinviSettings(ITweetinviSettings source) : this()
        {
            if (source == null)
            {
                return;
            }

            ProxyConfig = source.ProxyConfig == null || source.ProxyConfig.Address == null ? null : new ProxyConfig(source.ProxyConfig);
            HttpRequestTimeout = source.HttpRequestTimeout;
            RateLimitTrackerMode = source.RateLimitTrackerMode;
            RateLimitWaitFudge = source.RateLimitWaitFudge;
            TweetMode = source.TweetMode;
            GetUtcDateTime = source.GetUtcDateTime;
            Converters = source.Converters;
            Limits = new WorldFeedLimits(source.Limits);
        }

        public IProxyConfig ProxyConfig { get; set; }

        public TimeSpan HttpRequestTimeout { get; set; }

        public RateLimitTrackerMode RateLimitTrackerMode { get; set; }

        public TimeSpan RateLimitWaitFudge { get; set; }

        public TweetMode? TweetMode { get; set; }

        public Func<DateTime> GetUtcDateTime { get; set; }

        public WorldFeedLimits Limits { get; set; }

        public JsonConverter[] Converters { get; set; }

        public void Initialize(ITweetinviSettings other)
        {
            ProxyConfig = other.ProxyConfig;
            HttpRequestTimeout = other.HttpRequestTimeout;
            RateLimitTrackerMode = other.RateLimitTrackerMode;
            RateLimitWaitFudge = other.RateLimitWaitFudge;
            TweetMode = other.TweetMode;
            GetUtcDateTime = other.GetUtcDateTime;
            Converters = other.Converters;
            Limits = new WorldFeedLimits(other.Limits);
        }
    }
}
