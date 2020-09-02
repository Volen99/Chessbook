namespace WorldFeed.AccountSettings.Client.Clients
{
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Webhooks;
    using WorldFeed.Common.Public.Parameters.AccountActivity;

    public class AccountActivityClient : IAccountActivityClient
    {
        private readonly IAccountActivityRequester accountActivityRequester;
        private readonly ITwitterClient client;

        public AccountActivityClient(IAccountActivityRequester accountActivityRequester, ITwitterClient client)
        {
            this.accountActivityRequester = accountActivityRequester;
            this.client = client;
        }

        public IAccountActivityClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public IAccountActivityRequestHandler CreateRequestHandler()
        {
            return this.client.CreateTwitterExecutionContext().Container.Resolve<IAccountActivityRequestHandler>();
        }

        public Task<IWebhook> CreateAccountActivityWebhookAsync(string environment, string webhookUrl)
        {
            return CreateAccountActivityWebhookAsync(new CreateAccountActivityWebhookParameters(environment, webhookUrl));
        }

        public async Task<IWebhook> CreateAccountActivityWebhookAsync(ICreateAccountActivityWebhookParameters parameters)
        {                                                                             // Use .ConfigureAwait(False) to prevent deadlock
            var twitterResult = await this.accountActivityRequester.CreateAccountActivityWebhookAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateWebhook(twitterResult?.Model);
        }

        public Task<IWebhookEnvironment[]> GetAccountActivityWebhookEnvironmentsAsync()
        {
            return GetAccountActivityWebhookEnvironmentsAsync(new GetAccountActivityWebhookEnvironmentsParameters());
        }

        public async Task<IWebhookEnvironment[]> GetAccountActivityWebhookEnvironmentsAsync(IGetAccountActivityWebhookEnvironmentsParameters parameters)
        {
            var twitterResult = await this.accountActivityRequester.GetAccountActivityWebhookEnvironmentsAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model?.Environments.Select(x => this.client.Factories.CreateWebhookEnvironment(x)).ToArray();
        }

        public Task<IWebhook[]> GetAccountActivityEnvironmentWebhooksAsync(string environment)
        {
            return GetAccountActivityEnvironmentWebhooksAsync(new GetAccountActivityEnvironmentWebhooksParameters(environment));
        }

        public async Task<IWebhook[]> GetAccountActivityEnvironmentWebhooksAsync(IGetAccountActivityEnvironmentWebhooksParameters parameters)
        {
            var twitterResult = await this.accountActivityRequester.GetAccountActivityEnvironmentWebhooksAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model?.Select(x => this.client.Factories.CreateWebhook(x)).ToArray();
        }

        public Task DeleteAccountActivityWebhookAsync(string environment, string webhookId)
        {
            return DeleteAccountActivityWebhookAsync(new DeleteAccountActivityWebhookParameters(environment, webhookId));
        }

        public Task DeleteAccountActivityWebhookAsync(string environment, IWebhook webhook)
        {
            return DeleteAccountActivityWebhookAsync(new DeleteAccountActivityWebhookParameters(environment, webhook.Id));
        }

        public Task DeleteAccountActivityWebhookAsync(IDeleteAccountActivityWebhookParameters parameters)
        {
            return this.accountActivityRequester.DeleteAccountActivityWebhookAsync(parameters);
        }

        public Task TriggerAccountActivityWebhookCRCAsync(string environment, string webhookId)
        {
            return TriggerAccountActivityWebhookCRCAsync(new TriggerAccountActivityWebhookCRCParameters(environment, webhookId));
        }

        public Task TriggerAccountActivityWebhookCRCAsync(ITriggerAccountActivityWebhookCRCParameters parameters)
        {
            return this.accountActivityRequester.TriggerAccountActivityWebhookCRCAsync(parameters);
        }

        public Task SubscribeToAccountActivityAsync(string environment)
        {
            return SubscribeToAccountActivityAsync(new SubscribeToAccountActivityParameters(environment));
        }

        public Task SubscribeToAccountActivityAsync(ISubscribeToAccountActivityParameters parameters)
        {
            return this.accountActivityRequester.SubscribeToAccountActivityAsync(parameters);
        }

        public Task<IWebhookSubscriptionsCount> CountAccountActivitySubscriptionsAsync()
        {
            return CountAccountActivitySubscriptionsAsync(new CountAccountActivitySubscriptionsParameters());
        }

        public async Task<IWebhookSubscriptionsCount> CountAccountActivitySubscriptionsAsync(ICountAccountActivitySubscriptionsParameters parameters)
        {
            var twitterResult = await this.accountActivityRequester.CountAccountActivitySubscriptionsAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Model;
        }

        public Task<bool> IsAccountSubscribedToAccountActivityAsync(string environment)
        {
            return IsAccountSubscribedToAccountActivityAsync(new IsAccountSubscribedToAccountActivityParameters(environment));
        }

        public async Task<bool> IsAccountSubscribedToAccountActivityAsync(IIsAccountSubscribedToAccountActivityParameters parameters)
        {
            try
            {
                var twitterResult = await this.accountActivityRequester.IsAccountSubscribedToAccountActivityAsync(parameters).ConfigureAwait(false);
                return twitterResult.Response.StatusCode == 204;
            }
            catch (TwitterException)
            {
                return false;
            }
        }

        public Task<IWebhookEnvironmentSubscriptions> GetAccountActivitySubscriptionsAsync(string environment)
        {
            return GetAccountActivitySubscriptionsAsync(new GetAccountActivitySubscriptionsParameters(environment));
        }

        public async Task<IWebhookEnvironmentSubscriptions> GetAccountActivitySubscriptionsAsync(IGetAccountActivitySubscriptionsParameters parameters)
        {
            var twitterResult = await this.accountActivityRequester.GetAccountActivitySubscriptionsAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateWebhookEnvironmentSubscriptions(twitterResult?.Model);
        }

        public Task UnsubscribeFromAccountActivityAsync(string environment, long userId)
        {
            return UnsubscribeFromAccountActivityAsync(new UnsubscribeFromAccountActivityParameters(environment, userId));
        }

        public Task UnsubscribeFromAccountActivityAsync(IUnsubscribeFromAccountActivityParameters parameters)
        {
            return this.accountActivityRequester.UnsubscribeFromAccountActivityAsync(parameters);
        }
    }
}
