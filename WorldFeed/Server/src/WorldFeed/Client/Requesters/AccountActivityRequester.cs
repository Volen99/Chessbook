//namespace WorldFeed.Client.Requesters
//{
//    using System.Threading.Tasks;

//    using WorldFeed.Common.Client.Validators;
//    using WorldFeed.Common.Controllers;
//    using WorldFeed.Common.Events;
//    using WorldFeed.Common.Public;
//    using WorldFeed.Common.Public.Client.Requesters;
//    using WorldFeed.Common.Public.Models.Interfaces;
//    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;
//    using WorldFeed.Common.Public.Parameters.AccountActivity;
//    using WorldFeed.Common.Web;

//    public class AccountActivityRequester : BaseRequester, IAccountActivityRequester
//    {
//        private readonly IAccountActivityClientRequiredParametersValidator validator;
//        private readonly IAccountActivityController accountActivityController;

//        public AccountActivityRequester(
//            ITwitterClient client,
//            ITwitterClientEvents twitterClientEvents,
//            IAccountActivityClientRequiredParametersValidator validator,
//            IAccountActivityController accountActivityController)
//            : base(client, twitterClientEvents)
//        {
//            this.validator = validator;
//            this.accountActivityController = accountActivityController;
//        }

//        public Task<ITwitterResult<IWebhookDTO>> CreateAccountActivityWebhookAsync(ICreateAccountActivityWebhookParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.CreateAccountActivityWebhookAsync(parameters, request));
//        }

//        public Task<ITwitterResult<IGetAccountActivityWebhookEnvironmentsResultDTO>> GetAccountActivityWebhookEnvironmentsAsync(IGetAccountActivityWebhookEnvironmentsParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.GetAccountActivityWebhookEnvironmentsAsync(parameters, request));
//        }

//        public Task<ITwitterResult<IWebhookDTO[]>> GetAccountActivityEnvironmentWebhooksAsync(IGetAccountActivityEnvironmentWebhooksParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.GetAccountActivityEnvironmentWebhooksAsync(parameters, request));
//        }

//        public Task<ITwitterResult> DeleteAccountActivityWebhookAsync(IDeleteAccountActivityWebhookParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.DeleteAccountActivityWebhookAsync(parameters, request));
//        }

//        public Task<ITwitterResult> TriggerAccountActivityWebhookCRCAsync(ITriggerAccountActivityWebhookCRCParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.TriggerAccountActivityWebhookCRCAsync(parameters, request));
//        }

//        public Task<ITwitterResult> SubscribeToAccountActivityAsync(ISubscribeToAccountActivityParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.SubscribeToAccountActivityAsync(parameters, request));
//        }

//        public Task<ITwitterResult<IWebhookSubscriptionsCount>> CountAccountActivitySubscriptionsAsync(ICountAccountActivitySubscriptionsParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.CountAccountActivitySubscriptionsAsync(parameters, request));
//        }

//        public Task<ITwitterResult> IsAccountSubscribedToAccountActivityAsync(IIsAccountSubscribedToAccountActivityParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.IsAccountSubscribedToAccountActivityAsync(parameters, request));
//        }

//        public Task<ITwitterResult<IWebhookEnvironmentSubscriptionsDTO>> GetAccountActivitySubscriptionsAsync(IGetAccountActivitySubscriptionsParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.GetAccountActivitySubscriptionsAsync(parameters, request));
//        }

//        public Task<ITwitterResult> UnsubscribeFromAccountActivityAsync(IUnsubscribeFromAccountActivityParameters parameters)
//        {
//            this.validator.Validate(parameters);
//            return ExecuteRequestAsync(request => this.accountActivityController.UnsubscribeFromAccountActivityAsync(parameters, request));
//        }
//    }
//}