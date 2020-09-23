﻿namespace WorldFeed.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities
{
    using System.Collections.Generic;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.Entities;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.Entities.ExtendedEntities;
    using WorldFeed.Post.Domain.Common;

    /// <summary>
    /// Object storing information related with a Media on Twitter
    /// </summary>
    public class MediaEntity : Entity<long>
    {
        //[JsonProperty("id")]
        public long? Id { get; set; }

        //[JsonProperty("id_str")]
        public string IdStr { get; set; }

        //[JsonProperty("url")]
        public string URL { get; set; }

        //[JsonProperty("display_url")]
        public string DisplayURL { get; set; }

       //[JsonProperty("expanded_url")]
        public string ExpandedURL { get; set; }

       //[JsonProperty("media_url")]
        public string MediaURL { get; set; }

        //[JsonProperty("media_url_https")]
        public string MediaURLHttps { get; set; }

        //[JsonProperty("type")]
        public string MediaType { get; set; }

        //[JsonProperty("indices")]
        public int[] Indices { get; set; }

        //[JsonProperty("sizes")]
        public Dictionary<string, IMediaEntitySize> Sizes { get; set; }

        //[JsonProperty("video_info")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IVideoInformationEntity VideoDetails { get; set; }

        public bool Equals(IMediaEntity other)
        {
            if (Id == null || other == null || Id != other.Id)
            {
                return false;
            }

            if (Indices == null || other.Indices == null)
            {
                return Indices == other.Indices;
            }

            return Indices.ContainsSameObjectsAs(other.Indices, true);
        }
    }
}
