using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Chessbook.Core.Configuration
{
    /// <summary>
    /// Represents distributed cache configuration parameters
    /// </summary>
    public partial class DistributedCacheConfig : IConfig
    {
        /// <summary>
        /// Gets or sets a distributed cache type
        /// </summary>
        [JsonConverter(typeof(StringEnumConverter))]
        public DistributedCacheType DistributedCacheType { get; set; } = DistributedCacheType.SqlServer; // was Redis

        /// <summary>
        /// Gets or sets a value indicating whether we should use distributed cache
        /// </summary>
        public bool Enabled { get; set; } = true;                                                        // was false;

        /// <summary>
        /// Gets or sets connection string. Used when distributed cache is enabled
        /// </summary>
        public string ConnectionString { get; set; } = "Data Source=tcp:chessbook.database.windows.net,1433;Initial Catalog=chessbook;User Id=chessbook@chessbook;Password=Lovechess40"; // "Server=.\\SQLEXPRESS;Database=Chessbook;Integrated Security=true;MultipleActiveResultSets=true"; // ;; // "127.0.0.1:6379,ssl=False";

        /// <summary>
        /// Gets or sets schema name. Used when distributed cache is enabled and DistributedCacheType property is set as SqlServer
        /// </summary>
        public string SchemaName { get; set; } = "dbo";

        /// <summary>
        /// Gets or sets table name. Used when distributed cache is enabled and DistributedCacheType property is set as SqlServer
        /// </summary>
        public string TableName { get; set; } = "DistributedCache";
    }
}
