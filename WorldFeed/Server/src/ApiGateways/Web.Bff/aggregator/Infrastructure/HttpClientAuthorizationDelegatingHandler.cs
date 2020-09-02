namespace Web.Science.HttpAggregator.Infrastructure
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Http;

    public class HttpClientAuthorizationDelegatingHandler : DelegatingHandler
    {
        private readonly IHttpContextAccessor httpContextAccesor;

        public HttpClientAuthorizationDelegatingHandler(IHttpContextAccessor httpContextAccesor)
        {
            this.httpContextAccesor = httpContextAccesor;
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var authorizationHeader = this.httpContextAccesor.HttpContext.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(authorizationHeader) == false)
            {
                request.Headers.Add("Authorization", new List<string>() { authorizationHeader });
            }

            var token = await GetToken();

            if (token != null)
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }

            return await base.SendAsync(request, cancellationToken);
        }

        async Task<string> GetToken()
        {
            const string ACCESS_TOKEN = "access_token";

            return await this.httpContextAccesor.HttpContext.GetTokenAsync(ACCESS_TOKEN);
        }
    }
}
