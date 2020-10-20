namespace Sharebook.Trend.Client.Requesters
{
    using System.Threading.Tasks;
    s
    using Sharebook.Client;
    using Sharebook.Common.Client.Validators;
    using Sharebook.Common.Events;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Core.Controllers;
    using Sharebook.Trend.Application.Parameters;

    public class TrendsRequester : BaseRequester, ITrendsRequester
    {
        private readonly ITrendsController trendsController;
        private readonly ITrendsClientRequiredParametersValidator trendsClientRequiredParametersValidator;

        public TrendsRequester(ITrendsController trendsController, ITrendsClientRequiredParametersValidator trendsClientRequiredParametersValidator,
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