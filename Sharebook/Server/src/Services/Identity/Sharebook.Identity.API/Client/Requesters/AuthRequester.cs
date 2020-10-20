namespace Sharebook.Identity.API.Client.Requesters
{
    using System.Threading.Tasks;

    using Sharebook.Client;
    using Sharebook.Common.Client.Validators;
    using Sharebook.Common.DTO;
    using Sharebook.Common.Events;
    using Sharebook.Common.Public.Models.Authentication;
    using Sharebook.Common.Public.Parameters.Auth;
    using Sharebook.Identity.API.Application.Web;
    using Sharebook.Identity.API.Auth;
    using Sharebook.Identity.API.Infrastructure.Inject;

    public class AuthRequester : BaseRequester, IAuthRequester
    {
        private readonly IAuthController authController;
        private readonly IAuthClientRequiredParametersValidator validator;

        public AuthRequester(
            ITwitterClient client,
            ITwitterClientEvents clientEvents,
            IAuthController authController,
            IAuthClientRequiredParametersValidator validator)
        : base(client, clientEvents)
        {
            this.authController = authController;
            this.validator = validator;
        }

        public Task<ITwitterResult<CreateTokenResponseDTO>> CreateBearerTokenAsync(ICreateBearerTokenParameters parameters)
        {
            return ExecuteRequestAsync(request =>
            {
                this.validator.Validate(parameters, request);
                return this.authController.CreateBearerTokenAsync(parameters, request);
            });
        }

        public Task<ITwitterResult<IAuthenticationRequest>> RequestAuthUrlAsync(IRequestAuthUrlParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.authController.RequestAuthUrlAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterCredentials>> RequestCredentialsAsync(IRequestCredentialsParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.authController.RequestCredentialsAsync(parameters, request));
        }

        public Task<ITwitterResult<InvalidateTokenResponse>> InvalidateBearerTokenAsync(IInvalidateBearerTokenParameters parameters)
        {
            return ExecuteRequestAsync(request =>
            {
                this.validator.Validate(parameters, request);
                return this.authController.InvalidateBearerTokenAsync(parameters, request);
            });
        }

        public Task<ITwitterResult<InvalidateTokenResponse>> InvalidateAccessTokenAsync(IInvalidateAccessTokenParameters parameters)
        {
            return ExecuteRequestAsync(request =>
            {
                this.validator.Validate(parameters, request);
                return this.authController.InvalidateAccessTokenAsync(parameters, request);
            });
        }
    }
}