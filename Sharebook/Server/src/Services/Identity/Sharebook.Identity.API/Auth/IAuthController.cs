namespace Sharebook.Identity.API.Auth
{
    using System.Threading.Tasks;

    using Sharebook.Common.Public.Parameters.Auth;
    using Sharebook.Identity.API.Application.Requesters;
    using Sharebook.Identity.API.Application.Web;
    using Sharebook.Identity.API.DTO;
    using Sharebook.Identity.API.Models.Authentication;

    public interface IAuthController
    {
        Task<ITwitterResult<CreateTokenResponseDTO>> CreateBearerTokenAsync(ICreateBearerTokenParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IAuthenticationRequest>> RequestAuthUrlAsync(IRequestAuthUrlParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterCredentials>> RequestCredentialsAsync(IRequestCredentialsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<InvalidateTokenResponse>> InvalidateAccessTokenAsync(IInvalidateAccessTokenParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<InvalidateTokenResponse>> InvalidateBearerTokenAsync(IInvalidateBearerTokenParameters parameters, ITwitterRequest request);
    }
}
