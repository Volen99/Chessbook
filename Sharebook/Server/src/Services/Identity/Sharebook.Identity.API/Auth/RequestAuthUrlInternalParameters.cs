namespace Sharebook.Identity.API.Auth
{
    using Sharebook.Common.Public.Parameters.Auth;
    using Sharebook.Identity.API.Models.Authentication;

    public class RequestAuthUrlInternalParameters : RequestUrlAuthUrlParameters
    {

        public RequestAuthUrlInternalParameters(IRequestAuthUrlParameters parameters, IAuthenticationRequest authRequest) : base(parameters)
        {
            this.AuthRequest = authRequest;
        }

        public IAuthenticationRequest AuthRequest { get; }
    }
}
