namespace Chessbook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Post;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Web.Models.Inputs;
    using Nop.Core;
    using Nop.Core.Domain.Catalog;

    public interface IPostsService
    {
        Task<Post> CreateAsync(QueryPostParams query, int userId, int[] mediaIds = null, int pollId = 0);

        Task<Post> CreateRetweet(int id, int userId, bool trimUser);

        /// <summary>
        /// Gets product
        /// </summary>
        /// <param name="productId">Product identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product
        /// </returns>
        Task<Post> GetPostByIdAsync(int productId);

        Task<T> GetResharedOriginal<T>(int resharedPostId);

        Task<IList<Post>> GetHomeTimeline(bool ascSort = false,
            int pageIndex = 0, int pageSize = int.MaxValue);

        Task<IPagedList<Post>> GetUserProfileTimeline(int userId, bool ascSort = false,
            int pageIndex = 0, int pageSize = int.MaxValue);


        /// <summary>
        /// Get a post vote 
        /// </summary>
        /// <param name="postId">Post identifier</param>
        /// <param name="customer">Customer</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the post vote
        /// </returns>
        Task<PostVote> GetPostVoteAsync(int postId, Customer customer);

        /// <summary>
        /// Get post vote made since the parameter date
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="сreatedFromUtc">Date</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the post votes count
        /// </returns>
        Task<int> GetNumberOfPostVotesAsync(Customer customer);

        /// <summary>
        /// Insert a post vote
        /// </summary>
        /// <param name="postVote">Post vote</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task InsertPostVoteAsync(PostVote postVote);

        /// <summary>
        /// Delete a post vote
        /// </summary>
        /// <param name="postVote">Post vote</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task DeletePostVoteAsync(PostVote postVote);

        Task<IList<Customer>> GetLikers(int postId);

        Task<int> GetPostsCountByUserId(int userId);

        Task<bool> GetReshareStatus(int postId, int userId);

        Task<int> GetReshareCount(int postId);




        /// <summary>
        /// Check whether customer is allowed to delete post
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="post">Topic</param>
        /// <returns>True if allowed, otherwise false</returns>
        Task<bool> IsCustomerAllowedToDeletePostAsync(Customer customer, Post post);

        /// <summary>
        /// Delete a product
        /// </summary>
        /// <param name="product">Product</param>
        Task DeleteProductAsync(Post product);

        Task Unshare(Post product);

        /// <summary>
        /// Gets a product pictures by product identifier
        /// </summary>
        /// <param name="productId">The product identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product pictures
        /// </returns>
        Task<IList<PostPicture>> GetProductPicturesByProductIdAsync(int productId);

        /// <summary>
        /// Gets a product picture
        /// </summary>
        /// <param name="productPictureId">Product picture identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product picture
        /// </returns>
        Task<PostPicture> GetProductPictureByIdAsync(int productPictureId);

        Task<Customer> LoadAccountIdFromVideo(int postId);
    }
}
