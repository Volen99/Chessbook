namespace WorldFeed.Common.Public.Models.Interfaces
{
    using WorldFeed.Common.Client.Interfaces;
    using WorldFeed.Common.Web;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
