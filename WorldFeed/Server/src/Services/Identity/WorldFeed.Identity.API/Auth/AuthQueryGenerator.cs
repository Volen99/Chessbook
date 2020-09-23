namespace WorldFeed.Identity.API.Auth
{
    using System.Text;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Parameters.Auth;
    using WorldFeed.Identity.API.Properties;

    public interface IAuthQueryGenerator
    {
        string GetCreateBearerTokenQuery(ICreateBearerTokenParameters parameters);

        string GetRequestAuthUrlQuery(IRequestAuthUrlParameters parameters);

        string GetRequestCredentialsQuery(IRequestCredentialsParameters parameters);

        string GetInvalidateBearerTokenQuery(IInvalidateBearerTokenParameters parameters);

        string GetInvalidateAccessTokenQuery(IInvalidateAccessTokenParameters parameters);
    }

    public class AuthQueryGenerator : IAuthQueryGenerator
    {
        public string GetCreateBearerTokenQuery(ICreateBearerTokenParameters parameters)
        {
            var query = new StringBuilder(Resources.Auth_CreateBearerToken);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetRequestAuthUrlQuery(IRequestAuthUrlParameters parameters)
        {
            var query = new StringBuilder(Resources.Auth_RequestToken);

            if (parameters.AuthAccessType != null)
            {
                var paramValue = parameters.AuthAccessType == AuthAccessType.ReadWrite ? "write" : "read";
                query.AddParameterToQuery("x_auth_access_type", paramValue);
            }

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetRequestCredentialsQuery(IRequestCredentialsParameters parameters)
        {
            var query = new StringBuilder(Resources.Auth_RequestAccessToken);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetInvalidateBearerTokenQuery(IInvalidateBearerTokenParameters parameters)
        {
            var query = new StringBuilder(Resources.Auth_InvalidateBearerToken);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetInvalidateAccessTokenQuery(IInvalidateAccessTokenParameters parameters)
        {
            var query = new StringBuilder(Resources.Auth_InvalidateAccessToken);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }
    }
}
