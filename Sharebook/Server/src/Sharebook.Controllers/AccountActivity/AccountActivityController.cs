//namespace WorldFeed.Controllers
//{
//    using System.Threading.Tasks;

//    using WorldFeed.Common.Controllers;
//    using WorldFeed.Common.Public.Models.Authentication;
//    using WorldFeed.Common.Public.Models.Enums;
//    using WorldFeed.Common.Public.Models.Interfaces;
//    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;
//    using WorldFeed.Common.Public.Parameters.AccountActivity;
//    using WorldFeed.Common.Web;

//    // Account Activities let you track actions performed by a user in live.
//    // For example Account Activity will trigger an event when a user publishes a tweet, reads a message, likes a tweet…
//    public class AccountActivityController : IAccountActivityController
//    {
//        private readonly ITwitterAccessor twitterAccessor;
//        private readonly IAccountActivityQueryGenerator accountActivityQueryGenerator;

//        public AccountActivityController(ITwitterAccessor twitterAccessor, IAccountActivityQueryGenerator accountActivityQueryGenerator)
//        {
//            this.twitterAccessor = twitterAccessor;
//            this.accountActivityQueryGenerator = accountActivityQueryGenerator;
//        }

//        public Task<ITwitterResult<IWebhookDTO>> CreateAccountActivityWebhookAsync(ICreateAccountActivityWebhookParameters parameters, ITwitterRequest request)
//        {
//            request.Query.Url = this.accountActivityQueryGenerator.GetCreateAccountActivityWebhookQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.POST;
//            return this.twitterAccessor.ExecuteRequestAsync<IWebhookDTO>(request);
//        }

//        public Task<ITwitterResult<IGetAccountActivityWebhookEnvironmentsResultDTO>> GetAccountActivityWebhookEnvironmentsAsync(IGetAccountActivityWebhookEnvironmentsParameters parameters, ITwitterRequest request)
//        {
//            var consumerCredentials = new ConsumerOnlyCredentials(request.Query.TwitterCredentials);

//            request.Query.Url = this.accountActivityQueryGenerator.GetAccountActivityWebhookEnvironmentsQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.GET;
//            request.Query.TwitterCredentials = new TwitterCredentials(consumerCredentials);

//            return this.twitterAccessor.ExecuteRequestAsync<IGetAccountActivityWebhookEnvironmentsResultDTO>(request);
//        }

//        public Task<ITwitterResult<IWebhookDTO[]>> GetAccountActivityEnvironmentWebhooksAsync(IGetAccountActivityEnvironmentWebhooksParameters parameters, ITwitterRequest request)
//        {
//            var consumerCredentials = new ConsumerOnlyCredentials(request.Query.TwitterCredentials);

//            request.Query.Url = this.accountActivityQueryGenerator.GetAccountActivityEnvironmentWebhooksQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.GET;
//            request.Query.TwitterCredentials = new TwitterCredentials(consumerCredentials);

//            return this.twitterAccessor.ExecuteRequestAsync<IWebhookDTO[]>(request);
//        }

//        public Task<ITwitterResult> DeleteAccountActivityWebhookAsync(IDeleteAccountActivityWebhookParameters parameters, ITwitterRequest request)
//        {
//            request.Query.Url = this.accountActivityQueryGenerator.GetDeleteAccountActivityWebhookQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.DELETE;
//            return this.twitterAccessor.ExecuteRequestAsync(request);
//        }

//        public Task<ITwitterResult> TriggerAccountActivityWebhookCRCAsync(ITriggerAccountActivityWebhookCRCParameters parameters, ITwitterRequest request)
//        {
//            request.Query.Url = this.accountActivityQueryGenerator.GetTriggerAccountActivityWebhookCRCQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.PUT;
//            return this.twitterAccessor.ExecuteRequestAsync(request);
//        }

//        public Task<ITwitterResult> SubscribeToAccountActivityAsync(ISubscribeToAccountActivityParameters parameters, ITwitterRequest request)
//        {
//            request.Query.Url = this.accountActivityQueryGenerator.GetSubscribeToAccountActivityQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.POST;
//            return this.twitterAccessor.ExecuteRequestAsync(request);
//        }

//        public Task<ITwitterResult> UnsubscribeFromAccountActivityAsync(IUnsubscribeFromAccountActivityParameters parameters, ITwitterRequest request)
//        {
//            var consumerCredentials = new ConsumerOnlyCredentials(request.Query.TwitterCredentials);

//            request.Query.Url = this.accountActivityQueryGenerator.GetUnsubscribeToAccountActivityQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.DELETE;
//            request.Query.TwitterCredentials = new TwitterCredentials(consumerCredentials);

//            return this.twitterAccessor.ExecuteRequestAsync(request);
//        }

//        public Task<ITwitterResult<IWebhookSubscriptionsCount>> CountAccountActivitySubscriptionsAsync(ICountAccountActivitySubscriptionsParameters parameters, ITwitterRequest request)
//        {
//            var consumerCredentials = new ConsumerOnlyCredentials(request.Query.TwitterCredentials);

//            request.Query.Url = this.accountActivityQueryGenerator.GetCountAccountActivitySubscriptionsQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.GET;
//            request.Query.TwitterCredentials = new TwitterCredentials(consumerCredentials);

//            return this.twitterAccessor.ExecuteRequestAsync<IWebhookSubscriptionsCount>(request);
//        }

//        public Task<ITwitterResult> IsAccountSubscribedToAccountActivityAsync(IIsAccountSubscribedToAccountActivityParameters parameters, ITwitterRequest request)
//        {
//            request.Query.Url = this.accountActivityQueryGenerator.GetIsAccountSubscribedToAccountActivityQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.GET;
//            return this.twitterAccessor.ExecuteRequestAsync(request);
//        }

//        public Task<ITwitterResult<IWebhookEnvironmentSubscriptionsDTO>> GetAccountActivitySubscriptionsAsync(IGetAccountActivitySubscriptionsParameters parameters, ITwitterRequest request)
//        {
//            var consumerCredentials = new ConsumerOnlyCredentials(request.Query.TwitterCredentials);

//            request.Query.Url = this.accountActivityQueryGenerator.GetAccountActivitySubscriptionsQuery(parameters);
//            request.Query.HttpMethod = HttpMethod.GET;
//            request.Query.TwitterCredentials = new TwitterCredentials(consumerCredentials);

//            return this.twitterAccessor.ExecuteRequestAsync<IWebhookEnvironmentSubscriptionsDTO>(request);
//        }
//    }
//}
