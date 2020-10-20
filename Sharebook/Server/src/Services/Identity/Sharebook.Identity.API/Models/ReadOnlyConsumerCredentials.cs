namespace Sharebook.Identity.API.Models
{
    using Sharebook.Identity.API.Auth.Authentication;
    using Sharebook.Identity.API.Helpers;

    /// <summary>
    /// Readonly version of consumer credentials
    /// </summary>
    public class ReadOnlyConsumerCredentials : IReadOnlyConsumerCredentials
    {
        /// <param name="consumerKey">Your application consumer key</param>
        /// <param name="consumerSecret">Your application consumer secret</param>
        public ReadOnlyConsumerCredentials(string consumerKey, string consumerSecret)
        {
            ConsumerKey = consumerKey;
            ConsumerSecret = consumerSecret;
        }

        /// <param name="consumerKey">Your application consumer key</param>
        /// <param name="consumerSecret">Your application consumer secret</param>
        /// <param name="bearerToken">Your application Bearer Token</param>
        public ReadOnlyConsumerCredentials(string consumerKey, string consumerSecret, string bearerToken)
        {
            ConsumerKey = consumerKey;
            ConsumerSecret = consumerSecret;
            BearerToken = bearerToken;
        }

        public ReadOnlyConsumerCredentials(IReadOnlyConsumerCredentials source)
        {
            ConsumerKey = source?.ConsumerKey;
            ConsumerSecret = source?.ConsumerSecret;
            BearerToken = source?.BearerToken;
        }

        /// <inheritdoc cref="IReadOnlyConsumerCredentialsWithoutBearer.ConsumerKey" />
        public string ConsumerKey { get; }
        /// <inheritdoc cref="IReadOnlyConsumerCredentialsWithoutBearer.ConsumerSecret" />
        public string ConsumerSecret { get; }
        /// <inheritdoc cref="IReadOnlyConsumerCredentials.BearerToken" />
        public string BearerToken { get; }

        public override bool Equals(object obj)
        {
            return GetHashCode() == obj?.GetHashCode();
        }

        public override int GetHashCode()
        {
            return CredentialsHashCodeGenerator.CreateHash(this).GetHashCode();
        }
    }
}
