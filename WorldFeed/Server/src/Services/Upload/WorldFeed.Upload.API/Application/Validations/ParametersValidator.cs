namespace WorldFeed.Upload.Application.Validations
{
    using WorldFeed.Upload.Application.Parameters;
    using WorldFeed.Upload.Application.Parameters.TweetsClient;
    using WorldFeed.Upload.Client.Validators;

    public interface IParametersValidator : IUploadClientParametersValidator, ITweetsClientParametersValidator
    {
    }

    public class ParametersValidator : IParametersValidator
    {
        private readonly IUploadClientParametersValidator uploadClientParametersValidator;

        public ParametersValidator(IUploadClientParametersValidator uploadClientParametersValidator)
        {
            this.uploadClientParametersValidator = uploadClientParametersValidator;
        }

        public void Validate(IUploadParameters parameters)
        {
            this.uploadClientParametersValidator.Validate(parameters);
        }

        public void Validate(IAddMediaMetadataParameters parameters)
        {
            this.uploadClientParametersValidator.Validate(parameters);
        }

        public void Validate(IPublishTweetParameters parameters)
        {
            throw new System.NotImplementedException();
        }

        public void Validate(IPublishRetweetParameters parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}
