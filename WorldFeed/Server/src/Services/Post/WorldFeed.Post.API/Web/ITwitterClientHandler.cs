namespace WorldFeed.Post.API.Application.Web
{
    using WorldFeed.Upload.Application.Query;

    public interface ITwitterClientHandler
    {
        /// <summary>
        /// Contains all the information required for the HttpClient to create and execute the request.
        /// </summary>
        ITwitterQuery TwitterQuery { get; set; }
    }
}
