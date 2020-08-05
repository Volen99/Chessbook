namespace WorldFeed.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Controllers;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.HelpClient;
    using WorldFeed.Common.Web;

    public class HelpRequester : BaseRequester, IHelpRequester
    {
        private readonly IHelpController helpController;
        private readonly IHelpClientRequiredParametersValidator validator;

        public HelpRequester(
            ITwitterClient client,
            ITwitterClientEvents clientEvents,
            IHelpController helpController,
            IHelpClientRequiredParametersValidator validator)
        : base(client, clientEvents)
        {
            this.helpController = helpController;
            this.validator = validator;
        }

        public Task<ITwitterResult<CredentialsRateLimitsDTO>> GetRateLimitsAsync(IGetRateLimitsParameters parameters)
        {
            this.validator.Validate(parameters);

            return ExecuteRequestAsync(request =>
            {
                if (parameters.TrackerMode != null)
                {
                    request.ExecutionContext.RateLimitTrackerMode = parameters.TrackerMode.Value;
                }

                return this.helpController.GetRateLimitsAsync(parameters, request);
            });
        }

        public Task<ITwitterResult<ITwitterConfiguration>> GetTwitterConfigurationAsync(IGetTwitterConfigurationParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.helpController.GetTwitterConfigurationAsync(parameters, request));
        }

        public Task<ITwitterResult<SupportedLanguage[]>> GetSupportedLanguagesAsync(IGetSupportedLanguagesParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.helpController.GetSupportedLanguagesAsync(parameters, request));
        }

        public Task<ITwitterResult<IPlace>> GetPlaceAsync(IGetPlaceParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.helpController.GetPlaceAsync(parameters, request));
        }

        public Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoAsync(IGeoSearchParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.helpController.SearchGeoAsync(parameters, request));
        }

        public Task<ITwitterResult<SearchGeoSearchResultDTO>> SearchGeoReverseAsync(IGeoSearchReverseParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.helpController.SearchGeoReverseAsync(parameters, request));
        }
    }
}