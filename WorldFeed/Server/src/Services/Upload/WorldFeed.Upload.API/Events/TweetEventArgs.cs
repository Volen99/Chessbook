﻿//namespace WorldFeed.Upload.Events
//{
//    using System;

//    using WorldFeed.Common.Public.Models.Interfaces;
//    using WorldFeed.Upload.Domain;

//    public class TweetEventArgs : EventArgs
//    {
//        public TweetEventArgs(ITweet tweet, string json)
//        {
//            Tweet = tweet;
//            Json = json;
//        }

//        public ITweet Tweet { get; }
//        public string Json { get; }
//    }

//    /// <summary>
//    /// Event informing that a tweet was received by a stream
//    /// </summary>
//    public class TweetReceivedEventArgs : TweetEventArgs
//    {
//        public TweetReceivedEventArgs(ITweet tweet, string json) : base(tweet, json)
//        {
//        }
//    }

//    /// <summary>
//    /// Event informing that a tweet matching a stream criteria has been received
//    /// </summary>
//    public class MatchedTweetReceivedEventArgs : TweetEventArgs
//    {
//        public MatchedTweetReceivedEventArgs(ITweet tweet, string json) : base(tweet, json)
//        {
//        }

//        public string[] MatchingTracks { get; set; }
//        public ILocation[] MatchingLocations { get; set; }
//        public long[] MatchingFollowers { get; set; }
//        public MatchOn MatchOn { get; set; }

//        public string[] QuotedTweetMatchingTracks { get; set; }
//        public ILocation[] QuotedTweetMatchingLocations { get; set; }
//        public long[] QuotedTweetMatchingFollowers { get; set; }
//        public MatchOn QuotedTweetMatchOn { get; set; }
//    }

//    public class TweetLocationDeletedEventArgs : EventArgs
//    {
//        public TweetLocationDeletedEventArgs(ITweetLocationRemovedInfo tweetLocationRemovedInfo)
//        {
//            TweetLocationRemovedInfo = tweetLocationRemovedInfo;
//        }

//        public ITweetLocationRemovedInfo TweetLocationRemovedInfo { get; }
//    }

//    public class TweetWitheldEventArgs : EventArgs
//    {
//        public TweetWitheldEventArgs(ITweetWitheldInfo tweetWitheldInfo)
//        {
//            TweetWitheldInfo = tweetWitheldInfo;
//        }

//        public ITweetWitheldInfo TweetWitheldInfo { get; }
//    }
//}
