using System;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Abuse;
using Chessbook.Services.Abuses;
using Chessbook.Services.Data.Services;
using Chessbook.Web.Api.Models.Abuses;
using Nop.Web.Areas.Admin.Models.Customers;

namespace Chessbook.Web.Api.Factories
{
    public class AbuseModelFactory : IAbuseModelFactory
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IAbuseService abuseService;

        public AbuseModelFactory(IUserService userService, IUserModelFactory userModelFactory, IAbuseService abuseService)
        {
            this.userService = userService;
            this.userModelFactory = userModelFactory;
            this.abuseService = abuseService;
        }

        public async Task<AbuseModel> PrepareAbuseModel(Abuse abuse)
        {
            if (abuse == null)
            {
                throw new ArgumentNullException(nameof(abuse));
            }

            var model = new AbuseModel
            {
                Id = abuse.Id,
                Reason = abuse.Reason,
                PredefinedReasons = this.abuseService.ParsePredefinedReasonsIds(abuse).Select(id => (AbusePredefinedReasons)id).Select(x => x.ToString()).ToList(),
                State = new StateModel
                {
                    Id = (int)abuse.State,
                    Label = "string",
                },
                ModerationComment = abuse.ModerationComment,
                CreatedAt = abuse.CreatedAt,
            };

            if (abuse.ReporterAccountId.HasValue)
            {
                var reporterAccount = await this.userService.GetCustomerByIdAsync(abuse.ReporterAccountId.Value);
                var reporterAccountModel = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), reporterAccount);

                model.ReporterAccount = reporterAccountModel;

                if (abuse.FlaggedAccountId.HasValue)
                {
                    var flaggedAccount = await this.userService.GetCustomerByIdAsync(abuse.FlaggedAccountId.Value);
                    var flaggedAccountModel = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), flaggedAccount);

                    model.FlaggedAccount = flaggedAccountModel;
                }
            }

            return model;
        }
    }
}
