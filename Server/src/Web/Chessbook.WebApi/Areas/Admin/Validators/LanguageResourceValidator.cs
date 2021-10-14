using FluentValidation;
using Chessbook.Core.Domain.Localization;
using Chessbook.Data;
using Chessbook.Services.Localization;
using Chessbook.Web.Areas.Admin.Models.Localization;
using Chessbook.Web.Framework.Validators;

namespace Chessbook.Web.Areas.Admin.Validators.Localization
{
    public partial class LanguageResourceValidator : BaseNopValidator<LocaleResourceModel>
    {
        public LanguageResourceValidator(INopDataProvider dataProvider)
        {
            //if validation without this set rule is applied, in this case nothing will be validated
            //it's used to prevent auto-validation of child models
            RuleSet(NopValidationDefaults.ValidationRuleSet, () =>
            {
                RuleFor(model => model.ResourceName)
                    .NotEmpty();
                // .WithMessageAwait(localizationService.GetResourceAsync("Admin.Configuration.Languages.Resources.Fields.Name.Required"));

                RuleFor(model => model.ResourceValue)
                    .NotEmpty();
                    //.WithMessageAwait(localizationService.GetResourceAsync("Admin.Configuration.Languages.Resources.Fields.Value.Required"));

                SetDatabaseValidationRules<LocaleStringResource>(dataProvider);
            });
        }
    }
}
