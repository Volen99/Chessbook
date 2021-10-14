using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkiaSharp;

using Chessbook.Common;
using Chessbook.Core;
using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;
using Chessbook.Data.Models.Media;
using Chessbook.Data.Models.Post.Enums;
using Chessbook.Services.Cards;
using Chessbook.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Data.Services.Media;
using Chessbook.Services.Entities;
using Chessbook.Services.Localization;
using Chessbook.Web.Api.Areas.Admin.Models.Post;
using Chessbook.Web.Api.Models.Posts;
using Chessbook.Core.Caching;
using Chessbook.Core.Domain.Media;
using Chessbook.Services.Common;
using Chessbook.Services.Helpers;
using Chessbook.Web.Areas.Admin.Models.Customers;
using Chessbook.Web.Factories;
using Chessbook.Web.Infrastructure.Cache;
using Chessbook.Web.Models.Catalog;
using Chessbook.Web.Models.Media;

namespace Chessbook.Web.Api.Factories
{
    public class PostModelFactory : IPostModelFactory
    {
        #region Fields

        private readonly MediaSettings mediaSettings;
        private readonly IStaticCacheManager staticCacheManager;
        private readonly IWebHelper webHelper;
        private readonly IWorkContext workContext;
        private readonly IStoreContext storeContext;
        private readonly IPictureService pictureService;
        private readonly ILocaleStringResourceService localeStringResourceService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IUserService userService;
        private readonly IGenericAttributeService genericAttributeService;
        private readonly IPostCommentService postCommentService;
        private readonly IPostsService postService;
        private readonly IPostTagService postTagService;
        private readonly IPollService pollService;
        private readonly IPollModelFactory pollModelFactory;
        private readonly IDateTimeHelper dateTimeHelper;
        private readonly IPreviewCardFactory previewCardFactory;
        private readonly IPreviewCardService previewCardService;

        #endregion

        #region Ctor

        public PostModelFactory(MediaSettings mediaSettings, IStaticCacheManager staticCacheManager, IWebHelper webHelper, IWorkContext workContext,
            IStoreContext storeContext, IPictureService pictureService, ILocaleStringResourceService localeStringResourceService, IUserModelFactory userModelFactory,
            IUserService userService, IGenericAttributeService genericAttributeService, IPostCommentService postCommentService, IPostsService postService,
            IPostTagService postTagService, IPollService pollService, IPollModelFactory pollModelFactory, IDateTimeHelper dateTimeHelper,
            IPreviewCardFactory previewCardFactory, IPreviewCardService previewCardService)
        {
            this.mediaSettings = mediaSettings;
            this.staticCacheManager = staticCacheManager;
            this.webHelper = webHelper;
            this.workContext = workContext;
            this.storeContext = storeContext;
            this.pictureService = pictureService;
            this.localeStringResourceService = localeStringResourceService;
            this.userModelFactory = userModelFactory;
            this.userService = userService;
            this.genericAttributeService = genericAttributeService;
            this.postCommentService = postCommentService;
            this.postService = postService;
            this.postTagService = postTagService;
            this.pollService = pollService;
            this.pollModelFactory = pollModelFactory;
            this.dateTimeHelper = dateTimeHelper;
            this.previewCardFactory = previewCardFactory;
            this.previewCardService = previewCardService;
        }

        #endregion

        #region Utilities

