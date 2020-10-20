namespace Sharebook.Common.DTO.Cursor
{
    using Newtonsoft.Json;

    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;

    public class IdsCursorQueryResultDTO : BaseCursorQueryDTO<long>, IIdsCursorQueryResultDTO
    {
        private long[] ids;

        [JsonProperty("ids")]
        public long[] Ids
        {
            get => this.ids ?? new long[0];
            set
            {
                this.ids = value;
                Results = value;
            }
        }

        public override int GetNumberOfObjectRetrieved()
        {
            return Ids.Length;
        }
    }
}
