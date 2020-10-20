namespace Sharebook.Upload.Application.Requesters
{
    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.Application.Query;
    using Sharebook.Upload.Client;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