        /// <summary>
        /// Prepare the product details picture model
        /// </summary>
        /// <param name="product">Product</param>
        /// <param name="isAssociatedProduct">Whether the product is associated</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the picture model for the default picture; All picture models
        /// </returns>
        protected virtual async Task<IList<PictureModel>> PrepareProductDetailsPictureModelAsync(PostModel post, bool isAssociatedProduct)
        {
            if (post == null)
            {
                throw new ArgumentNullException(nameof(post));
            }

            // default picture size
            var defaultPictureSize = isAssociatedProduct ? this.mediaSettings.AssociatedProductPictureSize : this.mediaSettings.ProductDetailsPictureSize;

            // prepare picture models
            var productPicturesCacheKey = this.staticCacheManager.PrepareKeyForDefaultCache(NopModelCacheDefaults.ProductDetailsPicturesModelKey
                , post, defaultPictureSize, isAssociatedProduct,
                await this.workContext.GetWorkingLanguageAsync(), this.webHelper.IsCurrentConnectionSecured(), await this.storeContext.GetCurrentStoreAsync());
            var cachedPictures = await this.staticCacheManager.GetAsync(productPicturesCacheKey, async () =>
            {
                var productName = post.User.DisplayName + "'s post";

                var pictures = await this.pictureService.GetPicturesByProductIdAsync(post.Id); // check if this guy is null?
                var defaultPicture = pictures.FirstOrDefault();

                string fullSizeImageUrl, imageUrl, thumbImageUrl;
                (imageUrl, defaultPicture) = await this.pictureService.GetPictureUrlAsync(defaultPicture, defaultPictureSize, !isAssociatedProduct);
                (fullSizeImageUrl, defaultPicture) = await this.pictureService.GetPictureUrlAsync(defaultPicture, 0, !isAssociatedProduct);

                // TODO: you know what to do kk
                using var image = SKBitmap.Decode(@"C:\Users\volen\OneDrive\Desktop\Chessbook\Server\src\Web\Chessbook.WebApi\wwwroot" + fullSizeImageUrl);
                using var imageSmall = SKBitmap.Decode(@"C:\Users\volen\OneDrive\Desktop\Chessbook\Server\src\Web\Chessbook.WebApi\wwwroot" + imageUrl);

                var defaultPictureModel = new PictureModel
                {
                    ImageUrl = ChessbookConstants.SiteHttps + imageUrl,
                    FullSizeImageUrl = ChessbookConstants.SiteHttps + fullSizeImageUrl,
                    Blurhash = defaultPicture.Blurhash,
                    Meta = new Dictionary<string, MediaEntitySizeModel>
                        {
                            { "original", new MediaEntitySizeModel
                                {
                                 Width = image.Width,
                                 Height = image.Height,
                                 Size = image.Width + "x" + image.Height,
                                 Aspect = (double) image.Width / image.Height
                                }
                            },
                            { "small", new MediaEntitySizeModel
                                {
                                 Width = imageSmall.Width,
                                 Height = imageSmall.Height,
                                 Size = imageSmall.Width + "x" + imageSmall.Height,
                                 Aspect = (double) imageSmall.Width / imageSmall.Height
                                }
                            },

                        }
                };
                // "title" attribute
                defaultPictureModel.Title = (defaultPicture != null && !string.IsNullOrEmpty(defaultPicture.TitleAttribute)) ?
                    defaultPicture.TitleAttribute :
                    string.Format(await this.localeStringResourceService.GetResourceAsync("Media.Product.ImageLinkTitleFormat.Details"), productName);
                // "alt" attribute
                defaultPictureModel.AlternateText = (defaultPicture != null && !string.IsNullOrEmpty(defaultPicture.AltAttribute)) ?
                    defaultPicture.AltAttribute :
                    string.Format(await this.localeStringResourceService.GetResourceAsync("Media.Product.ImageAlternateTextFormat.Details"), productName);

                // all pictures
                var pictureModels = new List<PictureModel>();
                for (var i = 0; i < pictures.Count(); i++)
                {
                    var picture = pictures[i];

                    (imageUrl, picture) = await this.pictureService.GetPictureUrlAsync(picture, defaultPictureSize, !isAssociatedProduct);
                    (fullSizeImageUrl, picture) = await this.pictureService.GetPictureUrlAsync(picture);
                    (thumbImageUrl, picture) = await this.pictureService.GetPictureUrlAsync(picture, this.mediaSettings.ProductThumbPictureSizeOnProductDetailsPage);

                    var pictureModel = new PictureModel
                    {
                        ImageUrl = ChessbookConstants.SiteHttps + imageUrl,
                        ThumbImageUrl = ChessbookConstants.SiteHttps + thumbImageUrl,
                        FullSizeImageUrl = ChessbookConstants.SiteHttps + fullSizeImageUrl,
                        Title = string.Format(await this.localeStringResourceService.GetResourceAsync("Media.Product.ImageLinkTitleFormat.Details"), productName),
                        AlternateText = string.Format(await this.localeStringResourceService.GetResourceAsync("Media.Product.ImageAlternateTextFormat.Details"), productName),
                        Blurhash = picture.Blurhash,
                        Meta = new Dictionary<string, MediaEntitySizeModel>
                        {
                            { "original", new MediaEntitySizeModel
                                {
                                 Width = image.Width,
                                 Height = image.Height,
                                 Size = image.Width + "x" + image.Height,
                                 Aspect = (double) image.Width / image.Height
                                }
                            },
                            { "small", new MediaEntitySizeModel
                                {
                                 Width = imageSmall.Width,
                                 Height = imageSmall.Height,
                                 Size = imageSmall.Width + "x" + imageSmall.Height,
                                 Aspect = (double) imageSmall.Width / imageSmall.Height
                                }
                            },

                        }
                    };
                    // "title" attribute
                    pictureModel.Title = !string.IsNullOrEmpty(picture.TitleAttribute) ?
                        picture.TitleAttribute :
                        string.Format(await this.localeStringResourceService.GetResourceAsync("Media.Product.ImageLinkTitleFormat.Details"), productName);
                    // "alt" attribute
                    pictureModel.AlternateText = !string.IsNullOrEmpty(picture.AltAttribute) ?
                        picture.AltAttribute :
                        string.Format(await this.localeStringResourceService.GetResourceAsync("Media.Product.ImageAlternateTextFormat.Details"), productName);

                    pictureModels.Add(pictureModel);
                }

                return new { DefaultPictureModel = defaultPictureModel, PictureModels = pictureModels };
            });

            var allPictureModels = cachedPictures.PictureModels;
            return allPictureModels;
        }

