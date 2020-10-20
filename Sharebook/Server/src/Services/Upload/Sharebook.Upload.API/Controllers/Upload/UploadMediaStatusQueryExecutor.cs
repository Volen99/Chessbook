namespace Sharebook.Upload.API.Controllers
{
    using System;
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Models.Enums;
    using Sharebook.Upload.API.Web;
    using Sharebook.Upload.Application.Requesters;
    using Sharebook.Upload.DTO;
    using Sharebook.Upload.Models.DTO;
    using Sharebook.Upload.Properties;

    public interface IUploadMediaStatusQueryExecutor
    {
        Task<ITwitterResult<IUploadedMediaInfo>> GetMediaStatusAsync(IMedia media, ITwitterRequest request);
    }

    public class UploadMediaStatusQueryExecutor : IUploadMediaStatusQueryExecutor
    {
        private readonly ITwitterAccessor twitterAccessor;

        public UploadMediaStatusQueryExecutor(ITwitterAccessor twitterAccessor)
        {
            this.twitterAccessor = twitterAccessor;
        }

        public async Task<ITwitterResult<IUploadedMediaInfo>> GetMediaStatusAsync(IMedia media, ITwitterRequest request)
        {
            if (media.HasBeenUploaded == false)
            {
                throw new InvalidOperationException(Resources.Exception_Upload_Status_NotUploaded);
            }

            if (media.UploadedMediaInfo.ProcessingInfo == null)
            {
                throw new InvalidOperationException(Resources.Exception_Upload_Status_No_ProcessingInfo);
            }

            request.Query.Url = $"https://localhost:5000/media/sendd?command=STATUS&media_id={media.Id}"; // https://upload.twitter.com/1.1/media/upload.json?command=STATUS&media_id={media.Id}
            request.Query.HttpMethod = HttpMethod.GET;

            return await this.twitterAccessor.ExecuteRequestAsync<IUploadedMediaInfo>(request).ConfigureAwait(false);
        }
    }
}
