namespace WorldFeed.Science.Upload.Infrastructure.AutofacModules
{
    using System.Reflection;
    using Autofac;
    using MediatR;
    using WorldFeed.Science.Upload.Application.Commands;

    public class MediatorModule : Autofac.Module
    {
        // AsImplementedInterfaces() Register the type as providing all of its public interfaces as services (excluding IDisposable).
        // AsClosedTypesOf(open) Register types that are assignable to a closed instance of the open generic type.
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(IMediator).GetTypeInfo().Assembly)
                .AsImplementedInterfaces();

            // Register all the Command classes (they implement IRequestHandler) in assembly holding the Commands
            builder.RegisterAssemblyTypes(typeof(CreateFeedCommand).GetTypeInfo().Assembly)
                .AsClosedTypesOf(typeof(IRequestHandler<,>));

        }
    }
}
