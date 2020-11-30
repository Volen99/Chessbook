namespace Identity.API.Factories
{
    using System.IO;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;

    using Sharebook.Common.Infrastructure;
    using Sharebook.Identity.API.Data;

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

            optionsBuilder.UseSqlServer(config.GetDefaultConnectionString(), sqlServerOptionsAction: o => o.MigrationsAssembly("Sharebook.Identity.API"));

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
