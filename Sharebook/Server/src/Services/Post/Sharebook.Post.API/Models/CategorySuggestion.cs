namespace Sharebook.Post.API.Models
{
    using Newtonsoft.Json;

    using Sharebook.Common.Public.Models.Interfaces;

    public class CategorySuggestion : ICategorySuggestion
    {
        [JsonProperty("name")]
        public string Name { get; private set; }

        [JsonProperty("slug")]
        public string Slug { get; private set; }

        [JsonProperty("size")]
        public int Size { get; private set; }
    }
}
