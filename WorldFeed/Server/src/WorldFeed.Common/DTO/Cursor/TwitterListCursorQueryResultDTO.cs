namespace WorldFeed.Common.DTO.Cursor
{
    using Newtonsoft.Json;

    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;

    public class TwitterListCursorQueryResultDTO : BaseCursorQueryDTO<ITwitterListDTO>, ITwitterListCursorQueryResultDTO
    {
        private ITwitterListDTO[] twitterLists;

        [JsonProperty("lists")]
        public ITwitterListDTO[] TwitterLists
        {
            get => this.twitterLists ?? new ITwitterListDTO[0];
            set
            {
                this.twitterLists = value;
                Results = value;
            }
        }

        public override int GetNumberOfObjectRetrieved()
        {
            return TwitterLists.Length;
        }
    }
}
