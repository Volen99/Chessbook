/*
* Copyright (c) Akveo 2019. All Rights Reserved.
* Licensed under the Single Application / Multi Application License.
* See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the ‘docs’ folder for license information on type of purchased license.
*/

using Microsoft.Extensions.Configuration;
using Serilog;
using Serilog.Sinks.MSSqlServer;
using System.Collections.Generic;
using System.Data;

namespace Sharebook.Web.Api.Setup
{
    public static class SerilogConfig
    {
        public static void Configure(IConfiguration configuration)
        {
            const string logTable = "Logs";
            var connectionString = configuration.GetConnectionString("localDb");

            var columnOptions = new ColumnOptions
            {
                AdditionalColumns = new List<SqlColumn> { new SqlColumn(new DataColumn("UserId", typeof(int))) },
            };

            columnOptions.Store.Remove(StandardColumn.Properties);
            columnOptions.Store.Remove(StandardColumn.MessageTemplate);

            Log.Logger = new LoggerConfiguration()
                .WriteTo.MSSqlServer(
                    connectionString: connectionString,
                    tableName: logTable,
                    restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Error,
                    autoCreateSqlTable: true,
                    columnOptions: columnOptions
                ).CreateLogger();
        }
    }
}
