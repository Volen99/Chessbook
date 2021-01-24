namespace Identity.API.Factories
{
    using System.IO;
    using IdentityServer4.EntityFramework.DbContexts;
    using IdentityServer4.EntityFramework.Options;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;

    using Sharebook.Common.Infrastructure;

    public class ConfigurationDbContextFactory : IDesignTimeDbContextFactory<ConfigurationDbContext>
    {
        public ConfigurationDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
               .AddJsonFile("appsettings.json") // might bug, coz of wrong file
               .AddEnvironmentVariables()
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<ConfigurationDbContext>();
                                   // This options class contains properties to control the configuration store and ConfigurationDbContext
            var storeOptions = new ConfigurationStoreOptions();

            optionsBuilder.UseSqlServer(config.GetDefaultConnectionString(), sqlServerOptionsAction: o => o.MigrationsAssembly("Sharebook.Data"));

            return new ConfigurationDbContext(optionsBuilder.Options, storeOptions);
        }
    }
}
