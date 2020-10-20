namespace Sharebook.AspNet.Core.Logic
{
    using System;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Threading.Tasks;
    using Newtonsoft.Json;

    using Sharebook.AspNet.Core.Models;
    using Sharebook.Common.Public.Models.Webhooks;
    using Sharebook.Common.Wrappers;

    public interface IWebhooksHelper
    {
        CrcResponseTokenInfo CreateCrcResponseToken(string message, string secret);
        bool IsCrcChallenge(IWebhooksRequestInfoRetriever request);
        Task<bool> IsRequestManagedByTweetinviAsync(IWebhooksRequest request);
    }

    public class WebhooksHelper : IWebhooksHelper
    {
        private readonly IJObjectStaticWrapper jObjectStaticWrapper;

        public WebhooksHelper(IJObjectStaticWrapper jObjectStaticWrapper)
        {
            this.jObjectStaticWrapper = jObjectStaticWrapper;
        }

        public async Task<bool> IsRequestManagedByTweetinviAsync(IWebhooksRequest request)
        {
            var isRequestComingFromTwitter = IsRequestComingFromTwitter(request);
            if (!isRequestComingFromTwitter)
            {
                return false;
            }

            var body = await request.GetJsonFromBodyAsync().ConfigureAwait(false);

            if (body != null)
            {
                var jsonObjectEvent = this.jObjectStaticWrapper.GetJobjectFromJson(body);
                // Note that every webhook event includes a for_user_id user ID that indicates which subscription the event was delivered for
                var isAccountActivityRequest = jsonObjectEvent?.ContainsKey("for_user_id");

                if (isAccountActivityRequest == true)
                {
                    return true;
                }
            }

            return IsCrcChallenge(request);
        }

        private static bool IsRequestComingFromTwitter(IWebhooksRequestInfoRetriever request)
        {
            if (request.GetHeaders().ContainsKey("x-twitter-webhooks-signature") == false)
            {
                return false;
            }

            // TODO Additional logic to ensure the request comes from Twitter
            // described here : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/guides/securing-webhooks

            return true;
        }

        public bool IsCrcChallenge(IWebhooksRequestInfoRetriever request)
        {
            if (!request.GetQuery().TryGetValue("crc_token", out var crcToken))
            {
                return false;
            }

            return crcToken.Any();
        }

        public CrcResponseTokenInfo CreateCrcResponseToken(string message, string secret)
        {
            var encoding = new System.Text.ASCIIEncoding();
            var keyBytes = encoding.GetBytes(secret);
            var messageBytes = encoding.GetBytes(message);

            using (var hmacsha256 = new HMACSHA256(keyBytes))
            {
                var hashmessage = hmacsha256.ComputeHash(messageBytes);
                var crcResponseToken = Convert.ToBase64String(hashmessage);

                var response = new
                {
                    response_token = $"sha256={crcResponseToken}"
                };

                var crcResponseJson = JsonConvert.SerializeObject(response);

                return new CrcResponseTokenInfo
                {
                   Json = crcResponseJson,
                   CrcResponseToken = crcResponseToken
                };
            }
        }
    }
}
