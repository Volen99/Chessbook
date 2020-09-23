﻿namespace WorldFeed.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Entities;

    /// <summary>
    /// Object storing information related with an URL on twitter
    /// </summary>
    public class UrlEntity : IUrlEntity
    {
        [JsonProperty("url")]
        public string URL { get; set; }

        [JsonProperty("display_url")]
        public string DisplayedURL { get; set; }

        [JsonProperty("expanded_url")]
        public string ExpandedURL { get; set; }

        [JsonProperty("indices")]
        public int[] Indices { get; set; }

        public bool Equals(IUrlEntity other)
        {
            if (other == null)
            {
                return false;
            }

            var areUrlDifferent = URL != other.URL ||
                                  ExpandedURL != other.ExpandedURL ||
                                  DisplayedURL != other.DisplayedURL;

            if (areUrlDifferent)
            {
                return false;
            }

            if (Indices == null || other.Indices == null)
            {
                return Indices == other.Indices;
            }

            return Indices.ContainsSameObjectsAs(other.Indices, true);
        }

        public override string ToString()
        {
            return URL;
        }
    }
}
