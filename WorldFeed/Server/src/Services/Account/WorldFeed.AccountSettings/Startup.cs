namespace WorldFeed.AccountSettings
{
    using Autofac;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using WorldFeed.AccountSettings.Models.AutofacModules;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // Add services to the collection. Don't build or return any IServiceProvider or the ConfigureContainer method
        // won't get called. Don't create a ContainerBuilder for Autofac here, and don't call builder.Populate() - that
        // happens in the AutofacServiceProviderFactory for you.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
        }

        // ConfigureContainer is where you can register things directly with Autofac. This runs after ConfigureServices so the things
        // here will override registrations made in ConfigureServices. Don't build the container; that gets done for you by the factory
        public void ConfigureContainer(ContainerBuilder builder)
        {
            // Register your own things directly with Autofac here. Don't call builder.Populate(), that happens in AutofacServiceProviderFactory for u

            builder.RegisterModule<ApplicationModule>();
        }

        public class Test
        {
            public string TestProperty { get; set; }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors(builder =>
               builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader() 
                   .AllowAnyMethod()
               );

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
