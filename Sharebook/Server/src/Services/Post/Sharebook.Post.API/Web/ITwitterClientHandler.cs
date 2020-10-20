namespace Sharebook.Post.API.Application.Web
{
    using Sharebook.Upload.Application.Query;

    public interface ITwitterClientHandler
    {
        /// <summary>
        /// Contains all the information required for the HttpClient to create and execute the request.
        /// </summary>
        ITwitterQuery TwitterQuery { get; set; }
    }
}
