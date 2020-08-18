using Autofac;

namespace WorldFeed.Science.Upload.Infrastructure.AutofacModules
{
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
            //builder.Register(c => new OrderQueries(QueriesConnectionString))
            //    .As<IOrderQueries>()
            //    .InstancePerLifetimeScope();

            //builder.RegisterType<BuyerRepository>()
            //    .As<IBuyerRepository>()
            //    .InstancePerLifetimeScope();

            //builder.RegisterType<OrderRepository>()
            //    .As<IOrderRepository>()
            //    .InstancePerLifetimeScope();

            //builder.RegisterType<RequestManager>()
            //   .As<IRequestManager>()
            //   .InstancePerLifetimeScope();

            //builder.RegisterAssemblyTypes(typeof(CreateOrderCommandHandler).GetTypeInfo().Assembly)
            //    .AsClosedTypesOf(typeof(IIntegrationEventHandler<>));

        }
    }
}
