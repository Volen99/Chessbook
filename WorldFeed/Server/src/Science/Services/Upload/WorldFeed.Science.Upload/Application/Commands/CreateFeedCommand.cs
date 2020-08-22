namespace WorldFeed.Science.Upload.Application.Commands
{
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using MediatR;

    using WorldFeed.Science.Upload.Domain.Models;
    using WorldFeed.Science.Upload.Domain.Models.ExtendedFeedEntities;
    using WorldFeed.Science.Upload.Domain.Models.Properties;

    // DDD and CQRS patterns comment: Note that it is recommended to implement immutable Commands
    // In this case, its immutability is achieved by having all the setters as private
    // plus only being able to update the data just once, when creating the object through its constructor.
    // References on Immutable Commands:  
    // http://cqrs.nu/Faq
    // https://docs.microsoft.com/dotnet/csharp/programming-guide/classes-and-structs/how-to-implement-a-lightweight-class-with-auto-implemented-properties

    // A command is a request for the system to perform an action that changes the state of the system.
    // Commands are imperative, and should be processed just once.
    // Thus, commands are simply data structures that contain read-only data, and no behavior
    [DataContract]
    public class CreateFeedCommand : IRequest<bool> // IRequest<bool> means that the response of request is boolean.
    {
        // When applied to the member of a type, specifies that the member is part of a contract
        // and is serializable by the System.Runtime.Serialization.DataContractSerializer
        [DataMember]
     // [JsonProperty]
        private readonly List<OrderItemDTO> orderItems;

        public CreateFeedCommand()
        {
            this.orderItems = new List<OrderItemDTO>();
        }

        public CreateFeedCommand(string fullText, bool truncated, Entities entities, ExtendedEntities extendedEntities, string source,
            int inReplyToStatusId, string inReplyToStatusIdStr, int inReplyToUserId, string inReplyToUserIdStr, string inReplyToScreenName,
            string userId, Geo geo, Coordinates coordinates, Place place, string contributors, bool isQuoteStatus, int retweetCount, int replyCount,
            int quoteCount, bool favorited, bool retweeted, bool possiblySensitive, bool possiblySensitiveEditable, string lang, string supplementalLanguage)
        {
            this.FullText = fullText;
            this.Truncated = truncated;
            this.Entities = entities;
            this.ExtendedEntities = extendedEntities;
            this.Source = source;
            this.InReplyToStatusId = inReplyToStatusId;
            this.InReplyToStatusIdStr = inReplyToStatusIdStr;
            this.InReplyToUserId = inReplyToUserId;
            this.InReplyToUserIdStr = inReplyToUserIdStr;
            this.InReplyToScreenName = inReplyToScreenName;
            this.UserId = userId;
            this.Geo = geo;
            this.Coordinates = coordinates;
            this.Place = place;
            this.Contributors = contributors;
            this.IsQuoteStatus = isQuoteStatus;
            this.RetweetCount = retweetCount;
            this.ReplyCount = replyCount;
            this.QuoteCount = quoteCount;
            this.Favorited = favorited;
            this.Retweeted = retweeted;
            this.PossiblySensitive = possiblySensitive;
            this.PossiblySensitiveEditable = possiblySensitiveEditable;
            this.Lang = lang;
            this.SupplementalLanguage = supplementalLanguage;
        }

        // CreateFeedCommand does not have an Feed Id, because the feed has not been created yet.

        [DataMember]
        public string FullText { get; private set; }

        [DataMember]
        public bool Truncated { get; private set; }

        // By default, EF Core will name the database columns for the properties of the owned entity type
        // following the pattern Navigation_OwnedEntityProperty.
        [DataMember]
        public Entities Entities { get; private set; }

        [DataMember]
        public ExtendedEntities ExtendedEntities { get; private set; }

        [DataMember]
        public string Source { get; private set; }

        [DataMember]
        public int InReplyToStatusId { get; private set; }

        [DataMember]
        public string InReplyToStatusIdStr { get; private set; }

        [DataMember]
        public int InReplyToUserId { get; private set; }

        [DataMember]
        public string InReplyToUserIdStr { get; private set; }

        [DataMember]
        public string InReplyToScreenName { get; private set; }

        [DataMember]
        public string UserId { get; private set; }

        [DataMember]
        public Geo Geo { get; private set; }

        [DataMember]
        public Coordinates Coordinates { get; private set; }

        [DataMember]
        public Place Place { get; private set; }

        [DataMember]
        public string Contributors { get; private set; }

        [DataMember]
        public bool IsQuoteStatus { get; private set; }

        [DataMember]
        public int RetweetCount { get; private set; }

        [DataMember]
        public int FavoriteCount { get; private set; }

        [DataMember]
        public int ReplyCount { get; private set; }

        [DataMember]
        public int QuoteCount { get; private set; }

        [DataMember]
        public bool Favorited { get; private set; }

        [DataMember]
        public bool Retweeted { get; private set; }

        [DataMember]
        public bool PossiblySensitive { get; private set; }

        [DataMember]
        public bool PossiblySensitiveEditable { get; private set; }

        [DataMember]
        public string Lang { get; private set; }

        [DataMember]
        public string SupplementalLanguage { get; private set; }

        [DataMember]
        public string CreatedAt { get; set; }

        public class OrderItemDTO
        {
            public int ProductId { get; set; }

            public string ProductName { get; set; }

            public decimal UnitPrice { get; set; }

            public decimal Discount { get; set; }

            public int Units { get; set; }

            public string PictureUrl { get; set; }
        }
    }
}
