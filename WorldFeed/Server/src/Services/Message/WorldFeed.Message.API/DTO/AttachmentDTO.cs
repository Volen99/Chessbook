namespace WorldFeed.Common.DTO
{
    using Newtonsoft.Json;

    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Entities;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class AttachmentDTO : IAttachmentDTO
    {
        [JsonProperty("type")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public AttachmentType Type { get; set; }

        [JsonProperty("media")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMediaEntity Media { get; set; }
    }
}
