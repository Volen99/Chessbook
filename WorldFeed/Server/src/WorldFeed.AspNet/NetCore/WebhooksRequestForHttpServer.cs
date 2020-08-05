namespace WorldFeed.AspNet.NetCore
{
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;

    using WorldFeed.Common.Public.Models.Webhooks;

    public class WebhooksRequestForHttpServer : IWebhooksRequest
    {
        private readonly HttpListenerContext context;

        public WebhooksRequestForHttpServer(HttpListenerContext context)
        {
            this.context = context;
        }

        public string GetPath()
        {
            var path = PathString.FromUriComponent(this.context.Request.Url);
            return path.ToString();
        }

        public IDictionary<string, string[]> GetQuery()
        {
            var parameters = this.context.Request.QueryString;
            var result = new Dictionary<string, string[]>();

            foreach (string name in parameters)
            {
                result.Add(name, new[] { parameters[name] });
            }

            return result;
        }

        public IDictionary<string, string[]> GetHeaders()
        {
            var headers = this.context.Request.Headers;
            var result = new Dictionary<string, string[]>();

            foreach (string headerName in headers)
            {
                result.Add(headerName.ToLowerInvariant(), new []{ headers[headerName]});
            }

            return result;
        }

        private string _body;
        public Task<string> GetJsonFromBodyAsync()
        {
            if (_body != null)
            {
                return Task.FromResult(_body);
            }

            if (!this.context.Request.HasEntityBody)
            {
                return Task.FromResult(null as string);
            }

            using (var bodyStream = this.context.Request.InputStream)
            {
                using (var bodyReader = new StreamReader(bodyStream, this.context.Request.ContentEncoding))
                {
                    _body = bodyReader.ReadToEnd();
                    return Task.FromResult(_body);
                }
            }
        }

        public void SetResponseStatusCode(int statusCode)
        {
            this.context.Response.StatusCode = statusCode;
        }

        public async Task WriteInResponseAsync(string content, string contentType)
        {
            this.context.Response.ContentType = contentType;

            var streamWriter = new StreamWriter(this.context.Response.OutputStream);
            await streamWriter.WriteAsync(content).ConfigureAwait(false);
            await streamWriter.FlushAsync().ConfigureAwait(false);
            this.context.Response.Close();
        }
    }
}
