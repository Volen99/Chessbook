namespace WorldFeed.AspNet.Core.Logic
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Models.Authentication;
    using WorldFeed.Common.Public.Models.Webhooks;

    public interface IWebhooksRoutes
    {
        Task<bool> TryToReplyToCrcChallengeAsync(IWebhooksRequest request, IConsumerOnlyCredentials credentials);
    }

    public class WebhooksRoutes : IWebhooksRoutes
    {
        private readonly IWebhooksHelper webhooksHelper;

        public WebhooksRoutes(IWebhooksHelper webhooksHelper)
        {
            this.webhooksHelper = webhooksHelper;
        }

        public async Task<bool> TryToReplyToCrcChallengeAsync(IWebhooksRequest request, IConsumerOnlyCredentials credentials)
        {
            var crcToken = request.GetQuery()["crc_token"];

            if (crcToken.IsNullOrEmpty())
            {
                return false;
            }

            await ReplyToCrcChallengeRequestAsync(crcToken[0], request, credentials).ConfigureAwait(false);

            return true;

        }

        private async Task ReplyToCrcChallengeRequestAsync(string crcToken, IWebhooksRequest request, IConsumerOnlyCredentials credentials)
        {
            var crcResponseInfo = this.webhooksHelper.CreateCrcResponseToken(crcToken, credentials.ConsumerSecret);

            await request.WriteInResponseAsync(crcResponseInfo.Json, crcResponseInfo.ContentType).ConfigureAwait(false);
        }
    }
}
