namespace Sharebook.Data
{
    using System;
    using System.IO;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;

    class DesignTimeContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        // this class used by EF tool for creating migrations via Package Manager Console
        // Add-Migration MigrationName -Project Common.DataAccess.EFCore -StartupProject Common.DataAccess.EFCore
        // or in case of console building: dotnet ef migrations add MigrationName --project Common.DataAccess.EFCore --startup-project Common.DataAccess.EFCore
        // after migration is added, please add migrationBuilder.Sql(SeedData.Initial()); to the end of seed method for initial data
        public DesignTimeContextFactory() {}

        public DataContext CreateDbContext(string[] args)
        {
            string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()/*, "../Sharebook.Web.Api"*/))
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true)
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var builder = new DbContextOptionsBuilder<DataContext>();
            //builder.UseSqlServer(connectionString);

            builder.UseSqlServer(connectionString, sqlServerOptionsAction: o => o.MigrationsAssembly("Sharebook.Data"));

            return new DataContext(builder.Options);
        }
    }
}
