namespace WorldFeed.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.Upload;
    using WorldFeed.Common.Upload;
    using WorldFeed.Common.Web;
    using WorldFeed.Controllers.Upload;

    public class UploadRequester : BaseRequester, IUploadRequester
    {
        private readonly IUploadClientRequiredParametersValidator uploadClientRequiredParametersValidator;
        private readonly IUploadQueryExecutor uploadQueryExecutor;
        private readonly IUploadMediaStatusQueryExecutor uploadMediaStatusQueryExecutor;
        private readonly IUploadHelper uploadHelper;

        public UploadRequester(
            ITwitterClient client,
            ITwitterClientEvents clientEvents,
            IUploadClientRequiredParametersValidator uploadClientRequiredParametersValidator,
            IUploadQueryExecutor uploadQueryExecutor,
            IUploadMediaStatusQueryExecutor uploadMediaStatusQueryExecutor,
            IUploadHelper uploadHelper)
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
