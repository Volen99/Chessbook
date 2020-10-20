//namespace WorldFeed.Common.Controllers
//{
//    using System.Threading.Tasks;

//    using WorldFeed.Common.Public.Models.Interfaces;
//    using WorldFeed.Common.Public.Models.Interfaces.DTO.Webhooks;
//    using WorldFeed.Common.Public.Parameters.AccountActivity;
//    using WorldFeed.Common.Web;

//    public interface IAccountActivityController
//    {
//        //Task<ITwitterResult<IWebhookDTO>> CreateAccountActivityWebhookAsync(ICreateAccountActivityWebhookParameters parameters, ITwitterRequest request);

//        //Task<ITwitterResult<IGetAccountActivityWebhookEnvironmentsResultDTO>> GetAccountActivityWebhookEnvironmentsAsync(IGetAccountActivityWebhookEnvironmentsParameters parameters, ITwitterRequest request);

//        //Task<ITwitterResult<IWebhookDTO[]>> GetAccountActivityEnvironmentWebhooksAsync(IGetAccountActivityEnvironmentWebhooksParameters parameters, ITwitterRequest request);

//        //Task<ITwitterResult> DeleteAccountActivityWebhookAsync(IDeleteAccountActivityWebhookParameters parameters, ITwitterRequest request);

//        //Task<ITwitterResult> TriggerAccountActivityWebhookCRCAsync(ITriggerAccountActivityWebhookCRCParameters parameters, ITwitterRequest request);

//        Task<ITwitterResult<IWebhookEnvironmentSubscriptionsDTO>> GetAccountActivitySubscriptionsAsync(IGetAccountActivitySubscriptionsParameters parameters, ITwitterRequest request);

//        Task<ITwitterResult<IWebhookSubscriptionsCount>> CountAccountActivitySubscriptionsAsync(ICountAccountActivitySubscriptionsParameters parameters, ITwitterRequest request);

//        //Task<ITwitterResult> SubscribeToAccountActivityAsync(ISubscribeToAccountActivityParameters parameters, ITwitterRequest request);

//        //Task<ITwitterResult> IsAccountSubscribedToAccountActivityAsync(IIsAccountSubscribedToAccountActivityParameters parameters, ITwitterRequest request);

//        //Task<ITwitterResult> UnsubscribeFromAccountActivityAsync(IUnsubscribeFromAccountActivityParameters parameters, ITwitterRequest request);
//    }
//}
