namespace WorldFeed.Common.Client.Validators
{
    using System;

    using WorldFeed.Common.Public.Parameters.TrendsClient;

    public interface ITrendsClientRequiredParametersValidator : ITrendsClientParametersValidator
    {
    }

    public class TrendsClientRequiredParametersValidator : ITrendsClientRequiredParametersValidator
    {
        public void Validate(IGetTrendsLocationCloseToParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetTrendsAtParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetTrendsLocationParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }
    }
}
