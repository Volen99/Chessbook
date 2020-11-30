﻿namespace Sharebook.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Sharebook.Common.Extensions;
    using Sharebook.Storage.Domain.AggregatesModel.PostAggregate.Entities;

    /// <summary>
    /// Object storing information related with an user mention on Twitter
    /// </summary>
    public class UserMentionEntity : IUserMentionEntity
    {
        [JsonProperty("id")]
        public long? Id { get; set; }

        [JsonProperty("id_str")]
        public string IdStr { get; set; }

        [JsonProperty("screen_name")]
        public string ScreenName { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("indices")]
        public IList<int> Indices { get; set; }

        public bool Equals(IUserMentionEntity other)
        {
            if (other == null || !Id.HasValue || !other.Id.HasValue)
            {
                return false;
            }

            if (Id.Value != other.Id.Value)
            {
                return false;
            }

            if (Indices == null || other.Indices == null)
            {
                return Equals(Indices, other.Indices);
            }

            return Indices.ContainsSameObjectsAs(other.Indices, true);
        }

        public override string ToString()
        {
            return $"@{ScreenName}";
        }
    }
}
