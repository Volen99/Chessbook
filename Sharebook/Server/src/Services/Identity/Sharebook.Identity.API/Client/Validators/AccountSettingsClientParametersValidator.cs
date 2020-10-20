namespace Sharebook.Identity.API.Client.Validators
{
    using System;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.Settings;
    using Sharebook.Identity.API.Application.Parameters;

    public interface IAccountSettingsClientParametersValidator
    {
        void Validate(IGetAccountSettingsParameters parameters);

        void Validate(IUpdateAccountSettingsParameters parameters);

        void Validate(IUpdateProfileParameters parameters);

        void Validate(IUpdateProfileImageParameters parameters);

        void Validate(IUpdateProfileBannerParameters parameters);

        void Validate(IRemoveProfileBannerParameters parameters);
    }

    public class AccountSettingsClientParametersValidator : IAccountSettingsClientParametersValidator
    {
        private readonly IAccountSettingsClientRequiredParametersValidator accountSettingsClientRequiredParametersValidator;
        private readonly ITwitterClient client;

        public AccountSettingsClientParametersValidator(ITwitterClient client, IAccountSettingsClientRequiredParametersValidator accountSettingsClientRequiredParametersValidator)
        {
            this.client = client;
            this.accountSettingsClientRequiredParametersValidator = accountSettingsClientRequiredParametersValidator;
        }

        private WorldFeedLimits Limits => this.client.Config.Limits;

        public void Validate(IGetAccountSettingsParameters parameters)
        {
            this.accountSettingsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IUpdateAccountSettingsParameters parameters)
        {
            this.accountSettingsClientRequiredParametersValidator.Validate(parameters);

            if (!parameters.DisplayLanguage.IsADisplayLanguage())
            {
                throw new ArgumentException("As of 2019-10-06 this language is not supported by Twitter", $"{nameof(parameters.DisplayLanguage)}");
            }
        }

        public void Validate(IUpdateProfileParameters parameters)
        {
            this.accountSettingsClientRequiredParametersValidator.Validate(parameters);

            ThrowIfParameterSizeIsInvalid(parameters.Name, $"{nameof(parameters.Name)}", Limits.ACCOUNT_SETTINGS_PROFILE_NAME_MAX_LENGTH);
            ThrowIfParameterSizeIsInvalid(parameters.Description, $"{nameof(parameters.Description)}", Limits.ACCOUNT_SETTINGS_PROFILE_DESCRIPTION_MAX_LENGTH);
            ThrowIfParameterSizeIsInvalid(parameters.Location, $"{nameof(parameters.Location)}", Limits.ACCOUNT_SETTINGS_PROFILE_LOCATION_MAX_LENGTH);
            ThrowIfParameterSizeIsInvalid(parameters.WebsiteUrl, $"{nameof(parameters.WebsiteUrl)}", Limits.ACCOUNT_SETTINGS_PROFILE_WEBSITE_URL_MAX_LENGTH);
        }

        public void Validate(IUpdateProfileImageParameters parameters)
        {
            this.accountSettingsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IUpdateProfileBannerParameters parameters)
        {
            this.accountSettingsClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IRemoveProfileBannerParameters parameters)
        {
            this.accountSettingsClientRequiredParametersValidator.Validate(parameters);
        }

        // ReSharper disable once ParameterOnlyUsedForPreconditionCheck.Local
        private static void ThrowIfParameterSizeIsInvalid(string value, string parameterName, int maxSize)
        {
            if (value != null && value.Length > maxSize)
            {
                throw new ArgumentException($"{parameterName} cannot contain more than {maxSize} characters.", parameterName);
            }
        }
    }
}
