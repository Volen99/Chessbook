namespace WorldFeed.Identity.API.Client.Validators
{
    using System;

    using WorldFeed.Common.Public.Parameters.Auth;
    using WorldFeed.Identity.API.Application.Requesters;

    public interface IAuthClientParametersValidator
    {
        void Validate(ICreateBearerTokenParameters parameters, ITwitterRequest request);

        void Validate(IRequestAuthUrlParameters parameters);

        void Validate(IRequestCredentialsParameters parameters);

        void Validate(IInvalidateAccessTokenParameters parameters, ITwitterRequest request);

        void Validate(IInvalidateBearerTokenParameters parameters, ITwitterRequest request);
    }

    public class AuthClientParametersValidator : IAuthClientParametersValidator
    {
        private readonly IAuthClientRequiredParametersValidator authClientRequiredParametersValidator;

        public AuthClientParametersValidator(IAuthClientRequiredParametersValidator authClientRequiredParametersValidator)
        {
            this.authClientRequiredParametersValidator = authClientRequiredParametersValidator;
        }

        public void Validate(ICreateBearerTokenParameters parameters, ITwitterRequest request)
        {
            this.authClientRequiredParametersValidator.Validate(parameters, request);
        }

        public void Validate(IRequestAuthUrlParameters parameters)
        {
            this.authClientRequiredParametersValidator.Validate(parameters);

            if (parameters.CallbackUrl != null)
            {
                if (parameters.CallbackUrl != "oob" && Uri.IsWellFormedUriString(parameters.CallbackUrl, UriKind.Absolute) == false)
                {
                    throw new ArgumentException("Invalid format, must be absolute uri or have a value of 'oob'", $"{nameof(parameters)}{nameof(parameters.CallbackUrl)}");
                }
            }
        }

        public void Validate(IRequestCredentialsParameters parameters)
        {
            this.authClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IInvalidateBearerTokenParameters parameters, ITwitterRequest request)
        {
            this.authClientRequiredParametersValidator.Validate(parameters, request);
        }

        public void Validate(IInvalidateAccessTokenParameters parameters, ITwitterRequest request)
        {
            this.authClientRequiredParametersValidator.Validate(parameters, request);
        }
    }
}
