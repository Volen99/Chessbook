namespace WorldFeed.Profile.Application.Requesters
{
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Web;
    using WorldFeed.Profile.Client;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
