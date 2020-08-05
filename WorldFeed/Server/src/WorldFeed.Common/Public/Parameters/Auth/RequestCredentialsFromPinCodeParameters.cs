namespace WorldFeed.Common.Public.Parameters.Auth
{
    using WorldFeed.Common.Public.Models.Authentication;

    public interface IRequestCredentialsFromPinCodeParameters
    {
        /// <summary>
        /// PinCode entered by the user
        /// </summary>
        string PinCode { get; set; }

        /// <summary>
        /// Token returned by the AuthenticationContext when
        /// </summary>
        IAuthenticationRequest AuthRequest { get; set; }
    }

    public class RequestCredentialsFromPinCodeParameters : IRequestCredentialsFromPinCodeParameters
    {

        public string PinCode { get; set; }
        public IAuthenticationRequest AuthRequest { get; set; }
    }
}
