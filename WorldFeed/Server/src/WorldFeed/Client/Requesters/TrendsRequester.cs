namespace WorldFeed.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.TrendsClient;
    using WorldFeed.Common.Web;
    using WorldFeed.Core.Controllers;

    public class TrendsRequester : BaseRequester, ITrendsRequester
    {
        private readonly ITrendsController trendsController;
        private readonly ITrendsClientRequiredParametersValidator trendsClientRequiredParametersValidator;

        public TrendsRequester(
            ITrendsController trendsController,
            ITrendsClientRequiredParametersValidator trendsClientRequiredParametersValidator,
            ITwitterClient client,
            ITwitterClientEvents twitterClientEvents)
            : base(client, twitterClientEvents)
        {
            this.trendsController = trendsController;
            this.trendsClientRequiredParametersValidator = trendsClientRequiredParametersValidator;
        }

        public Task<ITwitterResult<IGetTrendsAtResult[]>> GetPlaceTrendsAtAsync(IGetTrendsAtParameters parameters)
        {
            this.trendsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.trendsController.GetPlaceTrendsAtAsync(parameters, request));
        }

        public Task<ITwitterResult<ITrendLocation[]>> GetTrendLocationsAsync(IGetTrendsLocationParameters parameters)
        {
            this.trendsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.trendsController.GetTrendLocationsAsync(parameters, request));
        }

        public Task<ITwitterResult<ITrendLocation[]>> GetTrendsLocationCloseToAsync(IGetTrendsLocationCloseToParameters parameters)
        {
            this.trendsClientRequiredParametersValidator.Validate(parameters);
            return ExecuteRequestAsync(request => this.trendsController.GetTrendsLocationCloseToAsync(parameters, request));
        }
    }
}