namespace Sharebook.Storage.API.Data.Models.TwitterEntities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using Newtonsoft.Json;

    using Sharebook.Common.Extensions;

    /// <summary>
    /// Object storing information related with an user mention on Twitter
    /// </summary>
    public class UserMentionEntity
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
        [NotMapped]
        public IList<int> Indices { get; set; }

        public bool Equals(UserMentionEntity other)
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
