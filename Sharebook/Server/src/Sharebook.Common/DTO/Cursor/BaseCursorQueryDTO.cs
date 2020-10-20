namespace Sharebook.Common.DTO.Cursor
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;

    public abstract class BaseCursorQueryDTO<T> : IBaseCursorQueryDTO<T>
    {
        [JsonProperty("previous_cursor")]
        public virtual long PreviousCursor { get; set; }

        [JsonProperty("next_cursor")]
        public virtual long NextCursor { get; set; }

        [JsonProperty("previous_cursor_str")]
        public virtual string PreviousCursorStr { get; set; }

        [JsonProperty("next_cursor_str")]
        public virtual string NextCursorStr { get; set; }

        [JsonIgnore]
        public string RawResult { get; set; }

        [JsonIgnore]
        public IEnumerable<T> Results { get; set; }

        public abstract int GetNumberOfObjectRetrieved();
    }
}
