namespace Sharebook.Storage.API.Data.Models.TwitterEntities
{
    using Newtonsoft.Json;

    using Sharebook.Common.Extensions;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// A hashtag is a keyword prefixed by # and representing a category of tweet
    /// This class stores information related with an user mention
    /// </summary>
    public class HashtagEntity
    {
        public int Id { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("indices")]
        [NotMapped]
        public int[] Indices { get; set; }

        public bool Equals(HashtagEntity other)
        {
            if (other == null || Text != other.Text)
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
            return $"#{Text}";
        }
    }
}
