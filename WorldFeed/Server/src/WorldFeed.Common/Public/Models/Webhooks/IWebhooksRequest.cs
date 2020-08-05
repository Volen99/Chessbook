namespace WorldFeed.Common.Public.Models.Webhooks
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    // Webhooks are "user-defined HTTP callbacks". They are usually triggered by some event, such as pushing
    // code to a repository or a comment being posted to a blog
    public interface IWebhooksRequestInfoRetriever
    {
        string GetPath();

        IDictionary<string, string[]> GetQuery();

        IDictionary<string, string[]> GetHeaders();
    }

    public interface IWebhooksRequest : IWebhooksRequestInfoRetriever
    {
        Task<string> GetJsonFromBodyAsync();

        void SetResponseStatusCode(int statusCode);

        Task WriteInResponseAsync(string content, string contentType);
    }
}
