namespace WorldFeed.Post.API.Infrastructure.Inject
{
    using System;

    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Models.Properties;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Logic.Helpers;
    using WorldFeed.Logic.Wrapper;
    using WorldFeed.Post.API.Exceptions;
    using WorldFeed.Post.API.Infrastructure.Inject.Contracts;
    using WorldFeed.Post.API.JsonConverters;
    using WorldFeed.Post.API.Wrappers;
    using WorldFeed.Post.Domain.AggregatesModel;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.Entities;
    using WorldFeed.Post.Domain.AggregatesModel.PostAggregate.TwitterEntities;
    using WorldFeed.Post.Domain.AggregatesModel.TweetAggregate;
    using WorldFeed.Post.DTO;
    using WorldFeed.Upload.API.JsonConverters;

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
