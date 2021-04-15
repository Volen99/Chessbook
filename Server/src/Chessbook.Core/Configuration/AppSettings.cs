using System.Collections.Generic;

namespace Nop.Core.Configuration
{
    /// <summary>
    /// Represents the app settings 📐
    /// </summary>
    public partial class AppSettings
    {
        /// <summary>
        /// Gets or sets cache configuration parameters
        /// </summary>
        public CacheConfig CacheConfig { get; set; } = new CacheConfig();
    }
}
