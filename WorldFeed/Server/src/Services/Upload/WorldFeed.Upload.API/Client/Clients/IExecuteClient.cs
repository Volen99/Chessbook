namespace WorldFeed.Upload.Client.Clients
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.Application.Query;
    using WorldFeed.Upload.Application.Requesters;

    public interface IExecuteClient
    {
        /// <summary>
        /// Execute a custom request
        /// </summary>
        /// <returns>The raw response from twitter with the json parsed into a Data Transfer Object</returns>
        Task<ITwitterResult<T>> AdvanceRequestAsync<T>(Action<ITwitterRequest> configureRequest) where T : class;

        /// <summary>
        /// Execute a custom request
        /// </summary>
        /// <returns>The raw response from Twitter</returns>
        Task<ITwitterResult> AdvanceRequestAsync(Action<ITwitterRequest> configureRequest);

        /// <summary>
        /// Execute a custom query
        /// </summary>
        /// <returns>The raw response from twitter with the json parsed into a Data Transfer Object</returns>
        Task<ITwitterResult<T>> RequestAsync<T>(Action<ITwitterQuery> configureQuery) where T : class;

        /// <summary>
        /// Execute a custom query
        /// </summary>
        /// <returns>The raw response from Twitter</returns>
        Task<ITwitterResult> RequestAsync(Action<ITwitterQuery> configureQuery);
    }
}
