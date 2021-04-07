using Chessbook.Services.Data.Services.Entities;
using Chessbook.Web.Api.Areas.Admin.Web.Models;
using Chessbook.Web.Api.Controllers;
using Chessbook.Web.Models.Outputs.Polls;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Areas.Admin
{
    [Route("survey")]
    public class SurveyController : BaseApiController
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
