namespace Sharebook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Sharebook.Data.Common.Repositories;
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.Post;
    using Sharebook.Data.Models.Post.Entities;
    using Sharebook.Services.Mapping;
    using Sharebook.Web.Models.Outputs.Posts;

    public class PostsService : IPostsService
    {
        private readonly IDeletableEntityRepository<Post> postsRepository;
        private readonly IRepository<PostVote> postVoteRepository;

        private readonly IMediaService mediaService;

        public PostsService(IDeletableEntityRepository<Post> postsRepository, IMediaService mediaService, IRepository<PostVote> postVoteRepository)
        {
            this.postsRepository = postsRepository;
            this.mediaService = mediaService;
            this.postVoteRepository = postVoteRepository;
        }

        public async Task<Post> CreateAsync(string text, string mediaIds, int userId)
        {
            var postNew = new Post
            {
                Text = text,
                MediasIds = mediaIds,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
            };

            await this.postsRepository.AddAsync(postNew);
            await this.postsRepository.SaveChangesAsync();

            return postNew;
        }

        public IEnumerable<T> GetByCategoryId<T>(int categoryId, int? take = null, int skip = 0)
        {
            throw new System.NotImplementedException();
        }

        public T GetById<T>(long id)
        {
            return this.postsRepository.All().Where(p => p.Id == id)
                .To<T>().FirstOrDefault();

        }

        public int GetCountByCategoryId(int categoryId)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<T> GetHomeTimeline<T>(int userId, int? count = null, int skip = 0)
        {
            var query = this.postsRepository.All()
                .Where(p => p.UserId == userId)
                .OrderBy(p => p.CreatedAt)
                .Skip(skip);

            if (count.HasValue)
            {
                query = query.Take(count.Value);
            }

            foreach (var post in query)
            {
                var ids = post.MediasIds?.Split(", ").Select(x => int.Parse(x)).ToArray();
                post.Medias = this.GetMedias(ids);
            }

            return query.To<T>().ToList();
        }

     
        public async Task<PostDTO> InsertPostVoteAsync(long postId, int userId, bool isUp)
        {
            var postVoteNew = new PostVote
            {
                PostId = postId,
                UserId = userId,
                IsUp = isUp,
                CreatedOnUtc = DateTime.UtcNow
            };
                

            await this.postVoteRepository.AddAsync(postVoteNew);
            await this.postVoteRepository.SaveChangesAsync();

            var post = this.postsRepository.All().Where(p => p.Id == postVoteNew.PostId).FirstOrDefault();
            if (postVoteNew.IsUp)
            {
                ++post.FavoriteCount;
            } else
            {
                ++post.DislikeCount;
            }

            await this.postVoteRepository.SaveChangesAsync();

            return this.GetById<PostDTO>(post.Id);
        }

        public async Task<PostVote> GetPostVoteAsync(int postId, int userId)
        {
            //if (userId == null)
            //{
            //    return null;

            //}

            return await postVoteRepository.All()
                .FirstOrDefaultAsync(pv => pv.PostId == postId && pv.UserId == userId);
        }

        public async Task<PostDTO> ChangeVote(PostVote postVote)
        {
            if (postVote == null)
            {
                throw new ArgumentNullException(nameof(postVote));
            }

            postVote.IsUp = !postVote.IsUp;

            var post = this.postsRepository.All().Where(p => p.Id == postVote.PostId).FirstOrDefault();
            if (postVote.IsUp)
            {
                ++post.FavoriteCount;
                --post.DislikeCount;
            }
            else
            {
                --post.FavoriteCount;
                ++post.DislikeCount;
            }

            postVote.ModifiedOn = DateTime.Now;
            await this.postsRepository.SaveChangesAsync();

            return this.GetById<PostDTO>(post.Id);
        }

        public async Task<int> GetNumberOfPostVotesAsync(int userId, DateTime сreatedFromUtc)
        {
            //if (userId == null)
            //{
            //    return 0;

            //}

            return await this.postVoteRepository.All()
                .CountAsync(pv => pv.UserId == userId && pv.CreatedOnUtc > сreatedFromUtc);
        }

        public async Task<PostDTO> RemoveVote(PostVote postVote)
        {
            var post = this.postsRepository.All().Where(p => p.Id == postVote.PostId).FirstOrDefault();

            postVote.IsDeleted = true;
            if (postVote.IsUp)
            {
                post.FavoriteCount--;
            }
            else
            {
                post.DislikeCount--;
            }

            await this.postsRepository.SaveChangesAsync();
            await this.postVoteRepository.SaveChangesAsync();

            return this.GetById<PostDTO>(post.Id);
        }


        private List<MediaEntity> GetMedias(int[] mediasIds)
        {
            var mediaEntities = new List<MediaEntity>();
            for (int i = 0; i < mediasIds.Length; i++)
            {
                mediaEntities.Add(this.mediaService.GetMediaById(mediasIds[i]));
            }

            return mediaEntities;
        }

       
    }
}
