namespace WorldFeed.Science.API.Services.Posts
{
    using System.Threading.Tasks;
    using MassTransit;

    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Science.API.Data.Models;

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

            return postNew.Id;
        }
    }
}
