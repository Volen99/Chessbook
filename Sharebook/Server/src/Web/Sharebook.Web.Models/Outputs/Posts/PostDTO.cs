namespace Sharebook.Web.Models.Outputs.Posts
{
    using System;
    using System.Collections.Generic;
    using AutoMapper;
    using Newtonsoft.Json;

    using Sharebook.Data.Models;
    using Sharebook.Data.Models.Post;
    using Sharebook.Data.Models.Post.Entities;
    using Sharebook.Data.Models.Post.Properties;
    using Sharebook.Services.Mapping;

    public class PostDTO : IMapFrom<Post>, IMapTo<Post>
    {
        public PostDTO()
        {
            this.Entities = new ObjectEntitiesDTO();
        }

        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("id_str")]
        public string IdStr => this.Id.ToString();

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("full_text")]
        public string FullText { get; set; }

        [JsonProperty("display_text_range")]
        public int[] DisplayTextRange { get; set; }

        [JsonProperty("favorited")]
        public bool Favorited { get; set; }

        public long FavoriteCount { get; set; }

        public long DislikeCount { get; set; }

        [JsonProperty("user")]
        public UserDTO User { get; set; }                                    // public IUserDTO CreatedBy { get; set; }

        ////[JsonProperty("current_user_retweet")]
        ////public ITweetIdentifier CurrentUserRetweetIdentifier { get; set; }

        //[JsonProperty("coordinates")]
        //public Coordinates Coordinates { get; set; }

        //public IEnumerable<MediaEntity> Medias { get; set; }              
        public string MediasIds { get; set; }

        public ObjectEntitiesDTO Entities { get; set; }

        //public void CreateMappings(IProfileExpression configuration)
        //{
        //    configuration.CreateMap<Post, PostDTO>()
        //        .ForMember(x => x.Medias, options =>
        //        {
        //            options.MapFrom(p => p.Medias);
        //        });
        //}



        public DateTime CreatedAt { get; set; }

        //[JsonProperty("truncated")]
        //public bool Truncated { get; set; }

        //[JsonProperty("reply_count")]
        //public int? ReplyCount { get; set; }

        //[JsonProperty("in_reply_to_status_id")]
        //public long? InReplyToStatusId { get; set; }

        //[JsonProperty("in_reply_to_status_id_str")]
        //public string InReplyToStatusIdStr { get; set; }

        //[JsonProperty("in_reply_to_user_id")]
        //public long? InReplyToUserId { get; set; }

        //[JsonProperty("in_reply_to_user_id_str")]
        //public string InReplyToUserIdStr { get; set; }

        //[JsonProperty("in_reply_to_screen_name")]
        //public string InReplyToScreenName { get; set; }

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
