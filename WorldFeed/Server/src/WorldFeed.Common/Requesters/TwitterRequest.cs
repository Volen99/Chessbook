﻿//namespace WorldFeed.Common.Requesters
//{
//    using System;

//    using WorldFeed.Common.Query;
//    using WorldFeed.Common.Web;

//    public class TwitterRequest : ITwitterRequest
//    {
//        private ITwitterQuery _query;

//        public TwitterRequest()
//        {
//            Query = new TwitterQuery();
//            ExecutionContext = new TwitterExecutionContext
//            {
//                RequestFactory = () => new TwitterRequest()
//            };
//        }

//        public TwitterRequest(ITwitterRequest source) : this()
//        {
//            if (source == null)
//            {
//                return;
//            }

//            Query = new TwitterQuery(source.Query);
//            TwitterClientHandler = source.TwitterClientHandler;
//            ExecutionContext = new TwitterExecutionContext(source.ExecutionContext);
//        }

//        public ITwitterQuery Query
//        {
//            get => _query;
//            set => _query = value ?? throw new ArgumentException("Cannot set query to null");
//        }

//        public ITwitterExecutionContext ExecutionContext { get; set; }

//        public ITwitterClientHandler TwitterClientHandler { get; set; }
//    }
//}
