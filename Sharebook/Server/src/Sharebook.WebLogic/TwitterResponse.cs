namespace Sharebook.WebLogic
{
    using System.Collections.Generic;
    using System.IO;

    using Sharebook.Common.Web;

    public class TwitterResponse : ITwitterResponse
    {
        public string URL { get; set; }

        public Stream ResultStream { get; set; }

        public int StatusCode { get; set; }

        public bool IsSuccessStatusCode { get; set; }

        public Dictionary<string, IEnumerable<string>> Headers { get; set; }

        public byte[] Binary { get; set; }

        public string Content { get; set; }
    }
}
