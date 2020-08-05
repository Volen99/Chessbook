namespace WorldFeed.Common.Client.Validators
{
    using System;

    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;

    public interface IAccountSettingsClientRequiredParametersValidator : IAccountSettingsClientParametersValidator
    {
    }

    public class AccountSettingsClientRequiredParametersValidator : IAccountSettingsClientRequiredParametersValidator
    {
        public void Validate(IGetAccountSettingsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IUpdateAccountSettingsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IUpdateProfileParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IUpdateProfileImageParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.Binary == null)
            {
                throw new ArgumentNullException($"{nameof(parameters.Binary)}");
            }
        }

        public void Validate(IUpdateProfileBannerParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.Binary == null)
            {
                throw new ArgumentNullException($"{nameof(parameters.Binary)}");
            }
        }

        public void Validate(IRemoveProfileBannerParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }
    }
}
