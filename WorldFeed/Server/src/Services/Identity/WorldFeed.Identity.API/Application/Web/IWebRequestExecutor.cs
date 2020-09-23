namespace WorldFeed.Identity.API.Application.Web
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Web;
    using WorldFeed.Identity.API.Application.Requesters;


    /// <summary>
    /// Generate a Token that can be used to perform OAuth queries
    /// </summary>
    public interface IWebRequestExecutor
    {
        /// <summary>
        /// Execute a TwitterQuery and return the resulting json data.
        /// </summary>
        Task<ITwitterResponse> ExecuteQueryAsync(ITwitterRequest request, ITwitterClientHandler handler = null);

        /// <summary>
        /// Execute a multipart TwitterQuery and return the resulting json data.
        /// </summary>
        Task<ITwitterResponse> ExecuteMultipartQueryAsync(ITwitterRequest request);
    }
}
