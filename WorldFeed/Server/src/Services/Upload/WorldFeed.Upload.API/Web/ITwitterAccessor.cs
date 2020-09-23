namespace WorldFeed.Upload.API.Web
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.Application.Requesters;

    public interface ITwitterAccessor
    {
        Task<ITwitterResult> ExecuteRequestAsync(ITwitterRequest request);

        Task<ITwitterResult<T>> ExecuteRequestAsync<T>(ITwitterRequest request) // Example: T = IUploadInitModel
            where T : class;

        Task PrepareTwitterRequestAsync(ITwitterRequest request);
    }
}
