using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models.Post;
using Chessbook.Web.Api.Areas.Admin.Models.Post;
using Chessbook.Web.Api.Models.Posts;
using Nop.Web.Models.Catalog;

namespace Chessbook.Web.Api.Factories
{
    public interface IPostModelFactory
    {
        Task<PostModel> PreparePostModelAsync(Post post, bool isAssociatedProduct = false);

        Task<PostCommentModel> PreparePostCommentModelAsync(PostComment postComment);

        Task<PostCommentThreadModel> PreparePostCommentTree(IList<PostComment> replies);

        /// <summary>
        /// Prepare products by tag model
        /// </summary>
        /// <param name="productTag">Product tag</param>
        /// <param name="command">Model to get the catalog products</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the products by tag model
        /// </returns>
        Task<ProductsByTagModel> PrepareProductsByTagModelAsync(Tag productTag, CatalogProductsCommand command);

        /// <summary>
        /// Prepares the tag products model
        /// </summary>
        /// <param name="productTag">Product tag</param>
        /// <param name="command">Model to get the catalog products</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the ag products model
        /// </returns>
        Task<CatalogProductsModel> PrepareTagProductsModelAsync(Tag productTag, CatalogProductsCommand command);

        /// <summary>
        /// Prepare the product overview models
        /// </summary>
        /// <param name="products">Collection of products</param>
        /// <param name="preparePriceModel">Whether to prepare the price model</param>
        /// <param name="preparePictureModel">Whether to prepare the picture model</param>
        /// <param name="productThumbPictureSize">Product thumb picture size (longest side); pass null to use the default value of media settings</param>
        /// <param name="prepareSpecificationAttributes">Whether to prepare the specification attribute models</param>
        /// <param name="forceRedirectionAfterAddingToCart">Whether to force redirection after adding to cart</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the collection of product overview model
        /// </returns>
        Task<IEnumerable<PostModel>> PrepareProductOverviewModelsAsync(IEnumerable<Post> products,
            bool preparePriceModel = true, bool preparePictureModel = true,
            int? productThumbPictureSize = null, bool prepareSpecificationAttributes = false,
            bool forceRedirectionAfterAddingToCart = false);

        /// <summary>
        /// Prepare popular product tags model
        /// </summary>
        /// <param name="numberTagsToReturn">The number of tags to be returned; pass 0 to get all tags</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product tags model
        /// </returns>
        Task<PopularProductTagsModel> PreparePopularProductTagsModelAsync(int numberTagsToReturn = 0);
    }
}
