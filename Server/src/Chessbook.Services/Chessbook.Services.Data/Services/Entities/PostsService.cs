namespace Chessbook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Chessbook.Data.Common.Repositories;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Post;
    using Chessbook.Data.Models.Post.Entities;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Outputs.Posts;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Data.Models.Polls;

    public class PostsService : IPostsService
    {
        private readonly IDeletableEntityRepository<Post> postsRepository;
        private readonly IRepository<PostPicture> postPictureRepository;
        private readonly IRepository<PostVote> postVoteRepository;
        private readonly IDeletableEntityRepository<PostReshare> postReshareRepository;
        private readonly IUserService userService;
        private readonly IPollService pollService;

        private readonly IMediaService mediaService;

        public PostsService(IDeletableEntityRepository<Post> postsRepository, IRepository<PostPicture> postPictureRepository,
            IMediaService mediaService, IRepository<PostVote> postVoteRepository, IDeletableEntityRepository<PostReshare> postReshareRepository,
            IUserService userService, IPollService pollService)
        {
            this.postsRepository = postsRepository;
            this.postPictureRepository = postPictureRepository;
            this.mediaService = mediaService;
            this.postVoteRepository = postVoteRepository;
            this.postReshareRepository = postReshareRepository;
            this.userService = userService;
            this.pollService = pollService;
        }

        public async Task<Post> CreateAsync(QueryPostParams query, int userId, int[] mediaIds = null, int pollId = 0)
        {
            var postNew = new Post
            {
                Text = query.Status,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
            };

            if (query.InReplyToStatusId.HasValue)
            {
                postNew.InReplyToStatusId = query.InReplyToStatusId.Value;
                postNew.InReplyToScreenName = query.InReplyToScreenName;
            }

            await this.postsRepository.AddAsync(postNew);
            await this.postsRepository.SaveChangesAsync();

            if (mediaIds != null)
            {
                for (int i = 0; i < mediaIds.Length; i++)
                {
                    var postPicture = new PostPicture
                    {
                        ProductId = postNew.Id,
                        PictureId = mediaIds[i],
                    };

                    await this.postPictureRepository.AddAsync(postPicture);
                }

                await this.postPictureRepository.SaveChangesAsync();
            }
            else if (pollId != 0)
            {
                postNew.PollId = pollId;
            }

            return postNew;
        }

        public async Task<Post> CreateRetweet(int originalPostId, int userId, bool trimUser)
        {
            var postNew = new Post
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                Reshared = true,
            };


            await this.postsRepository.AddAsync(postNew);
            await this.postsRepository.SaveChangesAsync();

            var resharedNew = new PostReshare
            {
                PostId = originalPostId,
                ResharedPostId = postNew.Id,
                UserId = userId,
            };

            await this.postReshareRepository.AddAsync(resharedNew);
            await this.postReshareRepository.SaveChangesAsync();

            return postNew;

        }

        public IEnumerable<T> GetByCategoryId<T>(int categoryId, int? take = null, int skip = 0)
        {
            throw new System.NotImplementedException();
        }

        public T GetById<T>(int id)
        {
            return this.postsRepository.All().Where(p => p.Id == id)
                .To<T>().FirstOrDefault();

        }

        public async Task<Post> GetByIdClean(int id)
        {
            return await this.postsRepository.All().Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }

        public int GetCountByCategoryId(int categoryId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<T>> GetHomeTimeline<T>(int userId, int? count = null, int skip = 0)
        {
            var query = this.postsRepository.All()
                .Where(p => p.IsDeleted == false)
                .Include(p => p.User)
                .Include(p => p.Medias)
                .Include(p => p.Poll)
                .ThenInclude(poll => poll.Options)
                .OrderBy(p => p.CreatedAt)
                .Skip(skip);

            var reshareQuery = this.postReshareRepository.All();
            if (count.HasValue)
            {
                query = query.Take(count.Value);
                reshareQuery = reshareQuery.Take(count.Value);
            }


            foreach (var post in query)
            {
                var resharesCount = reshareQuery.Where(re => re.PostId == post.Id).Count();
                post.RetweetCount = resharesCount;
            }




            return query.To<T>().ToList();
        }

        public async Task<IEnumerable<T>> GetUserProfileTimeline<T>(int userId, int? count = null, int skip = 0)
        {
            var query = this.postsRepository.All()
              .Where(p => p.IsDeleted == false)
              .Where(p => p.UserId == userId)
              .Include(p => p.User)
              .Include(p => p.Medias)
              .Include(p => p.Poll)
              .ThenInclude(poll => poll.Options)
              .OrderBy(p => p.CreatedAt)
              .Skip(skip);

            if (count.HasValue)
            {
                query = query.Take(count.Value);
            }

            return query.To<T>().ToList();
        }


        public async Task<PostDTO> InsertPostVoteAsync(int postId, int userId, PostRateType postRateType)
        {
            var postVoteNew = new PostVote
            {
                PostId = postId,
                UserId = userId,
                Type = postRateType,
            };


            await this.postVoteRepository.AddAsync(postVoteNew);
            await this.postVoteRepository.SaveChangesAsync();

            var post = this.postsRepository.All().Where(p => p.Id == postVoteNew.PostId).FirstOrDefault();
            if (postVoteNew.Type == PostRateType.Like)
            {
                ++post.FavoriteCount;
            }
            else
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

        public async Task<PostDTO> ChangeVote(PostRateType queryRateType, PostVote currentPostVote)
        {
            if (currentPostVote == null)
            {
                throw new ArgumentNullException(nameof(currentPostVote));
            }

            var post = this.postsRepository.All().Where(p => p.Id == currentPostVote.PostId).FirstOrDefault();
            if (queryRateType == PostRateType.Like)
            {
                if (currentPostVote.Type == PostRateType.Dislike)
                {
                    ++post.FavoriteCount;
                    --post.DislikeCount;
                }
                else if (currentPostVote.Type == PostRateType.None)
                {
                    ++post.FavoriteCount;
                }

            }
            else
            {
                if (currentPostVote.Type == PostRateType.Like)
                {
                    --post.FavoriteCount;
                    ++post.DislikeCount;
                }
                else if (currentPostVote.Type == PostRateType.None)
                {
                    ++post.DislikeCount;
                }
            }

            currentPostVote.Type = queryRateType;
            currentPostVote.ModifiedOn = DateTime.Now;
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
                .CountAsync(pv => pv.UserId == userId && pv.CreatedOn > сreatedFromUtc);
        }

        public async Task<PostDTO> RemoveVote(PostVote postVote)
        {
            var post = this.postsRepository.All().Where(p => p.Id == postVote.PostId).FirstOrDefault();
            if (postVote.Type == PostRateType.Like)
            {
                post.FavoriteCount--;
            }
            else
            {
                post.DislikeCount--;
            }

            postVote.Type = PostRateType.None;

            await this.postsRepository.SaveChangesAsync();
            await this.postVoteRepository.SaveChangesAsync();

            return this.GetById<PostDTO>(post.Id);
        }

        public async Task<PostRateDTO> LoadUserPostRate(int userId, int postId)
        {
            var ratingObject = this.postVoteRepository.All()
                .Where(pv => pv.UserId == userId && pv.PostId == postId)
                .To<PostRateDTO>()
                .FirstOrDefault();

            return ratingObject;
        }

        private async Task<List<MediaEntityDTO>> GetMedias(int[] mediasIds)
        {
            var mediaEntities = new List<MediaEntityDTO>();
            for (int i = 0; i < mediasIds.Length; i++)
            {
                var mediaCurrent = await this.mediaService.GetMediaById<MediaEntityDTO>(mediasIds[i]);
                mediaEntities.Add(mediaCurrent);
            }

            return mediaEntities;
        }

        public async Task<IList<T>> GetLikers<T>(int postId)
        {
            var likers = this.postVoteRepository.All()
                .Where(pv => pv.PostId == postId)
                .Include(u => u.User)
                .Select(pv => pv.User)
                .MapTo<IList<T>>();

            return likers;
        }

        public async Task<int> GetPostsCountByUserId(int userId)
        {
            var count = await this.postsRepository.All()
                .Where(p => p.UserId == userId)
                .CountAsync();

            return count;
        }

        public async Task<T> GetResharedOriginal<T>(int resharedPostId)
        {
            var current = await this.postReshareRepository.All().Where(rs => rs.ResharedPostId == resharedPostId)
                .FirstOrDefaultAsync();

            if (current == null)
            {

            }

            var post = this.postsRepository.All().Where(p => p.Id == current.PostId)
                .Include(p => p.Medias)
                .Include(p => p.Poll)
                .ThenInclude(poll => poll.Options)
                .To<T>()
                .FirstOrDefault();

            return post;
        }

        public async Task<bool> GetReshareStatus(int postId, int userId)    
        {
            var res = await this.postReshareRepository.All()
                .Where(rs => rs.PostId == postId && userId == rs.UserId)
                .FirstOrDefaultAsync();

            return res != null;
        }

        public async Task<int> GetReshareCount(int postId)
        {
            var count = await this.postReshareRepository.All()
                .Where(rs => rs.PostId == postId)
                .CountAsync();

            return count;
        }


        /// <summary>
        /// Check whether customer is allowed to delete post
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="post">Topic</param>
        /// <returns>True if allowed, otherwise false</returns>
        public async Task<bool> IsCustomerAllowedToDeletePostAsync(User customer, Post post)
        {
            if (post == null)
            {
                return false;
            }

            if (customer == null)
            {
                return false;
            }

            if (await userService.IsGuestAsync(customer))
            {
                return false;
            }

            if (await userService.IsForumModeratorAsync(customer))
            {
                return true;
            }

            var ownPost = customer.Id == post.UserId;

            return ownPost;
        }

        /// <summary>
        /// Gets a forum topic
        /// </summary>
        /// <param name="forumTopicId">The forum topic identifier</param>
        /// <param name="increaseViews">The value indicating whether to increase forum topic views</param>
        /// <returns>Forum Topic</returns>
        protected async Task<Poll> GetTopicByIdAsync(int forumTopicId, bool increaseViews)
        {
            var poll = await this.pollService.GetPollByIdClean(forumTopicId);

            if (poll == null)
            {
                return null;
            }

            return poll;
        }

        public async Task DeleteProductAsync(Post product)
        {
            var sharedPostsFromThisPost = this.postReshareRepository.All()
                .Where(rs => rs.PostId == product.Id && !rs.IsDeleted);

            if (sharedPostsFromThisPost != null)
            {
                foreach (var item in sharedPostsFromThisPost)
                {
                   var current = this.postsRepository.All().Where(p => p.Id == item.ResharedPostId)
                        .FirstOrDefault();

                    if (current == null)
                    {
                        continue;
                    }

                    this.postReshareRepository.Delete(item);
                    this.postsRepository.Delete(current);
                }

            }

            if (product.Reshared)
            {
                var curr = await this.postReshareRepository.All()
                    .Where(x => x.ResharedPostId == product.Id)
                    .FirstOrDefaultAsync();

                this.postReshareRepository.Delete(curr);
            }

            await this.postReshareRepository.SaveChangesAsync();



            this.postsRepository.Delete(product);
            await this.postsRepository.SaveChangesAsync();
        }

        public async Task Unshare(Post product)
        {
            var curr = await this.postReshareRepository.All()
                   .Where(x => x.ResharedPostId == product.Id)
                   .FirstOrDefaultAsync();

            if (curr == null)
            {
                // parent post
                var res = await this.postReshareRepository.All()
                   .Where(x => x.PostId == product.Id)
                   .FirstOrDefaultAsync();

                var theActualSharedPost = await this.postsRepository.All().Where(p => p.Id == res.ResharedPostId).FirstOrDefaultAsync();

                this.postsRepository.Delete(theActualSharedPost);
                this.postReshareRepository.Delete(res);
            }
            else
            {
                var theActualSharedPost = await this.postsRepository.All().Where(p => p.Id == curr.ResharedPostId).FirstOrDefaultAsync();

                this.postReshareRepository.Delete(curr);
                this.postsRepository.Delete(theActualSharedPost);
            }

            await this.postsRepository.SaveChangesAsync();
        }
    }
}
