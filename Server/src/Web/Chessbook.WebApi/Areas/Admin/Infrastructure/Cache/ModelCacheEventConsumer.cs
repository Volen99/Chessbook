using System.Threading.Tasks;

using Chessbook.Core.Caching;
using Chessbook.Core.Domain.Configuration;
using Chessbook.Core.Events;
using Chessbook.Services.Events;
using Chessbook.Services.Plugins;

namespace Chessbook.Web.Areas.Admin.Infrastructure.Cache
{
    /// <summary>
    /// Model cache event consumer (used for caching of presentation layer models)
    /// </summary>
    public partial class ModelCacheEventConsumer :
        //settings
        IConsumer<EntityUpdatedEvent<Setting>>

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

        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task HandleEventAsync(EntityUpdatedEvent<Setting> eventMessage)
        {
            //clear models which depend on settings
            await _staticCacheManager.RemoveAsync(NopModelCacheDefaults.OfficialNewsModelKey); //depends on AdminAreaSettings.HideAdvertisementsOnAdminArea
        }

        #endregion
    }
}
