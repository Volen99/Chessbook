namespace WorldFeed.Identity.API.Application.Requesters
{
    using WorldFeed.Common.Web;
    using WorldFeed.Identity.API.Application.Query;
    using WorldFeed.Identity.API.Client;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
