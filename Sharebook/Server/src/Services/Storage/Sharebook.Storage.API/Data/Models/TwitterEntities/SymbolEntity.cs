namespace Sharebook.Storage.API.Data.Models.TwitterEntities
{
    using Newtonsoft.Json;

    using Sharebook.Common.Extensions;
    using System.ComponentModel.DataAnnotations.Schema;

    public class SymbolEntity
    {
        public int Id { get; set; } // delete

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("indices")]
        [NotMapped]
        public int[] Indices { get; set; }

        public bool Equals(SymbolEntity other)
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