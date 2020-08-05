namespace WorldFeed.Data
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using WorldFeed.Statistics.Data;
    using WorldFeed.Common.Models;

    public class DbQueryRunner : IDbQueryRunner
    {
        public DbQueryRunner(StatisticsDbContext context)
        {
            this.Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public StatisticsDbContext Context { get; set; }

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
