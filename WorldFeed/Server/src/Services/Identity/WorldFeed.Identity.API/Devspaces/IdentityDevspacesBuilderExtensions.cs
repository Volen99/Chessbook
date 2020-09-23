namespace WorldFeed.Identity.API.Devspaces
{
    using Microsoft.Extensions.DependencyInjection;

    static class IdentityDevspacesBuilderExtensions
    {
        public static IIdentityServerBuilder AddDevspacesIfNeeded(this IIdentityServerBuilder builder, bool useDevspaces)
        {
            if (useDevspaces)
            {
                builder.AddRedirectUriValidator<DevspacesRedirectUriValidator>();
            }
            return builder;
        }
    }
}
