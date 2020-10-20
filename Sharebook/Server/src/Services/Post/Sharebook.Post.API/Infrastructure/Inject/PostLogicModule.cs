namespace Sharebook.Post.API.Infrastructure.Inject
{
    using System;

    using Sharebook.Common.DTO;
    using Sharebook.Common.Exceptions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Models.Properties;
    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Wrappers;
    using Sharebook.Logic.Helpers;
    using Sharebook.Logic.Wrapper;
    using Sharebook.Post.API.Exceptions;
    using Sharebook.Post.API.Infrastructure.Inject.Contracts;
    using Sharebook.Post.API.JsonConverters;
    using Sharebook.Post.API.Wrappers;
    using Sharebook.Post.Domain.AggregatesModel;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.Entities;
    using Sharebook.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using Sharebook.Post.Domain.AggregatesModel.TweetAggregate;
    using Sharebook.Post.DTO;
    using Sharebook.Upload.API.JsonConverters;

    public class PostLogicModule : IPostModule
    {
        public void Initialize(IPostContainer container)
        {
            InitializeTwitterModels(container);
            InitializeTweetinviModels(container);

            InitializeDTOs(container);
            InitializeHelpers(container);
            InitializeWrappers(container);
            InitializeExceptionHandler(container);
            InitializeSerialization(container);
        }

        /// Initialize Models that are not objects coming from Twitter
        private void InitializeTweetinviModels(IPostContainer container)
        {
            //container.RegisterType<IMedia, Media>();
            //container.RegisterType<ISearchResults, SearchResults>();
        }

        // Initialize Models that are Twitter objects
        private void InitializeTwitterModels(IPostContainer container)
        {
            container.RegisterType<IPost, Post>();
            container.RegisterType<IOEmbedTweet, OEmbedTweet>();

            container.RegisterType<ICoordinates, CoordinatesDTO>();
            container.RegisterType<ILocation, Location>();

            // container.RegisterType<IMention, Mention>();
        }

        private void InitializeDTOs(IPostContainer container)
        {
            container.RegisterType<IPostDTO, PostDTO>();
            container.RegisterType<IUserDTO, UserDTO>();

            container.RegisterType<ITweetEntities, TweetEntitiesDTO>();
            container.RegisterType<IObjectEntities, ObjectEntitiesDTO>();
            container.RegisterType<IUserEntities, UserEntities>();

            container.RegisterType<IUrlEntity, UrlEntity>();
            container.RegisterType<IHashtagEntity, HashtagEntity>();
            container.RegisterType<IDescriptionEntity, DescriptionEntity>();
            container.RegisterType<ISymbolEntity, SymbolEntity>();

            container.RegisterType<IMediaEntity, MediaEntity>();
        }

        private void InitializeHelpers(IPostContainer container)
        {
            container.RegisterType<ITwitterStringFormatter, TwitterStringFormatter>();
        }

        private void InitializeWrappers(IPostContainer container)
        {
            container.RegisterType<IJObjectStaticWrapper, JObjectStaticWrapper>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IJsonConvertWrapper, JsonConvertWrapper>(RegistrationLifetime.InstancePerApplication);
        }

        private void InitializeExceptionHandler(IPostContainer container)
        {
            container.RegisterType<IWebExceptionInfoExtractor, WebExceptionInfoExtractor>(RegistrationLifetime.InstancePerApplication);
            // container.RegisterType<ITwitterTimeoutException, TwitterTimeoutException>();
            container.RegisterType<ITwitterExceptionInfo, TwitterExceptionInfo>();
        }

        private void InitializeSerialization(IPostContainer container)
        {
            container.RegisterType<IJsonPropertyConverterRepository, JsonPropertyConverterRepository>();
            container.RegisterType<IJsonObjectConverter, JsonObjectConverter>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
