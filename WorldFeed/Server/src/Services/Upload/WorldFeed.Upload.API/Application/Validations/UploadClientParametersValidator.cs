namespace WorldFeed.Upload.Application.Validations
{
    using WorldFeed.Common.Exceptions.Public;
    using WorldFeed.Common.Settings;
    using WorldFeed.Upload.Models.Enums;
    using WorldFeed.Upload.Application.Parameters;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;

    public interface IUploadClientParametersValidator
    {
        void Validate(IUploadParameters parameters);

        void Validate(IAddMediaMetadataParameters parameters);
    }

    public class UploadClientParametersValidator : IUploadClientParametersValidator
    {
        private readonly ITwitterClient client;
        private readonly IUploadClientRequiredParametersValidator uploadClientRequiredParametersValidator;

        public UploadClientParametersValidator(ITwitterClient client, IUploadClientRequiredParametersValidator uploadClientRequiredParametersValidator)
        {
            this.client = client;
            this.uploadClientRequiredParametersValidator = uploadClientRequiredParametersValidator;
        }

        public WorldFeedLimits Limits => this.client.Config.Limits;

        public void Validate(IUploadParameters parameters)
        {
            this.uploadClientRequiredParametersValidator.Validate(parameters);

            if (parameters.MediaCategory == MediaCategory.Gif || parameters.MediaCategory == MediaCategory.Image ||
                parameters.MediaCategory == MediaCategory.DmGif || parameters.MediaCategory == MediaCategory.DmImage)
            {
                var maxUploadSize = this.Limits.UPLOAD_MAX_IMAGE_SIZE;
                if (parameters.Binary.Length > maxUploadSize)
                {
                    throw new TwitterArgumentLimitException($"{nameof(parameters.Binary)}", maxUploadSize, nameof(Limits.UPLOAD_MAX_IMAGE_SIZE), "binary size");
                }
            }

            if (parameters.MediaCategory == MediaCategory.Video || parameters.MediaCategory == MediaCategory.DmVideo)
            {
                var maxUploadSize = this.Limits.UPLOAD_MAX_VIDEO_SIZE;
                if (parameters.Binary.Length > maxUploadSize)
                {
                    throw new TwitterArgumentLimitException($"{nameof(parameters.Binary)}", maxUploadSize, nameof(Limits.UPLOAD_MAX_VIDEO_SIZE), "binary size");
                }
            }
        }

        public void Validate(IAddMediaMetadataParameters parameters)
        {
            this.uploadClientRequiredParametersValidator.Validate(parameters);
        }
    }
}
