namespace Sharebook.Profile.Application.Requesters
{
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Web;
    using Sharebook.Profile.Client;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
