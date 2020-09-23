namespace WorldFeed.Upload.Infrastructure.AutofacModules
{
    using Autofac;

    public class MediatorModule : Autofac.Module
    {
        // AsImplementedInterfaces() Register the type as providing all of its public interfaces as services (excluding IDisposable).
        // AsClosedTypesOf(open) Register types that are assignable to a closed instance of the open generic type.
        protected override void Load(ContainerBuilder builder)
        {
        }
    }
}
