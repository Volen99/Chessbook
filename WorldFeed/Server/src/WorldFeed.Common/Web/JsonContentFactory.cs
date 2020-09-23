namespace WorldFeed.Common.Web
{
    using System.Net.Http;
    using System.Text;
    using Newtonsoft.Json;

    using WorldFeed.Common.Helpers;

    public class JsonContentFactory
    {
        private readonly IJsonObjectConverter jsonObjectConverter;

        public JsonContentFactory(IJsonObjectConverter jsonObjectConverter)
        {
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public StringContent Create<T>(T content)
        {
            return Create(content, null);
        }

        public StringContent Create<T>(T content, JsonConverter[] converters)
        {
            var jsonBody = this.jsonObjectConverter.Serialize(content, converters);
            return new StringContent(jsonBody, Encoding.UTF8, "application/json");
        }
    }
}
