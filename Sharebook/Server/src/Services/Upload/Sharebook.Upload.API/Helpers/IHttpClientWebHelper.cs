namespace Sharebook.Upload.API.Helpers
{
    using System.Net.Http;
    using System.Threading.Tasks;

    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.Application.Query;

    public interface IHttpClientWebHelper
    {
        Task<HttpResponseMessage> GetHttpResponseAsync(ITwitterQuery twitterQuery, ITwitterClientHandler handler = null);

        HttpClient GetHttpClient(ITwitterQuery twitterQuery, ITwitterClientHandler handler = null);
    }
}