        #endregion

        public async Task<PostModel> PreparePostModelAsync(Post post, bool isAssociatedProduct = false)
        {
            if (post == null)
            {
                throw new ArgumentNullException(nameof(post));
            }

            var userTime = await this.dateTimeHelper.ConvertToUserTimeAsync(post.CreatedAt, DateTimeKind.Utc);
            var model = new PostModel
            {
                Id = post.Id,
                Status = post.Status,
                HasMedia = post.HasMedia,
                FavoriteCount = post.FavoriteCount,
                RepostCount = post.RepostCount,
                Pinned = post.Pinned,
                CreatedAt = userTime,
            };


            // user 
            var postUser = await this.userService.GetCustomerByIdAsync(post.UserId);
            model.User = await this.userModelFactory.PrepareCustomerModelAsync(model.User, postUser);

            // card
            var card = await this.previewCardService.GetPreviewCardByPostIdAsync(post.Id);

            // repost
            if (post.RepostId.HasValue)
            {
                model.Repost = await this.PreparePostModelAsync(await this.postService.GetPostByIdAsync(post.RepostId.Value)); // 💫
            }
            else
            {
                // post tags
                model.Tags = await PrepareProductTagModelsAsync(post);

                if (model.HasMedia)
                {
                    // pictures
                    var allPictureModels = await PrepareProductDetailsPictureModelAsync(model, isAssociatedProduct);
                    model.Entities.Medias = allPictureModels;
                }
                else if (post.PollId.HasValue)
                {
                    var poll = await this.pollService.GetPollByIdAsync(post.PollId.Value);
                    model.Poll = await this.pollModelFactory.PreparePollModelAsync(poll, true);
                }
                else if (card != null)
                {
                    model.Card = await this.previewCardFactory.PreparePreviewCardModel(card);
                }

                // liked?
                var userCurrent = await this.workContext.GetCurrentCustomerAsync();

                var postVote = await this.postService.GetPostVoteAsync(post.Id, userCurrent);
                if (postVote == null)
                {
                    model.Favorited = false;
                }
                else
                {
                    model.Favorited = postVote.Type == PostRateType.Like;
                }

                // reposted?
                var reposted = await this.postService.GetRepostStatus(post.Id, userCurrent.Id);
                if (reposted != null)
                {
                    model.Reposted = true;
                }
                else
                {
                    model.Reposted = false;
                }

                // comments
                var commentsCount = await this.postCommentService.GetPostCommentsCount(post.Id);
                model.CommentsCount = commentsCount;
            }

            return model;
        }

