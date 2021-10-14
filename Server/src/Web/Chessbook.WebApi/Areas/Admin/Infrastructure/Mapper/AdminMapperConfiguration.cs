using AutoMapper;

using Chessbook.Core.Configuration;
using Chessbook.Core.Domain.Stores;
using Chessbook.Core.Domain.Tasks;
using Chessbook.Core.Infrastructure.Mapper;
using Chessbook.Web.Areas.Admin.Models.Polls;
using Chessbook.Web.Areas.Admin.Models.Stores;
using Chessbook.Web.Areas.Admin.Models.Tasks;
using Chessbook.Web.Framework.Models;
using Chessbook.Core.Domain.Security;
using Chessbook.Core.Domain.Polls;

namespace Chessbook.Web.Areas.Admin.Infrastructure.Mapper
{
    /// <summary>
    /// AutoMapper configuration for admin area models
    /// </summary>
    public class AdminMapperConfiguration : Profile, IOrderedMapperProfile
    {
        #region Ctor

        public AdminMapperConfiguration()
        {
            //create specific maps
            CreatePollsMaps();
            CreateStoresMaps();
            CreateTasksMaps();

            //add some generic mapping rules
            ForAllMaps((mapConfiguration, map) =>
            {
                //exclude Form and CustomProperties from mapping BaseNopModel
                if (typeof(BaseNopModel).IsAssignableFrom(mapConfiguration.DestinationType))
                {
                    //map.ForMember(nameof(BaseNopModel.Form), options => options.Ignore());
                    map.ForMember(nameof(BaseNopModel.CustomProperties), options => options.Ignore());
                }

                //exclude ActiveStoreScopeConfiguration from mapping ISettingsModel
                if (typeof(ISettingsModel).IsAssignableFrom(mapConfiguration.DestinationType))
                    map.ForMember(nameof(ISettingsModel.ActiveStoreScopeConfiguration), options => options.Ignore());

                //exclude some properties from mapping configuration and models
                if (typeof(IConfig).IsAssignableFrom(mapConfiguration.DestinationType))
                    map.ForMember(nameof(IConfig.Name), options => options.Ignore());

                //exclude Locales from mapping ILocalizedModel
                if (typeof(ILocalizedModel).IsAssignableFrom(mapConfiguration.DestinationType))
                    map.ForMember(nameof(ILocalizedModel<ILocalizedModel>.Locales), options => options.Ignore());

                //exclude some properties from mapping store mapping supported entities and models
                if (typeof(IStoreMappingSupported).IsAssignableFrom(mapConfiguration.DestinationType))
                    map.ForMember(nameof(IStoreMappingSupported.LimitedToStores), options => options.Ignore());
                if (typeof(IStoreMappingSupportedModel).IsAssignableFrom(mapConfiguration.DestinationType))
                {
                    map.ForMember(nameof(IStoreMappingSupportedModel.AvailableStores), options => options.Ignore());
                    map.ForMember(nameof(IStoreMappingSupportedModel.SelectedStoreIds), options => options.Ignore());
                }

                //exclude some properties from mapping ACL supported entities and models
                if (typeof(IAclSupported).IsAssignableFrom(mapConfiguration.DestinationType))
                    map.ForMember(nameof(IAclSupported.SubjectToAcl), options => options.Ignore());
                if (typeof(IAclSupportedModel).IsAssignableFrom(mapConfiguration.DestinationType))
                {
                    map.ForMember(nameof(IAclSupportedModel.AvailableCustomerRoles), options => options.Ignore());
                    map.ForMember(nameof(IAclSupportedModel.SelectedCustomerRoleIds), options => options.Ignore());
                }

                //exclude some properties from mapping discount supported entities and models
                if (typeof(IDiscountSupportedModel).IsAssignableFrom(mapConfiguration.DestinationType))
                {
                    map.ForMember(nameof(IDiscountSupportedModel.AvailableDiscounts), options => options.Ignore());
                    map.ForMember(nameof(IDiscountSupportedModel.SelectedDiscountIds), options => options.Ignore());
                }

                if (typeof(IPluginModel).IsAssignableFrom(mapConfiguration.DestinationType))
                {
                    //exclude some properties from mapping plugin models
                    map.ForMember(nameof(IPluginModel.ConfigurationUrl), options => options.Ignore());
                    map.ForMember(nameof(IPluginModel.IsActive), options => options.Ignore());
                    map.ForMember(nameof(IPluginModel.LogoUrl), options => options.Ignore());

                    ////define specific rules for mapping plugin models
                    //if (typeof(IPlugin).IsAssignableFrom(mapConfiguration.SourceType))
                    //{
                    //    map.ForMember(nameof(IPluginModel.DisplayOrder), options => options.MapFrom(plugin => ((IPlugin)plugin).PluginDescriptor.DisplayOrder));
                    //    map.ForMember(nameof(IPluginModel.FriendlyName), options => options.MapFrom(plugin => ((IPlugin)plugin).PluginDescriptor.FriendlyName));
                    //    map.ForMember(nameof(IPluginModel.SystemName), options => options.MapFrom(plugin => ((IPlugin)plugin).PluginDescriptor.SystemName));
                    //}
                }
            });
        }

        #endregion

        #region Utilities

        /// <summary>
        /// Create polls maps 
        /// </summary>
        protected virtual void CreatePollsMaps()
        {
            CreateMap<PollAnswer, PollAnswerModel>();
            CreateMap<PollAnswerModel, PollAnswer>();

            CreateMap<Poll, PollModel>()
                .ForMember(model => model.AvailableLanguages, options => options.Ignore())
                .ForMember(model => model.PollAnswerSearchModel, options => options.Ignore())
                .ForMember(model => model.LanguageName, options => options.Ignore());
            CreateMap<PollModel, Poll>();
        }

       

        /// <summary>
        /// Create stores maps 
        /// </summary>
        protected virtual void CreateStoresMaps()
        {
            CreateMap<Store, StoreModel>()
                .ForMember(model => model.AvailableLanguages, options => options.Ignore());
            CreateMap<StoreModel, Store>();
        }

        /// <summary>
        /// Create tasks maps 
        /// </summary>
        protected virtual void CreateTasksMaps()
        {
            CreateMap<ScheduleTask, ScheduleTaskModel>();
            CreateMap<ScheduleTaskModel, ScheduleTask>()
                .ForMember(entity => entity.Type, options => options.Ignore())
                .ForMember(entity => entity.LastStartUtc, options => options.Ignore())
                .ForMember(entity => entity.LastEndUtc, options => options.Ignore())
                .ForMember(entity => entity.LastSuccessUtc, options => options.Ignore());
        }

        #endregion

        #region Properties

        /// <summary>
        /// Order of this mapper implementation
        /// </summary>
        public int Order => 0;

        #endregion
    }
}
