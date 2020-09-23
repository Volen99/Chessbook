namespace WorldFeed.Upload.API.Helpers
{
    using System.Net.Http;
    using System.Threading.Tasks;

    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.Application.Query;

    public interface IHttpClientWebHelper
    {
        Task<HttpResponseMessage> GetHttpResponseAsync(ITwitterQuery twitterQuery, ITwitterClientHandler handler = null);

        HttpClient GetHttpClient(ITwitterQuery twitterQuery, ITwitterClientHandler handler = null);
    }
}
