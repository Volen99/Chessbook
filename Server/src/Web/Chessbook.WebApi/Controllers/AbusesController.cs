using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Core.Domain.Abuse;
using Chessbook.Services.Abuses;
using Chessbook.Services;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.Inputs;

namespace Chessbook.Web.Api.Controllers
{
    [Route("abuses")]
    public class AbusesController : BaseApiController
    {
        private readonly IUserService userService;
        private readonly IAbuseService abuseService;

        public AbusesController(IUserService userService, IAbuseService abuseService)
        {
            this.userService = userService;
            this.abuseService = abuseService;
        }

        [HttpPost]
        [Route("report")]
        public async Task<IActionResult> ReportAbuse([FromBody] AbuseCreateInputModel input)
        {
            var reporterAccount = await this.userService.GetCustomerByIdAsync(User.GetUserId());

            if (reporterAccount == null)
            {
                return this.BadRequest("Cannot create abuse with the non account actor");
            }

            var temp = new List<int>();
            foreach (var predefinedReason in input.PredefinedReasons)
            {
                var number = (int)((AbusePredefinedReasons)Enum.Parse(typeof(AbusePredefinedReasons), predefinedReason));
                temp.Add(number);
            }

            var predefinedReasons = string.Join(", ", temp);

            var baseAbuse = new Abuse
            {
                ReporterAccountId = reporterAccount.Id,
                Reason = input.Reason,
                State = AbuseState.PENDING,
                PredefinedReasons = predefinedReasons,
                CreatedAt = DateTime.UtcNow,
            };
           
            if (input.Post != null)
            {
                var id = this.abuseService.CreatePostAbuse(baseAbuse, input.Post.Id);
            }
            else if (input.Comment != null)
            {
                var id = await this.abuseService.CreateCommentAbuse(baseAbuse, input.Comment.Id);
            }
            else if (input.Account != null)
            {
                var flaggedAccount = await this.userService.GetCustomerByIdAsync(input.Account.Id);
                var id = await this.abuseService.CreateAccountAbuse(baseAbuse, baseAbuse.ReporterAccountId.Value, flaggedAccount.Id);
            }

            return this.Ok();
        }

        //private class BaseAbuse
        //{
        //    public int ReporterAccountId { get; set; }
        //    public string Reason { get; set; }
        //    public AbuseState State { get; set; }
        //    public string PredefinedReasons { get; set; }
        //}
    }
}
