namespace Identity.API.Factories
{
    using System.IO;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;

    using WorldFeed.Common.Infrastructure;
    using WorldFeed.Identity.API.Data;

    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
               .AddJsonFile("appsettings.json")
               .AddEnvironmentVariables()
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            optionsBuilder.UseSqlServer(config.GetLocalConnectionString(), sqlServerOptionsAction: o => o.MigrationsAssembly("Identity.API"));

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}