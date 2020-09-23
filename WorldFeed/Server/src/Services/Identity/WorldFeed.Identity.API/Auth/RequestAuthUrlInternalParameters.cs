namespace WorldFeed.Identity.API.Auth
{
    using WorldFeed.Common.Public.Parameters.Auth;
    using WorldFeed.Identity.API.Models.Authentication;

    public class RequestAuthUrlInternalParameters : RequestUrlAuthUrlParameters
    {

        public RequestAuthUrlInternalParameters(IRequestAuthUrlParameters parameters, IAuthenticationRequest authRequest) : base(parameters)
        {
            this.AuthRequest = authRequest;
        }

        public IAuthenticationRequest AuthRequest { get; }
    }
}
