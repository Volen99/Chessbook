using System.Threading.Tasks;

using Chessbook.Data.Models.Media;
using Chessbook.Core.Domain.Polls;
using Chessbook.Core.Caching;
using Chessbook.Core.Domain.Configuration;
using Chessbook.Core.Events;
using Chessbook.Services.Events;

namespace Chessbook.Web.Infrastructure.Cache
{
    /// <summary>
    /// Model cache event consumer (used for caching of presentation layer models)
    /// </summary>
    public partial class ModelCacheEventConsumer :
        //settings
        IConsumer<EntityUpdatedEvent<Setting>>,

        //Picture
        IConsumer<EntityInsertedEvent<Picture>>,
        IConsumer<EntityUpdatedEvent<Picture>>,
        IConsumer<EntityDeletedEvent<Picture>>,
        //polls
        IConsumer<EntityInsertedEvent<Poll>>,
        IConsumer<EntityUpdatedEvent<Poll>>,
        IConsumer<EntityDeletedEvent<Poll>>
    {
        #region Fields

        private readonly IStaticCacheManager _staticCacheManager;

        #endregion

        #region Ctor

        public ModelCacheEventConsumer(IStaticCacheManager staticCacheManager)
        {
            _staticCacheManager = staticCacheManager;
        }

        #endregion

        #region Methods


        #region Setting

        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task HandleEventAsync(EntityUpdatedEvent<Setting> eventMessage)
        {
            //clear models which depend on settings
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ManufacturerNavigationPrefixCacheKey); //depends on CatalogSettings.ManufacturersBlockItemsToDisplay
            await _staticCacheManager.RemoveAsync(NopModelCacheDefaults.VendorNavigationModelKey); //depends on VendorSettings.VendorBlockItemsToDisplay
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.CategoryAllPrefixCacheKey); //depends on CatalogSettings.ShowCategoryProductNumber and CatalogSettings.ShowCategoryProductNumberIncludingSubcategories
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.CategoryXmlAllPrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.HomepageBestsellersIdsPrefixCacheKey); //depends on CatalogSettings.NumberOfBestsellersOnHomepage
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ProductsAlsoPurchasedIdsPrefixCacheKey); //depends on CatalogSettings.ProductsAlsoPurchasedNumber
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.BlogPrefixCacheKey); //depends on BlogSettings.NumberOfTags
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.NewsPrefixCacheKey); //depends on NewsSettings.MainPageNewsCount
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.SitemapPrefixCacheKey); //depends on distinct sitemap settings
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.WidgetPrefixCacheKey); //depends on WidgetSettings and certain settings of widgets
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.StoreLogoPathPrefixCacheKey); //depends on StoreInformationSettings.LogoPictureId
        }

        #endregion

        #region Pictures

        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task HandleEventAsync(EntityInsertedEvent<Picture> eventMessage)
        {
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ProductAttributePicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.CartPicturePrefixCacheKey);
        }

        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task HandleEventAsync(EntityUpdatedEvent<Picture> eventMessage)
        {
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ProductAttributePicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.CartPicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ProductDetailsPicturesPrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ProductDefaultPicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.CategoryPicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ManufacturerPicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.VendorPicturePrefixCacheKey);
        }

        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task HandleEventAsync(EntityDeletedEvent<Picture> eventMessage)
        {
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ProductAttributePicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.CartPicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ProductDetailsPicturesPrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ProductDefaultPicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.CategoryPicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.ManufacturerPicturePrefixCacheKey);
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.VendorPicturePrefixCacheKey);
        }

        #endregion


        #region Polls

        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task HandleEventAsync(EntityInsertedEvent<Poll> eventMessage)
        {
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.PollsPrefixCacheKey);
        }

        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task HandleEventAsync(EntityUpdatedEvent<Poll> eventMessage)
        {
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.PollsPrefixCacheKey);
        }

        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task HandleEventAsync(EntityDeletedEvent<Poll> eventMessage)
        {
            await _staticCacheManager.RemoveByPrefixAsync(NopModelCacheDefaults.PollsPrefixCacheKey);
        }

        #endregion


        #endregion
    }
}
