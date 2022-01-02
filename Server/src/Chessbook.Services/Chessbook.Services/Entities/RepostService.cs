using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Posts;
using Chessbook.Data;

namespace Chessbook.Services.Entities
{
    public class RepostService : IRepostService
    {
        private readonly IRepository<Post> postsRepository;

        public RepostService(IRepository<Post> postsRepository)
        {
            this.postsRepository = postsRepository;
        }

        public async Task<Post> Create(int userId, Post originalPost)
        {
            var repostNew = new Post
            {
                UserId = userId,
                RepostId = originalPost.Id,
                Repost = originalPost,
                CreatedAt = DateTime.UtcNow,
            };

            await this.postsRepository.InsertAsync(repostNew);

            originalPost.RepostCount += 1;
            await this.postsRepository.UpdateAsync(originalPost);

            return repostNew;
        }

        public async Task Destroy(Post post, Post originalPost)
        {
            if (post == null)
            {
                return;
            }

            await this.postsRepository.DeleteAsync(post);

            originalPost.RepostCount -= 1;
            await this.postsRepository.UpdateAsync(originalPost);
        }

        public async Task<List<Post>> GetRepostsByPostId(int postId)
        {
            var reposts = await this.postsRepository.GetAllAsync(query =>
            {
                query = query.Where(pv => pv.RepostId == postId);

                return query;
            });

            return reposts.ToList();
        }
    }
}
