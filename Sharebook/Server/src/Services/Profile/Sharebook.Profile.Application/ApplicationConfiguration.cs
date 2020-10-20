namespace Sharebook.Post.Application
{
    using System.Reflection;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using AutoMapper;
    using MediatR;

    using Sharebook.Upload.Application.Common.Behaviours;

    public static class ApplicationConfiguration
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
            => services
                .Configure<ApplicationSettings>(
                    configuration.GetSection(nameof(ApplicationSettings)),
                    options => options.BindNonPublicProperties = true)
                .AddAutoMapper(Assembly.GetExecutingAssembly())
                .AddMediatR(Assembly.GetExecutingAssembly())
                .AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));
    }
}
