namespace WorldFeed.Trend.Client.Validators
{
    using WorldFeed.Trend.Application.Parameters;

    public interface ITrendsClientParametersValidator
    {
        void Validate(IGetTrendsLocationCloseToParameters parameters);

        void Validate(IGetTrendsAtParameters parameters);

        void Validate(IGetTrendsLocationParameters parameters);
    }

    public class TrendsClientParametersValidator : ITrendsClientParametersValidator
    {
        private readonly ITrendsClientRequiredParametersValidator requiredParametersValidator;

        public TrendsClientParametersValidator(ITrendsClientRequiredParametersValidator requiredParametersValidator)
        {
            this.requiredParametersValidator = requiredParametersValidator;
        }

        public void Validate(IGetTrendsLocationCloseToParameters parameters)
        {
            this.requiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetTrendsAtParameters parameters)
        {
            this.requiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetTrendsLocationParameters parameters)
        {
            this.requiredParametersValidator.Validate(parameters);
        }
    }
}