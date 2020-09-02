namespace WorldFeed.AccountSettings.Models.AutofacModules
{
    using Autofac;
    using WorldFeed.AccountSettings.Controllers;
    using WorldFeed.AccountSettings.Services;
    using WorldFeed.Common.Public;

    public class ApplicationModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
           // builder.RegisterType<AccountSettingsController>().As<IAccountSettingsController>().InstancePerLifetimeScope();
            builder.RegisterType<AccountSettingsQueryGenerator>().As<IAccountSettingsQueryGenerator>().InstancePerLifetimeScope();
            builder.RegisterType<AccountSettingsQueryExecutor>().As<IAccountSettingsQueryExecutor>().InstancePerLifetimeScope();
            builder.RegisterType<TwitterClient>().As<ITwitterClient>().InstancePerLifetimeScope();
        }
    }
}
