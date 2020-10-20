namespace Sharebook.Upload.API.Web
{
    using System.Threading.Tasks;

    using Sharebook.Upload.Application.Requesters;

    public interface ITwitterAccessor
    {
        Task<ITwitterResult> ExecuteRequestAsync(ITwitterRequest request);

        Task<ITwitterResult<T>> ExecuteRequestAsync<T>(ITwitterRequest request) // Example: T = IUploadInitModel
            where T : class;

        Task PrepareTwitterRequestAsync(ITwitterRequest request);
    }
}
