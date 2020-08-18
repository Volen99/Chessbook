namespace WorldFeed.Science.API.Data
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Common.Models;
    using WorldFeed.Science.Upload.Infrastructure;

    public class DbQueryRunner : IDbQueryRunner
    {
        public DbQueryRunner(ScienceUploadDbContext context)
        {
            this.Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public ScienceUploadDbContext Context { get; set; }

        public Task RunQueryAsync(string query, params object[] parameters)
        {
            return this.Context.Database.ExecuteSqlRawAsync(query, parameters);
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.Context?.Dispose();
            }
        }
    }
}
