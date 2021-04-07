using System;
using System.Linq;
using System.Threading.Tasks;
using Chessbook.Data.Models.Polls;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Web.Api.Controllers;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.Inputs.Polls;
using Chessbook.Web.Models.Outputs.Polls;
using Microsoft.AspNetCore.Mvc;

namespace Chessbook.Web.Api.Controllers
{
    [Route("poll")]
    public class PollController : BaseApiController
    {
        private readonly IPollService pollService;

        public PollController(IPollService pollService)
        {
            this.pollService = pollService;
        }

        [Route("vote/{id?}")]
        [HttpPost]
        public async Task<IActionResult> Vote(int id)
        {
            var pollAnswer = await pollService.GetPollAnswerByIdAsync(id);
            if (pollAnswer == null)
            {
                return this.BadRequest(new { error = "No poll answer found with the specified id" });
            }

            var poll = await pollService.GetPollByIdAsync<PollDTO>(pollAnswer.PollId);

            if (!poll.Published)
            {
                return this.BadRequest(new { error = "Poll is not available" });
            }

            var alreadyVoted = await pollService.AlreadyVotedAsync(poll.Id, User.GetUserId());
            if (!alreadyVoted)
            {
                // vote
                await pollService.InsertPollVotingRecordAsync(new PollVotingRecord
                {
                    PollAnswerId = pollAnswer.Id,
                    CustomerId = User.GetUserId(),
                    CreatedOnUtc = DateTime.UtcNow
                });

                // update totals
                pollAnswer.Votes = (await pollService.GetPollVotingRecordsByPollAnswerAsync(pollAnswer.Id)).Count();
                await pollService.UpdatePollAnswerAsync(pollAnswer);
                // await _pollService.UpdatePollAsync(poll);
            }

            return this.Ok(pollAnswer);
        }

        [Route("survey")]
        [HttpGet]
        public async Task<IActionResult> DailySurvey()
        {
            var poll = await this.pollService.WeeklySurvey<PollDTO>();

            var pollOptions = await this.pollService.GetPollAnswerByPollAsync<PollOptionDTO>(poll.Id);
            poll.Options = pollOptions;

            var alreadyVoted = await pollService.AlreadyVotedAsync(poll.Id, User.GetUserId());
            poll.Voted = alreadyVoted;

            var votes =  await this.pollService.GetPollVotes(poll.Id);

            poll.VotesCount = votes;
            poll.VotersCount = votes;

            return this.Ok(poll);
        }
    }
}
