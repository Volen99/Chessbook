 namespace WorldFeed.History.API.Services.Posts
{
    using System.Threading.Tasks;
    using MassTransit;

    using WorldFeed.History.API.Data.Models;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.History.Common.Messages.Posts;

    public class PostService : IPostService
    {
        private readonly IDeletableEntityRepository<Post> postsRepository;
        private readonly IBus publisher;

        public PostService(IDeletableEntityRepository<Post> postsRepository, IBus publisher)
        {
            this.postsRepository = postsRepository;
            this.publisher = publisher;
        }

        public async Task<int> CreatePostAsync(string userId)
        {
            var postNew = new Post
            {
                UserId = userId,
            };

            await this.postsRepository.AddAsync(postNew);
            await this.postsRepository.SaveChangesAsync();

            // TODO: Add Outbox Pattern

            await this.publisher.Publish(new PostCreatedMessage
            {
                Id = postNew.Id,
                UserId = postNew.UserId,
                CreatedOn = postNew.CreatedOn,
                TextId = postNew.TextId,
            });

            return postNew.Id;
        }
    }
}
