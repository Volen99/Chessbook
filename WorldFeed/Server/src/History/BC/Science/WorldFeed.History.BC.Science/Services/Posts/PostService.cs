namespace WorldFeed.History.BC.Science.Services.Posts
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Models.Repositories;
    using System.Collections.Generic;
    using WorldFeed.History.BC.Science.Models.Posts;
    using WorldFeed.Common.Services.Mapping;
    using Microsoft.EntityFrameworkCore;
    using WorldFeed.History.BC.Science.Data.Models;
    using System;
    using System.Net.WebSockets;
    using System.Linq;

    public class PostService : IPostService
    {
        private readonly IDeletableEntityRepository<Post> postsRepository;

        public PostService(IDeletableEntityRepository<Post> postsRepository)
        {
            this.postsRepository = postsRepository;
        }

        public async Task<int> CreatePostAsync(int postId, DateTime createdOn, string userId, int textId)
        {
            var postNew = new Post
            {
                //Id = postId, 
                UserId = userId,
                TextId = textId,
                CreatedOn = createdOn,
            };

            await this.postsRepository.AddAsync(postNew);
            await this.postsRepository.SaveChangesAsync();

            return postNew.Id;
        }

        public async Task<IEnumerable<PostOutputModel>> GetAll()
        {
            var posts = await this.postsRepository.All()
                .To<PostOutputModel>()
                .ToListAsync();

            return posts;
        }

        public async Task<PostOutputModel> GetLastPost()
        {
            var post = this.postsRepository.All()
                .To<PostOutputModel>().ToList().Last();

            return post;
        }
    }
}
