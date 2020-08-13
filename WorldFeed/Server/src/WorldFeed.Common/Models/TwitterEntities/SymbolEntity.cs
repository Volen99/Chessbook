﻿namespace WorldFeed.Common.Models.TwitterEntities
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Models.Entities;

    public class SymbolEntity : ISymbolEntity
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("indices")]
        public int[] Indices { get; set; }

        public bool Equals(ISymbolEntity other)
        {
            if (other == null)
            {
                return false;
            }

            if (Text != other.Text)
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
            return $"{Text}";
        }
    }
}