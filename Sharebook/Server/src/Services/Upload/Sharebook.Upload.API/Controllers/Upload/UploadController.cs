namespace Sharebook.Upload.API.Controllers
{
    using System.Threading.Tasks;
    using System.Linq;
    using System.IO;
    using Microsoft.AspNetCore.Mvc;

    using Sharebook.Upload.Application.Validations;
    using Sharebook.Upload.Application.Parameters;
    using Sharebook.Upload.Application.Requesters;
    using Sharebook.Upload.Infrastructure.Inject;
    using Sharebook.Upload.Models.DTO;
    using Sharebook.Upload.DTO;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;

    public class UploadController : ControllerBase, IUploadController       // was UploadClient
    {
        private readonly ITwitterClient client;
        private readonly IUploadRequester uploadRequester;
        private readonly IUploadContainer uploadContainer;

        public UploadController()
        {
            this.uploadContainer = new UploadContainer();
            this.uploadContainer.Initialize();

            var twitterClientParameters = new TwitterClientParameters()
            {
                Container = this.uploadContainer,
            };

            this.client = new TwitterClient(twitterClientParameters);

            this.uploadRequester = this.client.Raw.Upload;
        }

        public IUploadClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        [Route("[controller]/image")]
        [HttpPost]
        public Task<IMedia> UploadTweetImageAsync()
        {
            var files = Request.Form.Files;

            var file = files.First();

            byte[] binary = new byte[file.Length];

            using (var stream = new BinaryReader(file.OpenReadStream()))
            {
                byte[] buffer = new byte[file.Length];
                while (true)
                {
                    var read = stream.Read(buffer, 0, buffer.Length);

                    if (read < buffer.Length)
                    {
                        binary = buffer;
                        break;
                    }
                }
            }

            return this.UploadTweetImageAsync(new UploadTweetImageParameters(binary));
        }

        public async Task<IMedia> UploadTweetImageAsync(IUploadTweetImageParameters parameters)
        {
            var media = await this.UploadBinaryAsync(parameters);

            return media;
        }

        public async Task<IMedia> UploadBinaryAsync(IUploadParameters parameters)
        {
            var chunkUploadResult = await this.uploadRequester.UploadBinaryAsync(parameters).ConfigureAwait(false);
            return chunkUploadResult.Media;
        }

        public Task<IMedia> UploadBinaryAsync(byte[] binary)
        {
            return this.UploadBinaryAsync(new UploadBinaryParameters(binary));
        }

        public Task<IMedia> UploadMessageImageAsync(byte[] binary)
        {
            return this.UploadMessageImageAsync(new UploadMessageImageParameters(binary));
        }

        public Task<IMedia> UploadMessageImageAsync(IUploadMessageImageParameters parameters)
        {
            return this.UploadBinaryAsync(parameters);
        }

        public Task<IMedia> UploadTweetVideoAsync(byte[] binary)
        {
            return this.UploadTweetVideoAsync(new UploadTweetVideoParameters(binary));
        }

        public Task<IMedia> UploadTweetVideoAsync(IUploadTweetVideoParameters parameters)
        {
            return this.UploadBinaryAsync(parameters);
        }

        public Task<IMedia> UploadMessageVideoAsync(byte[] binary)
        {
            return this.UploadMessageVideoAsync(new UploadMessageVideoParameters(binary));
        }

        public Task<IMedia> UploadMessageVideoAsync(IUploadMessageVideoParameters parameters)
        {
            return this.UploadBinaryAsync(parameters);
        }

        public Task AddMediaMetadataAsync(IMediaMetadata metadata)
        {
            return AddMediaMetadataAsync(new AddMediaMetadataParameters(metadata.MediaId)
            {
                AltText = metadata.AltText
            });
        }

        public async Task AddMediaMetadataAsync(IAddMediaMetadataParameters parameters)
        {
            await this.uploadRequester.AddMediaMetadataAsync(parameters).ConfigureAwait(false);
        }

        public async Task<IUploadedMediaInfo> GetVideoProcessingStatusAsync(IMedia media)
        {
            var twitterResult = await this.uploadRequester.GetVideoProcessingStatusAsync(media).ConfigureAwait(false);
            return twitterResult.Model;
        }

        public Task WaitForMediaProcessingToGetAllMetadataAsync(IMedia media)
        {
            return this.uploadRequester.WaitForMediaProcessingToGetAllMetadataAsync(media);
        }
    }
}
