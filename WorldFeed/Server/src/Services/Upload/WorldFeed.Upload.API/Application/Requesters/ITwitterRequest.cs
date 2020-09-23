namespace WorldFeed.Upload.Application.Requesters
{
    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.Application.Query;
    using WorldFeed.Upload.Client;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
