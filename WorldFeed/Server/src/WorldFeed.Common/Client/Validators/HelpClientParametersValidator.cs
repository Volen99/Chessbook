//namespace WorldFeed.Common.Client.Validators
//{
//    using WorldFeed.Common.Public.Parameters.HelpClient;

//    public interface IHelpClientParametersValidator
//    {
//        void Validate(IGetRateLimitsParameters parameters);

//        void Validate(IGetTwitterConfigurationParameters parameters);

//        void Validate(IGetSupportedLanguagesParameters parameters);

//        void Validate(IGetPlaceParameters parameters);

//        void Validate(IGeoSearchParameters parameters);

//        void Validate(IGeoSearchReverseParameters parameters);
//    }

//    public class HelpClientParametersValidator : IHelpClientParametersValidator
//    {
//        private readonly IHelpClientRequiredParametersValidator helpClientRequiredParametersValidator;

//        public HelpClientParametersValidator(IHelpClientRequiredParametersValidator helpClientRequiredParametersValidator)
//        {
//            this.helpClientRequiredParametersValidator = helpClientRequiredParametersValidator;
//        }

//        public void Validate(IGetRateLimitsParameters parameters)
//        {
//            this.helpClientRequiredParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetTwitterConfigurationParameters parameters)
//        {
//            this.helpClientRequiredParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetSupportedLanguagesParameters parameters)
//        {
//            this.helpClientRequiredParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGetPlaceParameters parameters)
//        {
//            this.helpClientRequiredParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGeoSearchParameters parameters)
//        {
//            this.helpClientRequiredParametersValidator.Validate(parameters);
//        }

//        public void Validate(IGeoSearchReverseParameters parameters)
//        {
//            this.helpClientRequiredParametersValidator.Validate(parameters);
//        }
//    }
//}
