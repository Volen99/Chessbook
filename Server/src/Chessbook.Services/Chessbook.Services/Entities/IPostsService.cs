namespace Chessbook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Chessbook.Core.Domain.Posts;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.Post.Enums;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Core;

    public interface IPostsService
    {
        /// <summary>
        /// Search products
        /// </summary>
        /// <param name="pageIndex">Page index</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="categoryIds">Category identifiers</param>
        /// <param name="manufacturerIds">Manufacturer identifiers</param>
        /// <param name="storeId">Store identifier; 0 to load all records</param>
        /// <param name="vendorId">Vendor identifier; 0 to load all records</param>
        /// <param name="warehouseId">Warehouse identifier; 0 to load all records</param>
        /// <param name="productType">Product type; 0 to load all records</param>
        /// <param name="visibleIndividuallyOnly">A values indicating whether to load only products marked as "visible individually"; "false" to load all records; "true" to load "visible individually" only</param>
        /// <param name="excludeFeaturedProducts">A value indicating whether loaded products are marked as featured (relates only to categories and manufacturers); "false" (by default) to load all records; "true" to exclude featured products from results</param>
        /// <param name="priceMin">Minimum price; null to load all records</param>
        /// <param name="priceMax">Maximum price; null to load all records</param>
        /// <param name="productTagId">Product tag identifier; 0 to load all records</param>
        /// <param name="keywords">Keywords</param>
        /// <param name="searchDescriptions">A value indicating whether to search by a specified "keyword" in product descriptions</param>
        /// <param name="searchManufacturerPartNumber">A value indicating whether to search by a specified "keyword" in manufacturer part number</param>
        /// <param name="searchSku">A value indicating whether to search by a specified "keyword" in product SKU</param>
        /// <param name="searchProductTags">A value indicating whether to search by a specified "keyword" in product tags</param>
        /// <param name="languageId">Language identifier (search for text searching)</param>
        /// <param name="filteredSpecOptions">Specification options list to filter products; null to load all records</param>
        /// <param name="orderBy">Order by</param>
        /// <param name="showHidden">A value indicating whether to show hidden records</param>
        /// <param name="overridePublished">
        /// null - process "Published" property according to "showHidden" parameter
        /// true - load only "Published" products
        /// false - load only "Unpublished" products
        /// </param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the products
        /// </returns>
        Task<IPagedList<Post>> SearchProductsAsync(
            int pageIndex = 0,
            int pageSize = int.MaxValue,
            IList<int> categoryIds = null,
            IList<int> manufacturerIds = null,
            int storeId = 0,
            int vendorId = 0,
            int warehouseId = 0,
            bool visibleIndividuallyOnly = false,
            bool excludeFeaturedProducts = false,
            decimal? priceMin = null,
            decimal? priceMax = null,
            int productTagId = 0,
            string keywords = null,
            bool searchDescriptions = false,
            bool searchManufacturerPartNumber = true,
            bool searchSku = true,
            bool searchProductTags = false,
            int languageId = 0,
            ProductSortingEnum orderBy = ProductSortingEnum.Position,
            bool showHidden = false,
            bool? overridePublished = null);

        Task<Post> CreateAsync(QueryPostParams query, int userId, int[] mediaIds = null, int? pollId = null);

        /// <summary>
        /// Gets product
        /// </summary>
        /// <param name="productId">Product identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product
        /// </returns>
        Task<Post> GetPostByIdAsync(int productId);

        /// <summary>
        /// Gets products by identifier
        /// </summary>
        /// <param name="productIds">Product identifiers</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the products
        /// </returns>
        Task<IList<Post>> GetPostsByIdsAsync(int[] productIds);

        Task<IList<Post>> GetHomeTimeline(bool ascSort = false,
            int pageIndex = 0, int pageSize = int.MaxValue);

        Task<IPagedList<Post>> GetUserProfileTimeline(int userId, bool ascSort = false, bool onlyMedia = false,
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

        Task<PostVote> GetPostVoteByIdAsync(int postId);

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
        Task<PostVote> InsertPostVoteAsync(int postId, int userId, PostRateType rateType);

        /// <summary>
        /// Delete a post vote
        /// </summary>
        /// <param name="postVote">Post vote</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task DeletePostVoteAsync(PostVote postVote);

        Task<IList<Customer>> GetLikers(int postId);

        Task<IList<Customer>> GetReposters(int postId);

        Task<int> GetPostsCountByUserId(int userId);

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

        /// <summary>
        /// Updates the post
        /// </summary>
        /// <param name="post">Post</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task UpdatePostAsync(Post post);

        Task<Customer> LoadAccountIdFromVideo(int postId);

        Task<Post> GetPinnedPost(int userId);

        Task<Post> GetRepostStatus(int postId, int userId);

        /// <summary>
        /// Gets all comments
        /// </summary>
        /// <param name="customerId">Customer identifier; 0 to load all records</param>
        /// <param name="storeId">Store identifier; pass 0 to load all records</param>
        /// <param name="blogPostId">Blog post ID; 0 or null to load all records</param>
        /// <param name="approved">A value indicating whether to content is approved; null to load all records</param> 
        /// <param name="fromUtc">Item creation from; null to load all records</param>
        /// <param name="toUtc">Item creation to; null to load all records</param>
        /// <param name="commentText">Search comment text; null to load all records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the comments
        /// </returns>
        Task<IList<PostComment>> GetAllCommentsAsync(int customerId = 0, int storeId = 0, int? blogPostId = null,
            bool? approved = null, DateTime? fromUtc = null, DateTime? toUtc = null, string commentText = null);

        /// <summary>
        /// Deletes post comments
        /// </summary>
        /// <param name="postComments">Blog comments</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task DeleteBlogCommentsAsync(IList<PostComment> postComments);

        Task<IList<Post>> GetPostsByUserId(int userId);

        /// <summary>
        /// Delete products
        /// </summary>
        /// <param name="posts">Products</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task DeletePostsAsync(IList<Post> posts);
    }
}
