namespace Sharebook.Common.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Entities;
    using Sharebook.Common.Public.Models.Enums;
    using Sharebook.Common.Public.Models.Interfaces.DTO;

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
