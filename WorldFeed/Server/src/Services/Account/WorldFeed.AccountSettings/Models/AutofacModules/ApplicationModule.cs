namespace WorldFeed.AccountSettings.Models.AutofacModules
{
    using Autofac;
    using Microsoft.AspNetCore.Http;

    using WorldFeed.AccountSettings.Services;

    public class ApplicationModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<IdentityService>().As<IIdentityService>().InstancePerLifetimeScope();
            builder.RegisterType<HttpContextAccessor>().As<IHttpContextAccessor>().InstancePerLifetimeScope();
        }
    }
}
