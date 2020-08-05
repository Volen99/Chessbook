namespace WorldFeed.Common.Public.Parameters.AccountActivity
{
    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/api-reference/aaa-premium#post-account-activity-all-env-name-webhooks
    /// </summary>
    public interface ICreateAccountActivityWebhookParameters : ICustomRequestParameters
    {
        /// <summary>
        /// The environment used to register the webhook
        /// </summary>
        string Environment { get; set; }

        /// <summary>
        /// URL for the callback endpoint.
        /// </summary>
        string WebhookUrl { get; set; }
    }

    /// <inheritdoc/>
    public class CreateAccountActivityWebhookParameters : CustomRequestParameters, ICreateAccountActivityWebhookParameters
    {
        public CreateAccountActivityWebhookParameters(string environment, string callbackUrl)
        {
            Environment = environment;
            WebhookUrl = callbackUrl;
        }

        /// <inheritdoc/>
        public string Environment { get; set; }
        /// <inheritdoc/>
        public string WebhookUrl { get; set; }
    }
}
