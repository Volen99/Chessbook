namespace Sharebook.Upload.Application.Validations
{
    using Sharebook.Upload.Application.Parameters;
    using Sharebook.Upload.Application.Parameters.TweetsClient;
    using Sharebook.Upload.Client.Validators;

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
