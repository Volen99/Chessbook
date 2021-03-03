namespace Sharebook.DIContainerCore
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    using Sharebook.Data;
    using Sharebook.Data.Common;
    using Sharebook.Data.Common.Repositories;
    using Sharebook.Data.Models;
    using Sharebook.Data.Repositories;
    using Sharebook.Services;
    using Sharebook.Services.Data.Services;
    using Sharebook.Services.Data.Services.Contacts;
    using Sharebook.Services.Data.Services.Entities;
    using Sharebook.Services.Data.Services.Phone;
    using Sharebook.Services.Data.Services.Upload;

    public static class ContainerExtension
    {
        public static void Initialize(IServiceCollection services, string connectionString)
        {
            services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));

            services.AddScoped<IDataBaseInitializer, DataBaseInitializer>();

            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<IDbQueryRunner, DbQueryRunner>();

            // Application services
            services.AddTransient<ISettingsService, SettingsService>();
            services.AddTransient<ISettingsRepository, SettingsRepository>();
            services.AddTransient<IUserPhotoRepository, UserPhotoRepository>();
            services.AddTransient<IUserService, UserService<User>>();
            services.AddTransient<IUserRepository<User>, UserRepository>();
            services.AddTransient<IIdentityUserRepository<User>, IdentityUserRepository>();
            services.AddTransient<IRoleRepository<Role>, RoleRepository>();
            services.AddTransient<IUserRoleRepository<UserRole>, UserRoleRepository>();
            services.AddTransient<IUserClaimRepository<UserClaim>, UserClaimRepository>();
            services.AddTransient<IUploadService, UploadService>();
            services.AddTransient<IMediaService, MediaService>();
            services.AddTransient<IPostsService, PostsService>();


            // IOT - E-Commerce
            services.AddTransient<IContactService, ContactService>();
            services.AddTransient<IPhoneCallService, PhoneCallService>();
        }
    }
}
