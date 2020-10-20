namespace Sharebook.Upload.Application.Commands.Create
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;

    using Microsoft.Extensions.Logging;
    using Sharebook.Common.Public.Models;
    using Sharebook.Upload.Application.Commands.Common;
    using Sharebook.Upload.Application.Commands.IdentifiedCommand;
    using Sharebook.Upload.Application.Common.Interfaces;
    using Sharebook.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using Sharebook.Upload.Domain.AggregatesModel.TweetAggregate.Properties;
    using Sharebook.Upload.Domain.Factories.Tweet;

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
    public class CreateTweetCommand : TweetCommand<CreateTweetCommand>, IRequest<bool> // IRequest<bool> means that the response of request is boolean.
    {
        // When applied to the member of a type, specifies that the member is part of a contract
        // and is serializable by the System.Runtime.Serialization.DataContractSerializer

        // [DataMember]
        // [JsonProperty]
        // private readonly List<OrderItemDTO> orderItems;

        public CreateTweetCommand()
        {
            //this.orderItems = new List<OrderItemDTO>();
        }

        public CreateTweetCommand(string text, string fullText, bool truncated, TweetEntities entities, string source, int inReplyToStatusId,
            string inReplyToStatusIdStr, int inReplyToUserId, string inReplyToUserIdStr, string inReplyToScreenName, string userId, Geo geo,
            Coordinates coordinates, Place place, string contributors, bool isQuoteStatus, int retweetCount, int replyCount, int quoteCount,
            bool favorited, bool retweeted, bool possiblySensitive, bool possiblySensitiveEditable, string lang, string supplementalLanguage)
        {
            this.FullText = fullText;
            this.Truncated = truncated;
            this.Entities = entities;
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
    }

    // Basically, the command class contains all the data you need for performing a business transaction by using the domain model objects.
    public class CreateTweetCommandHandler : IRequestHandler<CreateTweetCommand, bool>
    {
        private readonly ICurrentUser currentUser;
        private readonly ITweetRepository tweetRepository;
        private readonly ITweetFactory tweetFactory;
        private readonly ILogger<CreateTweetCommandHandler> logger;

        public CreateTweetCommandHandler(IMediator mediator, ICurrentUser currentUser, ITweetFactory tweetFactory,
            ITweetRepository tweetRepository, ILogger<CreateTweetCommandHandler> logger)
        {
            this.currentUser = currentUser;
            this.tweetFactory = tweetFactory;
            this.tweetRepository = tweetRepository;

            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<bool> Handle(CreateTweetCommand request, CancellationToken cancellationToken)
        {
            //// DDD patterns comment: Add child entities and value-objects through the Order Aggregate-Root
            //// methods and constructor so validations, invariants and business logic make sure that
            //// consistency is preserved across the whole aggregate
            //var feed = new Post(message.FullText, message.Truncated, message.Entities, message.ExtendedEntities, message.Source,
            //    message.InReplyToStatusId, message.InReplyToStatusIdStr, message.InReplyToUserId, message.InReplyToUserIdStr,
            //    message.InReplyToScreenName, message.UserId, message.Geo, message.Coordinates, message.Place, message.Contributors,
            //    message.IsQuoteStatus, message.RetweetCount, message.FavoriteCount, message.ReplyCount, message.QuoteCount, message.Favorited,
            //    message.Retweeted, message.PossiblySensitive, message.PossiblySensitiveEditable, message.Lang, message.SupplementalLanguage,
            //    message.CreatedAt);

            //this.logger.LogInformation("----- Creating Feed - Feed: {@Feed}", feed);

            //this.feedRepository.Add(feed);

            //return await this.feedRepository.UnitOfWork
            //    .SaveEntitiesAsync(cancellationToken);


            return default;
        }
    }

    //// Use for Idempotency in Command process
    //public class CreateOrderIdentifiedCommandHandler : IdentifiedCommandHandler<CreateTweetCommand, bool>
    //{
    //    public CreateOrderIdentifiedCommandHandler(IMediator mediator, IRequestManager requestManager,
    //        ILogger<IdentifiedCommandHandler<CreateTweetCommand, bool>> logger)
    //        : base(mediator, requestManager, logger)
    //    {
    //    }

    //    protected override bool CreateResultForDuplicateRequest()
    //    {
    //        return true;                // Ignore duplicate requests for creating order.
    //    }
    //}
}
