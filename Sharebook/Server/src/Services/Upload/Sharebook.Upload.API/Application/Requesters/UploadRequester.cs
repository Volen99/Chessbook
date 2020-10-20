namespace Sharebook.Upload.Application.Requesters
{
    using System.Threading.Tasks;

    using Sharebook.Upload.Application.Validations;
    using Sharebook.Upload.Application.Parameters;
    using Sharebook.Upload.ChunkedUpload;
    using Sharebook.Upload.Client;
    using Sharebook.Upload.DTO;
    using Sharebook.Upload.Models.DTO;
    using Sharebook.Upload.Events;
    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.API.Controllers;
    using Sharebook.Upload.API.Helpers;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;

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
