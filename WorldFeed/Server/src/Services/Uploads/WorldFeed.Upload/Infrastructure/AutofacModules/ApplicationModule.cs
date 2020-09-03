namespace WorldFeed.Upload.Infrastructure.AutofacModules
{
    using Autofac;
    using System.Reflection;

    using WorldFeed.BuildingBlocks.EventBus.Abstractions;
    using WorldFeed.Upload.Application.Commands;

    // When using Autofac you typically register the types via modules, which allow you to split the registration types between multiple
    // files depending on where your types are, just as you could have the application types distributed across multiple class libraries
    // A module is a small class that can be used to bundle up a set of related components behind a 'facade' to simplify configuration
    // and deployment. The module exposes a deliberate, restricted set of configuration parameters that can vary independently of the
    // components used to implement the module
    //
    public class ApplicationModule : Autofac.Module
    {
        public ApplicationModule(string qconstr)
        {
            this.QueriesConnectionString = qconstr;
        }

        public string QueriesConnectionString { get; }

        protected override void Load(ContainerBuilder builder)
        {
            //builder.RegisterType<RequestManager>()
            //   .As<IRequestManager>()
            //   .InstancePerLifetimeScope();


            // .RegisterAssemblyTypes() takes an assembly and discovers all classes in that assembly and registers the types with your builder
            builder.RegisterAssemblyTypes(typeof(CreateFeedCommandHandler).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(IIntegrationEventHandler<>));

        }
    }
}
