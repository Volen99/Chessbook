namespace WorldFeed.Identity.API.Auth
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Parameters.Auth;
    using WorldFeed.Identity.API.Application.Requesters;
    using WorldFeed.Identity.API.Application.Web;
    using WorldFeed.Identity.API.DTO;
    using WorldFeed.Identity.API.Models.Authentication;

    public interface IAuthController
    {
        Task<ITwitterResult<CreateTokenResponseDTO>> CreateBearerTokenAsync(ICreateBearerTokenParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IAuthenticationRequest>> RequestAuthUrlAsync(IRequestAuthUrlParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterCredentials>> RequestCredentialsAsync(IRequestCredentialsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<InvalidateTokenResponse>> InvalidateAccessTokenAsync(IInvalidateAccessTokenParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<InvalidateTokenResponse>> InvalidateBearerTokenAsync(IInvalidateBearerTokenParameters parameters, ITwitterRequest request);
    }
}
