using Newtonsoft.Json;

namespace Chessbook.Services.Options
{
    public class FrontendOptions
    {
        public bool SkipAuth { get; set; }

        public bool IsEmbedded { get; set; }

        public bool SkipOTPForDevTools { get; set; }

        /// <summary>
        /// Extras are ignored since it is a Json string that will be merged directly
        /// with the rest of this object into the frontend index.html file.
        /// </summary>
        [JsonIgnore]
        public string Extras { get; set; }
    }
}
