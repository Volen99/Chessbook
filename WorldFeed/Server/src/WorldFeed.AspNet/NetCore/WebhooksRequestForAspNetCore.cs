namespace WorldFeed.AspNet.NetCore
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;

    using WorldFeed.Common.Public.Models.Webhooks;
#if NETCOREAPP2_1
using Microsoft.AspNetCore.Http.Internal;
#endif

    public class WebhooksRequestForAspNetCore : IWebhooksRequest
    {
        private readonly HttpContext context;

        public WebhooksRequestForAspNetCore(HttpContext context)
        {
            this.context = context;
        }

        private string _body;

#pragma warning disable 1998
        public async Task<string> GetJsonFromBodyAsync()
#pragma warning restore 1998
        {
            if (_body == "")
            {
                return null;
            }

            if (_body != null)
            {
                return _body;
            }

#if NETCOREAPP2_1
            _context.Request.EnableRewind();
            _body = new StreamReader(_context.Request.Body).ReadToEnd();
#else
            this.context.Request.EnableBuffering();
            _body = await new StreamReader(this.context.Request.Body).ReadToEndAsync().ConfigureAwait(false);
#endif

            return _body;
        }

        public string GetPath()
        {
            return this.context.Request.Path.ToString();
        }

        public IDictionary<string, string[]> GetHeaders()
        {
            return this.context.Request.Headers.ToDictionary(x => x.Key.ToLowerInvariant(), x => x.Value.ToArray());
        }


        public IDictionary<string, string[]> GetQuery()
        {
            return this.context.Request.Query.ToDictionary(x => x.Key.ToLowerInvariant(), x => x.Value.ToArray());
        }

        public void SetResponseStatusCode(int statusCode)
        {
            this.context.Response.StatusCode = statusCode;
        }

        public Task WriteInResponseAsync(string content, string contentType)
        {
            this.context.Response.ContentType = contentType;
            return this.context.Response.WriteAsync(content);
        }
    }
}
