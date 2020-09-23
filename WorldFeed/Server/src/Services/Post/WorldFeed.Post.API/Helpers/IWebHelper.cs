namespace WorldFeed.Common.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces;

    public interface IWebHelper
    {
        Task<Stream> GetResponseStreamAsync(ITwitterRequest request);

        Dictionary<string, string> GetUriParameters(Uri uri);

        Dictionary<string, string> GetURLParameters(string url);

        Dictionary<string, string> GetQueryParameters(string queryUrl);

        string GetBaseURL(string url);

        string GetBaseURL(Uri uri);
    }
}
