namespace Chessbook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Chessbook.Data.Common.Repositories;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Post;
    using Chessbook.Data.Models.Post.Entities;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Data.Models.Polls;
    using Chessbook.Data;
    using Microsoft.EntityFrameworkCore;
    using Nop.Core.Domain.Catalog;
    using Nop.Services.Catalog;
    using Nop.Core;

    public class PostsService : IPostsService
    {
        private readonly IRepository<Post> postsRepository;
        private readonly IRepository<PostPicture> postPictureRepository;
        private readonly IRepository<PostVote> postVoteRepository;
        private readonly IRepository<PostReshare> postReshareRepository;
        private readonly IUserService userService;
        private readonly IPollService pollService;
        private readonly IRepository<Relationship> relationshipRepository;
        private readonly IWorkContext _workContext;

        private readonly IMediaService mediaService;

        public PostsService(IRepository<Post> postsRepository, IRepository<PostPicture> postPictureRepository,
            IMediaService mediaService, IRepository<PostVote> postVoteRepository, IRepository<PostReshare> postReshareRepository,
            IUserService userService, IPollService pollService, IRepository<Relationship> relationshipRepository,
             IWorkContext _workContext)
        {
            this.postsRepository = postsRepository;
            this.postPictureRepository = postPictureRepository;
            this.mediaService = mediaService;
            this.postVoteRepository = postVoteRepository;
            this.postReshareRepository = postReshareRepository;
            this.userService = userService;
            this.pollService = pollService;
            this.relationshipRepository = relationshipRepository;
            this._workContext = _workContext;
        }

        public async Task<Post> CreateAsync(QueryPostParams query, int userId, int[] mediaIds = null, int pollId = 0)
        {
            var postNew = new Post
            {
                Status = query.Status,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                HasMedia = mediaIds == null ? false : true,
            };

            if (query.InReplyToStatusId.HasValue)
            {
                postNew.InReplyToStatusId = query.InReplyToStatusId.Value;
                postNew.InReplyToScreenName = query.InReplyToScreenName;
            }

            await this.postsRepository.InsertAsync(postNew);

            if (mediaIds != null)
            {
                var pictures = new List<PostPicture>();
                for (int i = 0; i < mediaIds.Length; i++)
                {
                    pictures.Add(new PostPicture
                    {
                        PostId = postNew.Id,
                        PictureId = mediaIds[i],
                    });
                }

                await this.postPictureRepository.InsertAsync(pictures);
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


            await this.postsRepository.InsertAsync(postNew);

            var resharedNew = new PostReshare
            {
                PostId = originalPostId,
                ResharedPostId = postNew.Id,
                UserId = userId,
            };

            await this.postReshareRepository.InsertAsync(resharedNew);

            return postNew;

        }


        /// <summary>
        /// Gets product
        /// </summary>
        /// <param name="productId">Product identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product
        /// </returns>
        public virtual async Task<Post> GetPostByIdAsync(int productId)
        {
            return await this.postsRepository.GetByIdAsync(productId, cache => default);
        }

        public virtual async Task<IList<Post>> GetHomeTimeline(bool ascSort = false,
            int pageIndex = 0, int pageSize = int.MaxValue)
        {

            var posts = await this.postsRepository.GetAllPagedAsync(query =>
            {
                query = ascSort
                    ? query.OrderBy(fp => fp.CreatedAt).ThenBy(fp => fp.Id)
                    : query.OrderByDescending(fp => fp.CreatedAt).ThenBy(fp => fp.Id);

                return query;

            }, pageIndex, pageSize);




            //var posts = await this.postsRepository.GetAllAsync(query =>
            //{
            //    return from p in query
            //           where !p.Deleted
            //           select p;
            //}, cache => cache.PrepareKeyForDefaultCache(NopCatalogDefaults.ProductsHomepageCacheKey));

            //posts = posts.Skip(skip).ToList();
            //if (count.HasValue)
            //{
            //    posts = posts.Take(count.Value).ToList();
            //}

            //var notDeletedUsers = await this.userService.GetCustomersByIdsAsync(posts.Select(v => v.UserId).ToArray());

            //foreach (var notDeletedUser in notDeletedUsers)
            //{
            //    var currentPost = posts.FirstOrDefault(p => p.UserId != notDeletedUser.Id);
            //    if (currentPost != null)
            //    {
            //        posts.Remove(currentPost);
            //    }
            //}

            return posts;

            //var posts = await this.postsRepository.Table
            //    .Where(p => !p.Deleted)
            //    .ToListAsync();

            //return posts;


            //var query = this.postsRepository.Table
            //    .Include(p => p.User)
            //    .Include(p => p.Medias)
            //    .Include(p => p.Poll)
            //    .ThenInclude(poll => poll.Options)
            //    .OrderBy(p => p.CreatedAt)
            //    .Skip(skip);

            //var reshareQuery = this.postReshareRepository.Table;
            //if (count.HasValue)
            //{
            //    query = query.Take(count.Value);
            //    reshareQuery = reshareQuery.Take(count.Value);
            //}


            //foreach (var post in query)
            //{
            //    var resharesCount = reshareQuery.Where(re => re.PostId == post.Id).Count();
            //    post.RetweetCount = resharesCount;
            //}




            // return query.To<T>().ToList();
        }

        public async Task<IPagedList<Post>> GetUserProfileTimeline(int userId, bool ascSort = false,
            int pageIndex = 0, int pageSize = int.MaxValue)
        {

            var profilePosts = await this.postsRepository.GetAllPagedAsync(query =>
            {
                query = query.Where(p => p.UserId == userId);

                query = ascSort
                    ? query.OrderBy(fp => fp.CreatedAt).ThenBy(fp => fp.Id)
                    : query.OrderByDescending(fp => fp.CreatedAt).ThenBy(fp => fp.Id);

                return query;

            }, pageIndex, pageSize);

            //     profilePosts = profilePosts.Skip(skip).ToList();
            //if (count.HasValue)
            //{
            //    profilePosts = profilePosts.Take(count.Value).ToList();
            //}

            //var query = this.postsRepository.Table
            //  .Where(p => p.UserId == userId)
            //  .Include(p => p.User)
            //  .Include(p => p.Medias)
            //  .Include(p => p.Poll)
            //  .ThenInclude(poll => poll.Options)
            //  .OrderBy(p => p.CreatedAt)
            //  .Skip(skip);

            //if (count.HasValue)
            //{
            //    query = query.Take(count.Value);
            //}

            //return query.ToList();

            return profilePosts;
        }


        public async Task InsertPostVoteAsync(PostVote postVote)
        {
            await this.postVoteRepository.InsertAsync(postVote);

            // update post
            var post = await GetPostByIdAsync(postVote.PostId);
            post.FavoriteCount = postVote.IsUp ? ++post.FavoriteCount : --post.FavoriteCount;

            await UpdatePostAsync(post);
        }

        /// <summary>
        /// Get a post vote 
        /// </summary>
        /// <param name="postId">Post identifier</param>
        /// <param name="customer">Customer</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the post vote
        /// </returns>
        public virtual async Task<PostVote> GetPostVoteAsync(int postId, Customer customer)
        {
            if (customer == null)
            {
                return null;
            }

            return await this.postVoteRepository.Table
                .FirstOrDefaultAsyncExt(pv => pv.PostId == postId && pv.UserId == customer.Id);
        }

        /// <summary>
        /// Get post vote made since the parameter date
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="сreatedFromUtc">Date</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the post votes count
        /// </returns>
        public virtual async Task<int> GetNumberOfPostVotesAsync(Customer customer)
        {
            if (customer == null)
            {
                return 0;
            }

            return await this.postVoteRepository.Table
                .CountAsyncExt(p => p.UserId == customer.Id);
        }

        /// <summary>
        /// Delete a post vote
        /// </summary>
        /// <param name="postVote">Post vote</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task DeletePostVoteAsync(PostVote postVote)
        {
            if (postVote == null)
            {
                throw new ArgumentNullException(nameof(postVote));
            }

            await postVoteRepository.DeleteAsync(postVote);

            // update post
            var post = await GetPostByIdAsync(postVote.PostId);
            post.FavoriteCount = postVote.IsUp ? --post.FavoriteCount : ++post.FavoriteCount;

            await UpdatePostAsync(post);
        }

        //public async Task<PostRateType> LoadUserPostRate(int userId, int postId)
        //{
        //    var ratingObject = await this.postVoteRepository.Table
        //        .Where(pv => pv.UserId == userId && pv.PostId == postId)
        //        .FirstOrDefaultAsyncExt();

        //    if (ratingObject == null)
        //    {
        //        return default(PostRateType);
        //    }

        //    return ratingObject.Type;
        //}

        public async Task<IList<Customer>> GetLikers(int postId)
        {
            var votes = this.postVoteRepository.Table
                .Where(pv => pv.PostId == postId)
                .ToList();

            var users = await this.userService.GetCustomersByIdsAsync(votes.Select(v => v.UserId).ToArray());

            var userId = (await _workContext.GetCurrentCustomerAsync()).Id;

            var loggedinUserRelationships = await this.relationshipRepository.Table.Where(r => r.SourceId == userId).ToListAsync();

            for (int i = 0; i < users.Count; i++)
            {
                var user = users[i];

                var currentRelationship = loggedinUserRelationships.Where(r => r.TargetId == user.Id).FirstOrDefault();

                if (currentRelationship == null)
                {
                    continue;
                }

                if (currentRelationship.Following)
                {
                    user.Following = true;
                }

                user.Following = currentRelationship.Following;
                user.FollowedBy = currentRelationship.FollowedBy;
                user.FollowRequestSent = currentRelationship.Requested;
            }

            return users;
        }

        public async Task<int> GetPostsCountByUserId(int userId)
        {
            var count = await this.postsRepository.Table
                .Where(p => p.UserId == userId)
                .CountAsyncExt();

            return count;
        }

        public async Task<T> GetResharedOriginal<T>(int resharedPostId)
        {
            var current = await this.postReshareRepository.Table.Where(rs => rs.ResharedPostId == resharedPostId)
                .FirstOrDefaultAsyncExt();

            if (current == null)
            {

            }

            var post = this.postsRepository.Table.Where(p => p.Id == current.PostId)
                .Include(p => p.Medias)
                .Include(p => p.Poll)
                .ThenInclude(poll => poll.Options)
                .To<T>()
                .FirstOrDefault();

            return post;
        }

        public async Task<bool> GetReshareStatus(int postId, int userId)    
        {
            var res = await this.postReshareRepository.Table
                .Where(rs => rs.PostId == postId && userId == rs.UserId)
                .FirstOrDefaultAsync();

            return res != null;
        }

        public async Task<int> GetReshareCount(int postId)
        {
            var count = await this.postReshareRepository.Table
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
        public async Task<bool> IsCustomerAllowedToDeletePostAsync(Customer customer, Post post)
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
            var poll = await this.pollService.GetPollByIdAsync(forumTopicId);

            if (poll == null)
            {
                return null;
            }

            return poll;
        }

        /// <summary>
        /// Gets a product pictures by product identifier
        /// </summary>
        /// <param name="productId">The product identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product pictures
        /// </returns>
        public virtual async Task<IList<PostPicture>> GetProductPicturesByProductIdAsync(int productId)
        {
            var query = from pp in this.postPictureRepository.Table
                        where pp.PostId == productId
                        orderby pp.DisplayOrder, pp.Id
                        select pp;

            var productPictures = await query.ToListAsync();

            return productPictures;
        }

        /// <summary>
        /// Gets a product picture
        /// </summary>
        /// <param name="productPictureId">Product picture identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product picture
        /// </returns>
        public virtual async Task<PostPicture> GetProductPictureByIdAsync(int productPictureId)
        {
            return await this.postPictureRepository.GetByIdAsync(productPictureId, cache => default);
        }

        public async Task DeleteProductAsync(Post product)
        {
            var sharedPostsFromThisPost = this.postReshareRepository.Table
                .Where(rs => rs.PostId == product.Id); // && !rs.IsDeleted

            if (sharedPostsFromThisPost != null)
            {
                foreach (var item in sharedPostsFromThisPost)
                {
                   var current = this.postsRepository.Table.Where(p => p.Id == item.ResharedPostId)
                        .FirstOrDefault();

                    if (current == null)
                    {
                        continue;
                    }

                    await this.postReshareRepository.DeleteAsync(item);
                    await this.postsRepository.DeleteAsync(current);
                }

            }

            if (product.Reshared)
            {
                var curr = await this.postReshareRepository.Table
                    .Where(x => x.ResharedPostId == product.Id)
                    .FirstOrDefaultAsync();

                await this.postReshareRepository.DeleteAsync(curr);
            }

            await this.postsRepository.DeleteAsync(product);
        }

        public async Task Unshare(Post product)
        {
            var curr = await this.postReshareRepository.Table
                   .Where(x => x.ResharedPostId == product.Id)
                   .FirstOrDefaultAsync();

            if (curr == null)
            {
                // parent post
                var res = await this.postReshareRepository.Table
                   .Where(x => x.PostId == product.Id)
                   .FirstOrDefaultAsync();

                var theActualSharedPost = await this.postsRepository.Table.Where(p => p.Id == res.ResharedPostId).FirstOrDefaultAsync();

                await this.postsRepository.DeleteAsync(theActualSharedPost);
                await this.postReshareRepository.DeleteAsync(res);
            }
            else
            {
                var theActualSharedPost = await this.postsRepository.Table.Where(p => p.Id == curr.ResharedPostId).FirstOrDefaultAsync();

                await this.postReshareRepository.DeleteAsync(curr);
                await this.postsRepository.DeleteAsync(theActualSharedPost);
            }
        }

        /// <summary>
        /// Updates the forum post
        /// </summary>
        /// <param name="forumPost">Forum post</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdatePostAsync(Post forumPost)
        {
            await this.postsRepository.UpdateAsync(forumPost);
        }

        public async Task<Customer> LoadAccountIdFromVideo(int postId)
        {
            var post = await this.GetPostByIdAsync(postId);

            var user = await this.userService.GetCustomerByIdAsync(post.UserId);

            return user;
        }
    }
}
