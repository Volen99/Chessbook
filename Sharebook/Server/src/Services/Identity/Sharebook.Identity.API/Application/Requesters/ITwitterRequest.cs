namespace Sharebook.Identity.API.Application.Requesters
{
    using Sharebook.Common.Web;
    using Sharebook.Identity.API.Application.Query;
    using Sharebook.Identity.API.Client;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
