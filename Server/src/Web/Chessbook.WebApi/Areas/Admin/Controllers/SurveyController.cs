using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Services.Data.Services.Entities;
using Chessbook.Web.Api.Areas.Admin.Web.Models;
using Chessbook.Services.Security;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("admin/survey")]
    public class SurveyController : BaseAdminController
    {
        private readonly IPermissionService permissionService;
        private readonly IPollService pollService;

        public SurveyController(IPermissionService permissionService, IPollService pollService)
        {
            this.permissionService = permissionService;
            this.pollService = pollService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] PollCreateInputModel input)
        {
            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManagePolls))
            {
                return this.Unauthorized("👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽");
            }

            // get current servey
            var polls = await this.pollService.GetPollsAsync(1, loadShownOnHomepageOnly: true);

            if (polls != null && polls.Any())
            {
                var surveyCurrent = polls.First();
                surveyCurrent.ShowOnHomepage = false;
                await this.pollService.UpdatePollAsync(surveyCurrent);
            }

            var pollId = await this.pollService.InsertPollAsync(input.ExpiresIn, input.Question, true);

            await this.pollService.InsertPollAnswerAsync(pollId, input.Options);

            return this.Ok(pollId);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManagePolls))
            {
                return this.Unauthorized("👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽");
            }

            // try to get a poll with the specified id
            var poll = await this.pollService.GetPollByIdAsync(id);
            if (poll == null)
            {
                return this.NotFound();
            }

            await this.pollService.DeletePollAsync(poll);

            return this.Ok();
        }
    }
}
