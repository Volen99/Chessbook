namespace WorldFeed.Upload.API.Client.Clients
{
    using System.Threading.Tasks;

    using WorldFeed.Upload.Application.Parameters;
    using WorldFeed.Upload.Application.Requesters;
    using WorldFeed.Upload.Application.Validations;
    using WorldFeed.Upload.Client.Clients;
    using WorldFeed.Upload.DTO;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;
    using WorldFeed.Upload.Models.DTO;

    public class UploadClient : IUploadClient
    {
        private readonly ITwitterClient client;
        private readonly IUploadRequester uploadRequester;

        public UploadClient(ITwitterClient client)
        {
            this.client = client;
            this.uploadRequester = client.Raw.Upload;
        }

        public IUploadClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public Task<IMedia> UploadBinaryAsync(byte[] binary)
        {
            return UploadBinaryAsync(new UploadBinaryParameters(binary));
        }

        public async Task<IMedia> UploadBinaryAsync(IUploadParameters parameters)
        {
            var chunkUploadResult = await this.uploadRequester.UploadBinaryAsync(parameters).ConfigureAwait(false);
            return chunkUploadResult.Media;
        }

        public Task<IMedia> UploadTweetImageAsync(byte[] binary)
        {
            return UploadTweetImageAsync(new UploadTweetImageParameters(binary));
        }

        public Task<IMedia> UploadTweetImageAsync(IUploadTweetImageParameters parameters)
        {
            return UploadBinaryAsync(parameters);
        }

        public Task<IMedia> UploadMessageImageAsync(byte[] binary)
        {
            return UploadMessageImageAsync(new UploadMessageImageParameters(binary));
        }

        public Task<IMedia> UploadMessageImageAsync(IUploadMessageImageParameters parameters)
        {
            return UploadBinaryAsync(parameters);
        }

        public Task<IMedia> UploadTweetVideoAsync(byte[] binary)
        {
            return UploadTweetVideoAsync(new UploadTweetVideoParameters(binary));
        }

        public Task<IMedia> UploadTweetVideoAsync(IUploadTweetVideoParameters parameters)
        {
            return UploadBinaryAsync(parameters);
        }

        public Task<IMedia> UploadMessageVideoAsync(byte[] binary)
        {
            return UploadMessageVideoAsync(new UploadMessageVideoParameters(binary));
        }

        public Task<IMedia> UploadMessageVideoAsync(IUploadMessageVideoParameters parameters)
        {
            return UploadBinaryAsync(parameters);
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
