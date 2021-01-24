namespace Sharebook.Common.Infrastructure
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    using Microsoft.Extensions.Configuration;

    public static class ConfigurationExtensions
    {
        public static string GetDefaultConnectionString(this IConfiguration configuration)
        {
            return configuration.GetConnectionString("DefaultConnection");
        }

        // by me
        public static string GetLocalConnectionString(this IConfiguration configuration)
        {
            return configuration.GetConnectionString("ConnectionString");
        }
    }
}
