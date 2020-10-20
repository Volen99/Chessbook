namespace Sharebook.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities
{
    using Newtonsoft.Json;

    using Sharebook.Common.Extensions;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.Entities;
    using Sharebook.Post.Domain.Common;

    /// <summary>
    /// A hashtag is a keyword prefixed by # and representing a category of tweet
    /// This class stores information related with an user mention
    /// </summary>
    public class HashtagEntity : Entity<long>
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("indices")]
        public int[] Indices { get; set; }

        public bool Equals(IHashtagEntity other)
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
