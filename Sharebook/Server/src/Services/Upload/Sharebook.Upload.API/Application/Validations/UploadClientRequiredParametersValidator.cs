namespace Sharebook.Upload.Application.Validations
{
    using System;

    using Sharebook.Upload.Application.Parameters;

    public interface IUploadClientRequiredParametersValidator : IUploadClientParametersValidator
    {
    }

    public class UploadClientRequiredParametersValidator : IUploadClientRequiredParametersValidator
    {
        public void Validate(IUploadParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.Binary == null)
            {
                throw new ArgumentNullException($"{nameof(parameters.Binary)}");
            }
        }

        public void Validate(IAddMediaMetadataParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.MediaId == null)
            {
                throw new ArgumentNullException($"{nameof(parameters.MediaId)}");
            }
        }
    }
}
