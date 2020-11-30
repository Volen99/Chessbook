namespace Sharebook.Storage.API.Data.Models.TwitterEntities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using Sharebook.Common.Extensions;
    using Sharebook.Storage.API.Data.Models.ExtendedEntities;

    /// <summary>
    /// Object storing information related with a Media on Twitter
    /// </summary>
    public class MediaEntity
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
        [NotMapped]
        public int[] Indices { get; set; }

        //[JsonProperty("sizes")]
        [NotMapped]
        public Dictionary<string, MediaEntitySize> Sizes { get; set; }

        //[JsonProperty("video_info")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        [NotMapped]
        public VideoInformationEntity VideoDetails { get; set; }

        public bool Equals(MediaEntity other)
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
