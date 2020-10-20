namespace Sharebook.Post.Application.Requesters
{
    using Sharebook.Post.API.Application.Query;
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.API.Client;

    public interface ITwitterRequest
    {
        ITwitterQuery Query { get; set; }

        ITwitterClientHandler TwitterClientHandler { get; set; }

        ITwitterExecutionContext ExecutionContext { get; set; }
    }
}
