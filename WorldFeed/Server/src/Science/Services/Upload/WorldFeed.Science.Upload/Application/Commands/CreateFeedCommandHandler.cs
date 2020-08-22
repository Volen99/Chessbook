namespace WorldFeed.Science.Upload.Application.Commands
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.Extensions.Logging;
    using WorldFeed.Science.Upload.Application.Commands.IdentifiedCommand;
    using WorldFeed.Science.Upload.Domain.FeedAggregate;
    using WorldFeed.Science.Upload.Domain.Models;
    using WorldFeed.Science.Upload.Infrastructure.Idempotency;
    using WorldFeed.Science.Upload.Services;

    // Basically, the command class contains all the data you need for performing a 
    // business transaction by using the domain model objects.
    public class CreateFeedCommandHandler : IRequestHandler<CreateFeedCommand, bool>
    {
        private readonly IMediator mediator;
        private readonly IFeedRepository feedRepository;
        private readonly IIdentityService identityService;
        private readonly ILogger<CreateFeedCommandHandler> logger;

        public CreateFeedCommandHandler(IMediator mediator, IFeedRepository feedRepository, IIdentityService identityService,
            ILogger<CreateFeedCommandHandler> logger)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this.feedRepository = feedRepository ?? throw new ArgumentNullException(nameof(mediator));
            this.identityService = identityService ?? throw new ArgumentNullException(nameof(identityService));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<bool> Handle(CreateFeedCommand message, CancellationToken cancellationToken)
        {
            // DDD patterns comment: Add child entities and value-objects through the Order Aggregate-Root
            // methods and constructor so validations, invariants and business logic 
            // make sure that consistency is preserved across the whole aggregate
            var feed = new Feed(message.FullText, message.Truncated, message.Entities, message.ExtendedEntities, message.Source,
                message.InReplyToStatusId, message.InReplyToStatusIdStr, message.InReplyToUserId, message.InReplyToUserIdStr,
                message.InReplyToScreenName, message.UserId, message.Geo, message.Coordinates, message.Place, message.Contributors,
                message.IsQuoteStatus, message.RetweetCount, message.FavoriteCount, message.ReplyCount, message.QuoteCount, message.Favorited,
                message.Retweeted, message.PossiblySensitive, message.PossiblySensitiveEditable, message.Lang, message.SupplementalLanguage,
                message.CreatedAt);

            this.logger.LogInformation("----- Creating Feed - Feed: {@Feed}", feed);

            this.feedRepository.Add(feed);

            return await this.feedRepository.UnitOfWork
                .SaveEntitiesAsync(cancellationToken);
        }
    }

    // Use for Idempotency in Command process
    public class CreateOrderIdentifiedCommandHandler : IdentifiedCommandHandler<CreateFeedCommand, bool>
    {
        public CreateOrderIdentifiedCommandHandler(IMediator mediator, IRequestManager requestManager,
            ILogger<IdentifiedCommandHandler<CreateFeedCommand, bool>> logger)
            : base(mediator, requestManager, logger)
        {
        }

        protected override bool CreateResultForDuplicateRequest()
        {
            return true;                // Ignore duplicate requests for creating order.
        }
    }
}
