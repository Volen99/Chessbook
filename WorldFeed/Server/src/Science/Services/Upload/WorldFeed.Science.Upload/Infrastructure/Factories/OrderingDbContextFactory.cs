namespace WorldFeed.Science.Upload.Infrastructure.Factories
{
    using System.IO;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;

    public class OrderingDbContextFactory : IDesignTimeDbContextFactory<ScienceUploadDbContext>
    {
        public ScienceUploadDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
               .AddJsonFile("appsettings.json")
               .AddEnvironmentVariables()
               .Build();

            var optionsBuilder = new DbContextOptionsBuilder<ScienceUploadDbContext>();

            optionsBuilder.UseSqlServer(config["ConnectionString"], sqlServerOptionsAction: o => o.MigrationsAssembly("WorldFeed.Science.Upload"));

            return new ScienceUploadDbContext(optionsBuilder.Options);
        }
    }
}
