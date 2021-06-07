using System;
using System.Linq;
using System.Threading.Tasks;
using Chessbook.Data.Models.Polls;
using Chessbook.Services.Data.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Localization;
using Chessbook.Web.Api.Controllers;
using Chessbook.Web.Api.Identity;
using Chessbook.Web.Models.Inputs.Polls;
using Chessbook.Web.Models.Outputs.Polls;
using Microsoft.AspNetCore.Mvc;
using Nop.Core;
using Nop.Services.Stores;
using Nop.Web.Factories;

namespace Chessbook.Web.Api.Controllers
{
    [Route("poll")]
    public class PollController : BaseApiController
    {
        private readonly IUserService _customerService;
        private readonly ILocaleStringResourceService localeStringResourceService;
        private readonly IPollModelFactory _pollModelFactory;
        private readonly IPollService pollService;
        private readonly IStoreMappingService _storeMappingService;
        private readonly IWorkContext _workContext;

        public PollController(IUserService customerService,
            ILocaleStringResourceService localeStringResourceService,
             IPollModelFactory pollModelFactory,
             IPollService pollService,
             IStoreMappingService storeMappingService,
             IWorkContext workContext)
        {
            _customerService = customerService;
             this.localeStringResourceService = localeStringResourceService;
            _pollModelFactory = pollModelFactory;
             this.pollService = pollService;
            _storeMappingService = storeMappingService;
            _workContext = workContext;
        }

        [Route("vote/{id?}")]
        [HttpPost]
        public async Task<IActionResult> Vote(int id)
        {
            var test = User.GetUserId();
            var pollAnswer = await this.pollService.GetPollAnswerByIdAsync(id);
            if (pollAnswer == null)
            {
                return this.BadRequest(new { error = "No poll answer found with the specified id" });
            }

            var poll = await this.pollService.GetPollByIdAsync(pollAnswer.PollId);

            if (!poll.Published || !await _storeMappingService.AuthorizeAsync(poll))
            {
                return this.BadRequest(new { error = "Poll is not available" });
            }

            if (await _customerService.IsGuestAsync(await _workContext.GetCurrentCustomerAsync()) && !poll.AllowGuestsToVote)
            {
                return this.BadRequest(new { error = await this.localeStringResourceService.GetResourceAsync("Polls.OnlyRegisteredUsersVote") });
            }

            var alreadyVoted = await this.pollService.AlreadyVotedAsync(poll.Id, (await _workContext.GetCurrentCustomerAsync()).Id);
            if (!alreadyVoted)
            {
                // vote
                await this.pollService.InsertPollVotingRecordAsync(new PollVotingRecord
                {
                    PollAnswerId = pollAnswer.Id,
                    CustomerId = (await _workContext.GetCurrentCustomerAsync()).Id,
                    CreatedOnUtc = DateTime.UtcNow
                });

                // update totals
                pollAnswer.NumberOfVotes = (await this.pollService.GetPollVotingRecordsByPollAnswerAsync(pollAnswer.Id)).Count;
                await this.pollService.UpdatePollAnswerAsync(pollAnswer);
                await this.pollService.UpdatePollAsync(poll);
            }

            var model = await _pollModelFactory.PreparePollModelAsync(poll, true);
            return this.Ok(model);

            //var pollAnswer = await pollService.GetPollAnswerByIdAsync(id);
            //if (pollAnswer == null)
            //{
            //    return this.BadRequest(new { error = "No poll answer found with the specified id" });
            //}

            //var poll = await pollService.GetPollByIdAsync<PollDTO>(pollAnswer.PollId);

            //if (!poll.Published)
            //{
            //    return this.BadRequest(new { error = "Poll is not available" });
            //}

            //var alreadyVoted = await pollService.AlreadyVotedAsync(poll.Id, User.GetUserId());
            //if (!alreadyVoted)
            //{
            //    // vote
            //    await pollService.InsertPollVotingRecordAsync(new PollVotingRecord
            //    {
            //        PollAnswerId = pollAnswer.Id,
            //        CustomerId = User.GetUserId(),
            //        CreatedOnUtc = DateTime.UtcNow
            //    });

            //    // update totals
            //    pollAnswer.NumberOfVotes = (await pollService.GetPollVotingRecordsByPollAnswerAsync(pollAnswer.Id)).Count();
            //    await pollService.UpdatePollAnswerAsync(pollAnswer);
            //    // await _pollService.UpdatePollAsync(poll);
            //}

            //return this.Ok(pollAnswer);
        }

        [Route("survey")]
        [HttpGet]
        public async Task<IActionResult> DailySurvey()
        {
            var polls = await this.pollService.GetPollsAsync(1, 0, false, true);

            if (polls == null)
            {
                return this.BadRequest("No such poll");
            }

            var poll = polls.First();

            poll.Views = ++poll.Views;
            await this.pollService.UpdatePollAsync(poll);


            var alreadyVoted = await this.pollService.AlreadyVotedAsync(poll.Id, (await _workContext.GetCurrentCustomerAsync()).Id);
            var model = await this._pollModelFactory.PreparePollModelAsync(poll, alreadyVoted);

            return this.Ok(model);


            //var alreadyVoted = await pollService.AlreadyVotedAsync(poll.Id, User.GetUserId());
            //poll.Voted = alreadyVoted;

            //var votes =  await this.pollService.GetPollVotes(poll.Id);

            //poll.VotesCount = votes;
            //poll.VotersCount = votes;

            //return this.Ok(poll);
        }
    }
}
