namespace WorldFeed.Post.Application.Requesters
{
    using WorldFeed.Post.API.Application.Query;
    using WorldFeed.Post.API.Application.Web;
    using WorldFeed.Post.API.Client;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
