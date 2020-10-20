namespace Sharebook.Message.DTO.QueryDTO.Cursor
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Sharebook.Common.DTO.Cursor;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Message.DTO.Events;

    public class MessageCursorQueryResultDTO : BaseCursorQueryDTO<IMessageEventDTO>, IMessageCursorQueryResultDTO
    {
        private IMessageEventDTO[] messageEvents;

        // This property does not exists
        [JsonIgnore]
        public override long NextCursor { get; set; }

        [JsonProperty("next_cursor")]
        public override string NextCursorStr { get; set; }

        public override int GetNumberOfObjectRetrieved()
        {
            return MessageEvents.Length;
        }

        [JsonProperty("events")]
        public IMessageEventDTO[] MessageEvents
        {
            get => this.messageEvents ?? new IMessageEventDTO[0];
            set
            {
                this.messageEvents = value;
                Results = value;
            }
        }

        [JsonProperty("apps")]
        public Dictionary<long, IApp> Apps { get; set; }
    }
}
