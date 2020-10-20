namespace Sharebook.Message.DTO
{
    using Newtonsoft.Json;

    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Entities;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public class MessageDataDTO : IMessageDataDTO
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("entities")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IMessageEntities Entities { get; set; }

        [JsonProperty("quick_reply")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IQuickReplyDTO QuickReply { get; set; }

        [JsonProperty("quick_reply_response")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IQuickReplyResponse QuickReplyResponse { get; set; }

        [JsonProperty("attachment")]
        [JsonConverter(typeof(JsonPropertyConverterRepository))]
        public IAttachmentDTO Attachment { get; set; }
    }
}
