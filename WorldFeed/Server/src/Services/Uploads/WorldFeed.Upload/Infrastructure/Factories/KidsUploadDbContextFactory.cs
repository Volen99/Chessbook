namespace WorldFeed.Upload.Infrastructure.Factories
{
    using System.IO;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;

    using WorldFeed.Common.Infrastructure;
    using WorldFeed.Upload.Infrastructure.Data.Dbs;

    class KidsUploadDbContextFactory : IDesignTimeDbContextFactory<KidsUploadDbContext>
    {
        public KidsUploadDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
               .AddJsonFile("appsettings.json")
               .AddEnvironmentVariables()
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<KidsUploadDbContext>();

            optionsBuilder.UseSqlServer(config["KidsUploadDbContextConnection"], sqlServerOptionsAction: o => o.MigrationsAssembly("WorldFeed.Upload"));

            return new KidsUploadDbContext(optionsBuilder.Options);
        }
    }
}
