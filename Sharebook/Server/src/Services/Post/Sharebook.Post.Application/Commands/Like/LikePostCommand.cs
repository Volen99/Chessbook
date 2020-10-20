namespace Sharebook.Post.Application.Commands.Like
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.Extensions.Logging;

    using Sharebook.Common.Public.Models;
    using Sharebook.Post.Application.Commands.Common;
    using Sharebook.Post.Application.Common.Interfaces;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using Sharebook.Post.Domain.AggregatesModel.TweetAggregate.Properties;

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
    public class LikePostCommand : TweetCommand<LikePostCommand>, IRequest<bool> // IRequest<bool> means that the response of request is boolean.
    {
        public long Id { get; set; }
    }

    // Basically, the command class contains all the data you need for performing a business transaction by using the domain model objects.
    public class LikePostCommandHandler : IRequestHandler<LikePostCommand, bool>
    {
        private readonly ICurrentUser currentUser;
        private readonly IPostRepository tweetRepository;
        // private readonly ITweetFactory tweetFactory;
        private readonly ILogger<LikePostCommandHandler> logger;

        public LikePostCommandHandler(IMediator mediator, ICurrentUser currentUser, IPostRepository tweetRepository, ILogger<LikePostCommandHandler> logger)
        {
            this.currentUser = currentUser;
            this.tweetRepository = tweetRepository;

            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<bool> Handle(LikePostCommand request, CancellationToken cancellationToken)
        {
            var postCurrent = await this.tweetRepository.GetPost(request.Id);

            // DB operations...

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