        /// <summary>
        /// Prepare post comment model
        /// </summary>
        /// <param name="postComment">Post comment entity</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the post comment model
        /// </returns>
        public virtual async Task<PostCommentModel> PreparePostCommentModelAsync(PostComment postComment)
        {
            if (postComment == null)
            {
                throw new ArgumentNullException(nameof(postComment));
            }

            var customer = await this.userService.GetCustomerByIdAsync(postComment.UserId);

            var currentUser = await this.workContext.GetCurrentCustomerAsync();

            var model = new PostCommentModel
            {
                Id = postComment.Id,
                Url = postComment.Url,
                Text = postComment.Text,

                ThreadId = this.GetThreadId(postComment),
                InReplyToCommentId = postComment.InReplyToCommentId,
                PostId = postComment.PostId,

                CreatedAt = await this.dateTimeHelper.ConvertToUserTimeAsync(postComment.CreatedAt, DateTimeKind.Utc),
                UpdatedAt = await this.dateTimeHelper.ConvertToUserTimeAsync(postComment.UpdatedAt, DateTimeKind.Utc),
                DeletedAt = postComment.DeletedAt.HasValue ? await this.dateTimeHelper.ConvertToUserTimeAsync(postComment.DeletedAt.Value, DateTimeKind.Utc) : null,

                IsDeleted = this.IsDeleted(postComment.DeletedAt),

                TotalReplies = await this.postCommentService.GetTotalReplies(postComment.Id, await  this.BuildBlockerAccountIds(postComment.PostId, currentUser)),
                TotalRepliesFromPostAuthor = await this.postCommentService.GetTotalRepliesFrompPostAuthor(postComment.Id),

                Account = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), customer),
            };

