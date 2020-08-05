namespace WorldFeed.Controllers.Auth
{
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Parameters.Auth;

    public class RequestAuthUrlInternalParameters : RequestUrlAuthUrlParameters
    {

        public RequestAuthUrlInternalParameters(IRequestAuthUrlParameters parameters, IAuthenticationRequest authRequest) : base(parameters)
        {
            this.AuthRequest = authRequest;
        }

        public IAuthenticationRequest AuthRequest { get; }
    }
}
