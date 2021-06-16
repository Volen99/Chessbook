using Chessbook.Core.Domain.Abuse;
using Chessbook.Services.Abuses;
using Chessbook.Services.Data.Services;
using Chessbook.Web.Api.Areas.Admin.Web.Models;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Api.Models.Abuses;
using Chessbook.Web.Models.Inputs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("admin/abuses")]
    public class AbusesController : BaseAdminController
    {
        private readonly IUserService userService;
        private readonly IAbuseService abuseService;
        private readonly IAbuseModelFactory abuseModelFactory;

        public AbusesController(IUserService userService, IAbuseService abuseService, IAbuseModelFactory abuseModelFactory)
        {
            this.userService = userService;
            this.abuseService = abuseService;
            this.abuseModelFactory = abuseModelFactory;
        }

        [HttpGet]
        public async Task<IActionResult> ListAbuses([FromQuery] QueryListAbusesAdminModel input)
        {
            var abuses = await this.abuseService.ListAbusesForAdmins(input.Start, input.Count, input.Sort, input.Filter, input.Id, input.Id,
                input.PredefinedReasons, input.AbuseState, input.VideoIs, input.Search, input.SearchReporter, input.SearchReportee, input.SearchVideo);

            if (abuses.TotalCount > 0)
            {
                var models = new List<AbuseModel>();
                foreach (var abuse in abuses)
                {
                    models.Add(await this.abuseModelFactory.PrepareAbuseModel(abuse));
                }

                return this.Ok(new
                {
                    data = models,
                    total = abuses.TotalCount,
                });
            }

            return this.Ok(new
            {
                total = abuses.TotalCount,
                data = abuses,
            });
        }

        [HttpPost]
        [Route("report")]
        public async Task<IActionResult> ReportAbuse([FromBody] AbuseCreateInputModel input)
        {
            var reporterAccount = await this.userService.GetCustomerByIdAsync(User.GetUserId());
            var flaggedAccount = await this.userService.GetCustomerByIdAsync(input.Account.Id);

            var temp = new List<int>();
            foreach (var predefinedReason in input.PredefinedReasons)
            {
                var number = (int)((AbusePredefinedReasons)Enum.Parse(typeof(AbusePredefinedReasons), predefinedReason));
                temp.Add(number);
            }


            var predefinedReasons = string.Join(", ", temp);

            var baseAbuse = new BaseAbuse
            {
                ReporterAccountId = reporterAccount.Id,
                Reason = input.Reason,
                State = AbuseState.PENDING,
                PredefinedReasons = predefinedReasons,
            };

            // check if body has post or comment kk
            // ...

            var id = await this.abuseService.CreateAccountAbuse(baseAbuse.ReporterAccountId, baseAbuse.Reason, baseAbuse.State, baseAbuse.PredefinedReasons, flaggedAccount.Id);

            return this.Ok(id);
        }

        private class BaseAbuse
        {
            public int ReporterAccountId { get; set; }
            public string Reason { get; set; }
            public AbuseState State { get; set; }
            public string PredefinedReasons { get; set; }
        }
    }
}