            // avatar
            model.Account.ProfileImageUrlHttps = ChessbookConstants.SiteHttps + await this.pictureService.GetPictureUrlAsync(
                await this.genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.AvatarPictureIdAttribute),
                48, true, defaultPictureType: PictureType.Avatar);


            return model;
        }

        private int GetThreadId(PostComment postComment)
        {
            if (postComment.OriginCommentId.HasValue)
            {
                return postComment.OriginCommentId.Value;
            }

            return postComment.Id;
        }

        private bool IsDeleted(DateTime? deletedAt)
        {
            return deletedAt != null;
        }

        // This is genius. I wish I was that smart. 7/19/2021, Monday | Didn't Know Better - By: Ivan B (Feat. Breana Marin) (Lyrics)
        public async Task<PostCommentThreadModel> PreparePostCommentTree(IList<PostComment> inputList)
        {
            // Comments are sorted by id ASC
            var comments = new Queue<PostComment>(inputList);

            var comment = comments.Dequeue();
            var thread = new PostCommentThreadModel
            {
                Comment = await this.PreparePostCommentModelAsync(comment),
                Children = new List<PostCommentThreadModel>(),
            };

            var idx = new Dictionary<int, PostCommentThreadModel>()
            {
                {comment.Id, thread } // :DDD
            };

            while (comments.Count != 0)
            {
                var childComment = comments.Dequeue();

                var childCommentThread = new PostCommentThreadModel
                {
                    Comment = await this.PreparePostCommentModelAsync(childComment),
                    Children = new List<PostCommentThreadModel>(),
                };

                var parentCommentThread = idx[childComment.InReplyToCommentId.Value];    // TODO: might bug
                // Maybe the parent comment was blocked by the admin/user
                if (parentCommentThread == null)
                {
                    continue;
                }

                parentCommentThread.Children.Add(childCommentThread);
                idx[childComment.Id] = childCommentThread;
            }

            return thread;
        }

        /// <summary>
        /// Prepare products by tag model
        /// </summary>
        /// <param name="productTag">Product tag</param>
        /// <param name="command">Model to get the catalog products</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the products by tag model
        /// </returns>
        public virtual async Task<ProductsByTagModel> PrepareProductsByTagModelAsync(Tag productTag, CatalogProductsCommand command)
        {
            if (productTag == null)
            {
                throw new ArgumentNullException(nameof(productTag));
            }

            if (command == null)
            {
                throw new ArgumentNullException(nameof(command));
            }

            var model = new ProductsByTagModel
            {
                Id = productTag.Id,
                TagName = productTag.Name,
                CatalogProductsModel = await PrepareTagProductsModelAsync(productTag, command)
            };

            return model;
        }

        /// <summary>
        /// Prepares the tag products model
        /// </summary>
        /// <param name="productTag">Product tag</param>
        /// <param name="command">Model to get the catalog products</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the ag products model
        /// </returns>
        public virtual async Task<CatalogProductsModel> PrepareTagProductsModelAsync(Tag productTag, CatalogProductsCommand command)
        {
            if (productTag == null)
            {
                throw new ArgumentNullException(nameof(productTag));
            }

            if (command == null)
            {
                throw new ArgumentNullException(nameof(command));
            }

            var model = new CatalogProductsModel
            {
                // UseAjaxLoading = _catalogSettings.UseAjaxCatalogProductsLoading
            };

            ////sorting
            //await PrepareSortingOptionsAsync(model, command);
            ////view mode
            //await PrepareViewModesAsync(model, command);
            ////page size
            //await PreparePageSizeOptionsAsync(model, command, _catalogSettings.ProductsByTagAllowCustomersToSelectPageSize,
            //    _catalogSettings.ProductsByTagPageSizeOptions, _catalogSettings.ProductsByTagPageSize);

            ////price range
            //PriceRangeModel selectedPriceRange = null;
            //if (_catalogSettings.EnablePriceRangeFiltering && _catalogSettings.ProductsByTagPriceRangeFiltering)
            //{
            //    selectedPriceRange = await GetConvertedPriceRangeAsync(command);

            //    PriceRangeModel availablePriceRange = null;
            //    if (!_catalogSettings.ProductsByTagManuallyPriceRange)
            //    {
            //        async Task<decimal?> getProductPriceAsync(ProductSortingEnum orderBy)
            //        {
            //            var products = await _productService.SearchProductsAsync(0, 1,
            //                storeId: (await _storeContext.GetCurrentStoreAsync()).Id,
            //                productTagId: productTag.Id,
            //                visibleIndividuallyOnly: true,
            //                orderBy: orderBy);

            //            return products?.FirstOrDefault()?.Price ?? 0;
            //        }

            //        availablePriceRange = new PriceRangeModel
            //        {
            //            From = await getProductPriceAsync(ProductSortingEnum.PriceAsc),
            //            To = await getProductPriceAsync(ProductSortingEnum.PriceDesc)
            //        };
            //    }
            //    else
            //    {
            //        availablePriceRange = new PriceRangeModel
            //        {
            //            From = _catalogSettings.ProductsByTagPriceFrom,
            //            To = _catalogSettings.ProductsByTagPriceTo
            //        };
            //    }

            //    model.PriceRangeFilter = await PreparePriceRangeFilterAsync(selectedPriceRange, availablePriceRange);
            //}

            // products
            var products = await this.postService.SearchProductsAsync(
                command.Start,
                command.Count,
                priceMin: null, // selectedPriceRange?.From,
                priceMax: null, // selectedPriceRange?.To,
                storeId: 1,     // (await _storeContext.GetCurrentStoreAsync()).Id,
                productTagId: productTag.Id,
                visibleIndividuallyOnly: true,
                orderBy: ProductSortingEnum.Position /*(ProductSortingEnum)command.OrderBy*/);

            // var isFiltering = selectedPriceRange?.From is not null;
            await PrepareCatalogProductsAsync(model, products, false);

            return model;
        }

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
        public virtual async Task<IEnumerable<PostModel>> PrepareProductOverviewModelsAsync(IEnumerable<Post> products,
            bool preparePriceModel = true, bool preparePictureModel = true,
            int? productThumbPictureSize = null, bool prepareSpecificationAttributes = false,
            bool forceRedirectionAfterAddingToCart = false)
        {
            if (products == null)
            {
                throw new ArgumentNullException(nameof(products));
            }

            var models = new List<PostModel>();
            foreach (var product in products)
            {
                var userTime = await this.dateTimeHelper.ConvertToUserTimeAsync(product.CreatedAt, DateTimeKind.Utc);
                var model = new PostModel
                {
                    Id = product.Id,
                    Status = product.Status,
                    HasMedia = product.HasMedia,
                    FavoriteCount = product.FavoriteCount,
                    CreatedAt = userTime,
                };

                // user 
                var postUser = await this.userService.GetCustomerByIdAsync(product.UserId);
                model.User = await this.userModelFactory.PrepareCustomerModelAsync(model.User, postUser);

                // post tags
                model.Tags = await PrepareProductTagModelsAsync(product);

                if (model.HasMedia)
                {
                    // pictures
                    var allPictureModels = await this.PrepareProductDetailsPictureModelAsync(model, false);
                    model.Entities.Medias = allPictureModels;
                }

                models.Add(model);
            }

            return models;
        }

        /// <summary>
        /// Prepare popular product tags model
        /// </summary>
        /// <param name="numberTagsToReturn">The number of tags to be returned; pass 0 to get all tags</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product tags model
        /// </returns>
        public virtual async Task<PopularProductTagsModel> PreparePopularProductTagsModelAsync(int numberTagsToReturn = 0)
        {
            var model = new PopularProductTagsModel();

            var tagStats = await this.postTagService.GetPostCountAsync(1);

            model.TotalTags = tagStats.Count;

            model.Tags.AddRange(await tagStats
                // Take the most popular tags if specified
                .OrderByDescending(x => x.Value).Take(numberTagsToReturn > 0 ? numberTagsToReturn : tagStats.Count)
                .SelectAwait(async tagStat =>
                {
                    var tag = await this.postTagService.GetPostTagByIdAsync(tagStat.Key);

                    return new PostTagModel
                    {
                        Id = tag.Id,
                        Name = tag.Name,
                        PostCount = tagStat.Value
                    };
                })
                // sorting result
                .OrderBy(x => x.PostCount)  // x.Name
                .ToListAsync());

            return model;
        }

        /// <summary>
        /// Prepares catalog products
        /// </summary>
        /// <param name="model">Catalog products model</param>
        /// <param name="products">The products</param>
        /// <param name="isFiltering">A value indicating that filtering has been applied</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected virtual async Task PrepareCatalogProductsAsync(CatalogProductsModel model, IPagedList<Post> products, bool isFiltering = false)
        {
            if (!string.IsNullOrEmpty(model.WarningMessage))
            {
                return;
            }

            if (products.Count == 0 && isFiltering)
            {
                model.NoResultMessage = await this.localeStringResourceService.GetResourceAsync("Catalog.Products.NoResult");
            }
            else
            {
                model.Products = (await this.PrepareProductOverviewModelsAsync(products)).ToList();
                model.LoadPagedList(products);
            }
        }

        /// <summary>
        /// Prepare the product tag models
        /// </summary>
        /// <param name="product">Product</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the list of product tag model
        /// </returns>
        protected virtual async Task<IList<PostTagModel>> PrepareProductTagModelsAsync(Post post)
        {
            if (post == null)
            {
                throw new ArgumentNullException(nameof(post));
            }

            // var store = await _storeContext.GetCurrentStoreAsync();
            var productsTags = await this.postTagService.GetAllPostTagsByPostIdAsync(post.Id);

            var model = await productsTags
                    // filter by store
                    .WhereAwait(async x => await this.postTagService.GetPostCountByPostTagIdAsync(x.Id, 1) > 0)
                    .SelectAwait(async x => new PostTagModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        PostCount = await this.postTagService.GetPostCountByPostTagIdAsync(x.Id, 1)
                    }).ToListAsync();

            return model;
        }

        private async Task<List<int>> BuildBlockerAccountIds(int postId, Customer currentLoggedUser)
        {
            var blockerAccountIds = new List<int>(); // { User.GetUserId() };

            if (currentLoggedUser != null)
            {
                blockerAccountIds.Add(currentLoggedUser.Id);
            }

            // if (isVideoOwned)

            var postOwnerAccount = await this.postService.LoadAccountIdFromVideo(postId);
            blockerAccountIds.Add(postOwnerAccount.Id);

            return blockerAccountIds;
        }
    }
}
