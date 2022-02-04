using System;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Chessbook.Services.Options;
using Chessbook.Common;

namespace Chessbook.Services
{
    public class FrontendConfigService : IFrontendConfigService
    {
        private readonly IOptions<FrontendOptions> opts;
        private readonly ILogger<FrontendConfigService> logger;

        public FrontendConfigService(IOptions<FrontendOptions> opts, ILogger<FrontendConfigService> logger)
        {
            this.opts = opts;
            this.logger = logger;
        }

        public string GetConfiguredIndexContent(string wwwRootPath)
        {
            string indexFile = Path.Combine(wwwRootPath, "index.html");
            if (File.Exists(indexFile))
            {
                var jsonFrontend = JObject.FromObject(opts.Value);
                if (opts.Value.Extras != null)
                {
                    try
                    {
                        var jsonFrontendExtras = JObject.Parse(opts.Value.Extras);

                        jsonFrontend.Merge(jsonFrontendExtras, new JsonMergeSettings
                        {
                            // union array values together to avoid duplicates
                            MergeArrayHandling = MergeArrayHandling.Union,
                        });
                    }
                    catch (Exception ex)
                    {
                        logger.LogWarning($"Unable to parse FrontendOptions Extras {opts.Value.Extras}", ex);
                    }
                }

                var jsonFrontendString = JsonConvert.SerializeObject(jsonFrontend, JsonSettings.FrontendOptionsProperties);
                var indexContent = File.ReadAllText(indexFile);
                var regex = new Regex(@"^.*\Wwindow.configOverrides\W.*$", RegexOptions.Multiline);
                indexContent = regex.Replace(indexContent, $"<script>window.configOverrides = {jsonFrontendString};</script>");
                return indexContent;
            }

            return string.Empty;
        }
    }
}
