using Chessbook.Services.Data.Services.Entities;
using Chessbook.Web.Api.Areas.Admin.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("survey")]
    public class SurveyController : BaseAdminController
    {
        private IPollService pollService;

        public SurveyController(IPollService pollService)
        {
            this.pollService = pollService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] PollCreateInputModel input)
        {
            var pollId = await this.pollService.InsertPollAsync(input, input.Question, true);

            var options = await this.pollService.InsertPollAnswerAsync(pollId, input.Options);

            return this.Ok(pollId);
        }
    }
}
