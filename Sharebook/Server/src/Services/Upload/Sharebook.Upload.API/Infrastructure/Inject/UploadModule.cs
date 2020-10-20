namespace Sharebook.Upload.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Common.Public.Client.Clients;
    using Sharebook.Upload.API.Application.Requesters;
    using Sharebook.Upload.API.Client.Clients;
    using Sharebook.Upload.Application.Requesters;
    using Sharebook.Upload.Client;
    using Sharebook.Upload.Client.Clients;
    using Sharebook.Upload.Client.Tools;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;

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
