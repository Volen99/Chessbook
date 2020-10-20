namespace WorldFeed.History.BC.Science.Messages.Posts
{
    using MassTransit;
    using System.Threading.Tasks;
    using WorldFeed.History.BC.Science.Services.Posts;
    using WorldFeed.History.Common.Messages.Posts;

    public class PostCreatedConsumer : IConsumer<PostCreatedMessage>
    {
        private readonly IPostService postService;

        public PostCreatedConsumer(IPostService postService)
        {
            this.postService = postService;
        }

        public async Task Consume(ConsumeContext<PostCreatedMessage> context)
        {
            await this.postService.CreatePostAsync(context.Message.Id, context.Message.CreatedOn, context.Message.UserId, context.Message.TextId);
        }
    }
}
