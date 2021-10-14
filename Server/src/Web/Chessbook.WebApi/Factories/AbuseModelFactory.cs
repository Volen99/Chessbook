using System;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Abuse;
using Chessbook.Services.Abuses;
using Chessbook.Services;
using Chessbook.Web.Api.Models.Abuses;
using Chessbook.Services.Helpers;
using Chessbook.Web.Areas.Admin.Models.Customers;

namespace Chessbook.Web.Api.Factories
{
    public class AbuseModelFactory : IAbuseModelFactory
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IAbuseService abuseService;
        private readonly IDateTimeHelper dateTimeHelper;

        public AbuseModelFactory(IUserService userService, IUserModelFactory userModelFactory, IAbuseService abuseService,
            IDateTimeHelper dateTimeHelper)
        {
            this.userService = userService;
            this.userModelFactory = userModelFactory;
            this.abuseService = abuseService;
            this.dateTimeHelper = dateTimeHelper;
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
                CreatedAt = await this.dateTimeHelper.ConvertToUserTimeAsync(abuse.CreatedAt, DateTimeKind.Utc),
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
