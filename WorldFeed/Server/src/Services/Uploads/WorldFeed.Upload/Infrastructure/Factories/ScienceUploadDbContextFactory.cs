namespace WorldFeed.Upload.Infrastructure.Factories
{
    using System.IO;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;

    using WorldFeed.Upload.Infrastructure.Data.Dbs;

    public class ScienceUploadDbContextFactory : IDesignTimeDbContextFactory<ScienceUploadDbContext>
    {
        public ScienceUploadDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
               .AddJsonFile("appsettings.json")
               .AddEnvironmentVariables()
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<ScienceUploadDbContext>();

            optionsBuilder.UseSqlServer(config["ScienceUploadDbContextConnection"], sqlServerOptionsAction: o => o.MigrationsAssembly("WorldFeed.Upload"));

            return new ScienceUploadDbContext(optionsBuilder.Options);
        }
    }
}
