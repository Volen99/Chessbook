namespace WorldFeed.History.BC.Science.Messages.Posts
{
    using System.Threading.Tasks;
    using MassTransit;
    using Microsoft.AspNetCore.SignalR;

    using WorldFeed.History.BC.Science.Hubs;
    using WorldFeed.History.BC.Science.Services.Posts;
    using WorldFeed.History.Common.Messages.Posts;

    using static WorldFeed.History.BC.Science.Common.Constants;

    public class PostUploadedConsumer : IConsumer<PostUploadedMessage>
    {
        private readonly IHubContext<PostsHub> hub;

        private readonly IPostService postService;

        public PostUploadedConsumer(IHubContext<PostsHub> hub, IPostService postService)
        {
            this.hub = hub;
            this.postService = postService;
        }

        public async Task Consume(ConsumeContext<PostUploadedMessage> context)
        {
             var post = this.postService.GetLastPost(); // TODO: Should be async!!!

            await this.hub.Clients.Groups(AuthenticatedUsersGroup).SendAsync(ReceiveNewlyPostEndpoint, post);
        }
    }
}
