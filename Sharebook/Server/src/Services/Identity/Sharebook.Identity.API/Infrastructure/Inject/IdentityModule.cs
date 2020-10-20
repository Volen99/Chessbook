namespace Sharebook.Identity.API.Infrastructure.Inject
{
    using Sharebook.Common.Models.Enums;
    using Sharebook.Identity.API.Client.Clients;
    using Sharebook.Identity.API.Client.Requesters;

    public class IdentityModule : IIdentityModule
    {
        public void Initialize(IIdentityContainer container)
        {
            // Register a singleton of the container, do not use InstancePerApplication
            container.RegisterInstance(typeof(IIdentityContainer), container);

            container.RegisterType<IAuthClient, AuthClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IAuthRequester, AuthRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IAccountSettingsClient, AccountSettingsClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IAccountSettingsRequester, AccountSettingsRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IExecuteClient, ExecuteClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<IExecuteRequester, ExecuteRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IRateLimitsClient, RateLimitsClient>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<ITweetsClient, TweetsClient>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITweetsRequester, TweetsRequester>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IRawExecutors, RawExecutors>(RegistrationLifetime.InstancePerApplication);
            container.RegisterType<ITwitterClientFactories, TwitterClientFactories>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IJsonClient, JsonClient>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
