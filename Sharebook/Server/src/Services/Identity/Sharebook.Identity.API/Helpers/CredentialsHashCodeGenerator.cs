﻿namespace Sharebook.Identity.API.Helpers
{
    using Sharebook.Identity.API.Auth.Authentication;

    public static class CredentialsHashCodeGenerator
    {
        public static string CreateHash(IReadOnlyTwitterCredentials credentials)
        {
            var hash = $"{credentials.ConsumerKey} - {credentials.ConsumerSecret} - {credentials.BearerToken}";
            return $"{hash} - {credentials.AccessToken}  - {credentials.AccessTokenSecret}";
        }

        public static string CreateHash(IReadOnlyConsumerCredentials credentials)
        {
            if (credentials is IReadOnlyTwitterCredentials twitterCredentials)
            {
                return CreateHash(twitterCredentials);
            }

            return $"{credentials.ConsumerKey} - {credentials.ConsumerSecret} - {credentials.BearerToken}";
        }
    }
}
