namespace WorldFeed.Client.Requesters
{
    using System.Threading.Tasks;
    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Controllers;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Parameters.Auth;
    using WorldFeed.Common.Web;

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