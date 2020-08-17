﻿namespace WorldFeed.Common.Models.Properties
{
    using Newtonsoft.Json;

    using global::WorldFeed.Common.Exceptions;

    public class TwitterExceptionInfo : ITwitterExceptionInfo
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("label")]
        public string Label { get; set; }
    }
}
