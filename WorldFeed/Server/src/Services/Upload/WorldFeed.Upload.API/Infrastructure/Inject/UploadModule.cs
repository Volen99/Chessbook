namespace WorldFeed.Upload.Infrastructure.Inject
{
    using WorldFeed.Common.Models.Enums;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Upload.API.Application.Requesters;
    using WorldFeed.Upload.API.Client.Clients;
    using WorldFeed.Upload.Application.Requesters;
    using WorldFeed.Upload.Client;
    using WorldFeed.Upload.Client.Clients;
    using WorldFeed.Upload.Client.Tools;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

    public class UploadModule : IUploadModule
    {
        public void Initialize(IUploadContainer container)
        {
            // Register a singleton of the container, do not use InstancePerApplication
            container.RegisterInstance(typeof(IUploadContainer), container);

            container.RegisterType<ITweetsClient, TweetsClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITweetsRequester, TweetsRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IUploadClient, UploadClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IUploadRequester, UploadRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IRawExecutors, RawExecutors>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterClientFactories, TwitterClientFactories>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IJsonClient, JsonClient>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
