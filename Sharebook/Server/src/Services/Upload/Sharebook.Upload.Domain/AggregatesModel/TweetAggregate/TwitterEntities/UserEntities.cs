namespace Sharebook.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities
{
    using Newtonsoft.Json;

    using Sharebook.Upload.Domain.AggregatesModel.PostAggregate.Entities;

    public class UserEntities : IUserEntities
    {
        //[JsonProperty("url")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IWebsiteEntity Website { get; set; }

        //[JsonProperty("description")]
        //[JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IDescriptionEntity Description { get; set; }
    }
}