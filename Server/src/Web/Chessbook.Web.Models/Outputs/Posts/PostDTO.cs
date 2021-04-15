namespace Chessbook.Web.Models.Outputs.Posts
{
    using System;
    using AutoMapper;
    using Chessbook.Data.Models.Polls;
    using Chessbook.Data.Models.Post;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Outputs.Polls;
    using Newtonsoft.Json;

    public class PostDTO : IMapFrom<Post>, IMapTo<Post>, IHaveCustomMappings
    {
        public PostDTO()
        {
            this.Entities = new ObjectEntitiesDTO
            {
                Poll = this.Poll,
            };
        }

        public int Id { get; set; }

        public string IdStr => this.Id.ToString();

        public string Text { get; set; }

        public string FullText { get; set; }

        public int[] DisplayTextRange { get; set; }

        public bool Favorited { get; set; }

        public long FavoriteCount { get; set; }

        public long DislikeCount { get; set; }

        public UserDTO User { get; set; }                                    // public IUserDTO CreatedBy { get; set; }

        ////[JsonProperty("current_user_retweet")]
        ////public ITweetIdentifier CurrentUserRetweetIdentifier { get; set; }

        //[JsonProperty("coordinates")]
        //public Coordinates Coordinates { get; set; }

        //public IEnumerable<MediaEntity> Medias { get; set; }              

        public ObjectEntitiesDTO Entities { get; set; }

        //public void CreateMappings(IProfileExpression configuration)
        //{
        //    configuration.CreateMap<Post, PostDTO>()
        //        .ForMember(x => x.Medias, options =>
        //        {
        //            options.MapFrom(p => p.Medias);
        //        });
        //}

        public int PollId { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool Truncated { get; set; }

        public int? ReplyCount { get; set; }

        public int? InReplyToStatusId { get; set; }

        public string InReplyToStatusIdStr { get; set; }

        public int? InReplyToUserId { get; set; }

        public string InReplyToUserIdStr { get; set; }

        public string InReplyToScreenName { get; set; }

        [JsonIgnore]
        public PollDTO Poll { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {

        }

        //[JsonProperty("quote_count")]
        //public int? QuoteCount { get; set; }

        //[JsonProperty("quoted_status_id")]
        //public long? QuotedStatusId { get; set; }

        //[JsonProperty("quoted_status_id_str")]
        //public string QuotedStatusIdStr { get; set; }

        //[JsonProperty("quoted_status")]
        //public PostDTO QuotedTweetDTO { get; set; }

        //[JsonProperty("retweet_count")]
        //public int RetweetCount { get; set; }

        //[JsonProperty("retweeted")]
        //public bool Retweeted { get; set; }

        //[JsonProperty("retweeted_status")]
        //public PostDTO RetweetedTweetDTO { get; set; }

        //[JsonProperty("possibly_sensitive")]
        //public bool PossiblySensitive { get; set; }

        ////[JsonProperty("lang")]
        ////public Language? Language { get; set; }

        //[JsonProperty("contributorsIds")]
        //public int[] ContributorsIds { get; set; }

        //[JsonProperty("contributors")]
        //public IEnumerable<long> Contributors { get; set; }

        //[JsonProperty("source")]
        //public string Source { get; set; }

        //[JsonProperty("place")]
        //public Place Place { get; set; }

        //[JsonProperty("scopes")]
        //public Dictionary<string, object> Scopes { get; set; }

        //[JsonProperty("filter_level")]
        //public string FilterLevel { get; set; }

        //[JsonProperty("withheld_copyright")]
        //public bool WithheldCopyright { get; set; }

        //[JsonProperty("withheld_in_countries")]
        //public IEnumerable<string> WithheldInCountries { get; set; }

        //[JsonProperty("withheld_scope")]
        //public string WithheldScope { get; set; }

        //public void CreateMappings(IProfileExpression configuration)
        //{
        //    configuration.CreateMap<Post, PostDTO>()
        //        .ForMember(x => x.Entities.Medias, options =>
        //        {
        //            options.MapFrom(p => p.Medias);
        //        });
        //}
    }
}
