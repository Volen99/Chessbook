namespace Devspaces.Support
{
    using Microsoft.Extensions.DependencyInjection;

    public static class HttpClientBuilderDevspacesExtensions
    {
        public static IHttpClientBuilder AddDevspacesSupport(this IHttpClientBuilder builder)
        {
            builder.AddHttpMessageHandler<DevspacesMessageHandler>();
            return builder;
        }
    }
}
