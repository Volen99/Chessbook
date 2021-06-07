using Chessbook.Common;
using Chessbook.Data.Models.Post;
using Chessbook.Services.Data.Services;
using Chessbook.Services.Data.Services.Media;
using Chessbook.Services.Localization;
using Chessbook.Web.Api.Areas.Admin.Models.Post;
using Nop.Core;
using Nop.Core.Caching;
using Nop.Core.Domain.Media;
using Nop.Web.Infrastructure.Cache;
using Nop.Web.Models.Media;
using SkiaSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        #endregion

        #region Ctor

        public PostModelFactory(MediaSettings mediaSettings, IStaticCacheManager staticCacheManager, IWebHelper webHelper, IWorkContext workContext,
            IStoreContext storeContext, IPictureService pictureService, ILocaleStringResourceService localeStringResourceService, IUserModelFactory userModelFactory,
            IUserService userService)
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

                var pictures = await this.pictureService.GetPicturesByProductIdAsync(post.Id);
                var defaultPicture = pictures.FirstOrDefault();

                string fullSizeImageUrl, imageUrl, thumbImageUrl;
                (imageUrl, defaultPicture) = await this.pictureService.GetPictureUrlAsync(defaultPicture, defaultPictureSize, !isAssociatedProduct);
                (fullSizeImageUrl, defaultPicture) = await this.pictureService.GetPictureUrlAsync(defaultPicture, 0, !isAssociatedProduct);

                var defaultPictureModel = new PictureModel
                {
                    ImageUrl = ChessbookConstants.SiteHttps + imageUrl,
                    FullSizeImageUrl = ChessbookConstants.SiteHttps + fullSizeImageUrl,
                    Blurhash = defaultPicture.Blurhash,
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


                    using var image = SKBitmap.Decode(@"C:\Users\volen\OneDrive\Desktop\Chessbook\Server\src\Web\Chessbook.WebApi\wwwroot" + fullSizeImageUrl);


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
                                }
                            }
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

            var model = new PostModel
            {
                Id = post.Id,
                Status = post.Status,
                HasMedia = post.HasMedia,
                FavoriteCount = post.FavoriteCount,
                CreatedAt = post.CreatedAt,
            };


            // user 
            var postUser = await this.userService.GetCustomerByIdAsync(post.UserId);
            model.User = await this.userModelFactory.PrepareCustomerModelAsync(model.User, postUser);

            // pictures
            var allPictureModels = await PrepareProductDetailsPictureModelAsync(model, isAssociatedProduct);
            model.Entities.Medias = allPictureModels;



            return model;
        }
    }
}
