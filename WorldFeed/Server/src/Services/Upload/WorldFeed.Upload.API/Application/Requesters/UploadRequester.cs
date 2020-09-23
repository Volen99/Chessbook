namespace WorldFeed.Upload.Application.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.Application.Validations;
    using WorldFeed.Upload.Application.Parameters;
    using WorldFeed.Upload.ChunkedUpload;
    using WorldFeed.Upload.Client;
    using WorldFeed.Upload.DTO;
    using WorldFeed.Upload.Models.DTO;
    using WorldFeed.Upload.Events;
    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.API.Controllers;
    using WorldFeed.Upload.API.Helpers;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

    public class UploadRequester : BaseRequester, IUploadRequester
    {
        private readonly IUploadClientRequiredParametersValidator uploadClientRequiredParametersValidator;
        private readonly IUploadQueryExecutor uploadQueryExecutor;
        private readonly IUploadMediaStatusQueryExecutor uploadMediaStatusQueryExecutor;
        private readonly IUploadHelper uploadHelper;

        public UploadRequester(ITwitterClient client, ITwitterClientEvents clientEvents, IUploadClientRequiredParametersValidator uploadClientRequiredParametersValidator,
            IUploadQueryExecutor uploadQueryExecutor, IUploadMediaStatusQueryExecutor uploadMediaStatusQueryExecutor, IUploadHelper uploadHelper)
        : base(client, clientEvents)
        {
            this.uploadClientRequiredParametersValidator = uploadClientRequiredParametersValidator;
            this.uploadQueryExecutor = uploadQueryExecutor;
            this.uploadMediaStatusQueryExecutor = uploadMediaStatusQueryExecutor;
            this.uploadHelper = uploadHelper;
        }

        public Task<IChunkUploadResult> UploadBinaryAsync(IUploadParameters parameters)
        {
            this.uploadClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.uploadQueryExecutor.UploadBinaryAsync(parameters, request));
        }

        public Task<ITwitterResult> AddMediaMetadataAsync(IAddMediaMetadataParameters parameters)
        {
            this.uploadClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.uploadQueryExecutor.AddMediaMetadataAsync(parameters, request));
        }

        public Task<ITwitterResult<IUploadedMediaInfo>> GetVideoProcessingStatusAsync(IMedia media)
        {
            return ExecuteRequestAsync(request => this.uploadMediaStatusQueryExecutor.GetMediaStatusAsync(media, request));
        }

        public Task WaitForMediaProcessingToGetAllMetadataAsync(IMedia media)
        {
            return ExecuteRequestAsync(request => this.uploadHelper.WaitForMediaProcessingToGetAllMetadataAsync(media, request));
        }
    }
}
