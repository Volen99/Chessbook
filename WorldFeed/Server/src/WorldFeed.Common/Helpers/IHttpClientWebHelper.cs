namespace WorldFeed.Common.Helpers
{
    using System.Net.Http;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Web;

    public interface IHttpClientWebHelper
    {
        Task<HttpResponseMessage> GetHttpResponseAsync(ITwitterQuery twitterQuery, ITwitterClientHandler handler = null);

        HttpClient GetHttpClient(ITwitterQuery twitterQuery, ITwitterClientHandler handler = null);
    }
}
