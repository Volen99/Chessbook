namespace WorldFeed.Client.Clients
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.Upload;

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