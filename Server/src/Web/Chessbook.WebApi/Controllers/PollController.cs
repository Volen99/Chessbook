using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Core;
using Chessbook.Services.Stores;
using Chessbook.Web.Factories;
using Chessbook.Core.Domain.Polls;
using Chessbook.Services;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Localization;
using Chessbook.Web.Api.Identity;

namespace Chessbook.Web.Api.Controllers
{
    // TODO: change to "polls"
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

        [Authorize]
        [HttpPost]
        [Route("vote/{id?}")]
        public async Task<IActionResult> Vote(int id)
        {
            var pollAnswer = await this.pollService.GetPollAnswerByIdAsync(id);
            if (pollAnswer == null)
            {
                return this.BadRequest(new { error = "No poll answer found with the specified id" });
            }

            var poll = await this.pollService.GetPollByIdAsync(pollAnswer.PollId);

            if (!poll.Published)
            {
                return this.BadRequest(new { error = "Poll is not available" });
            }

            if (await _customerService.IsGuestAsync(await _workContext.GetCurrentCustomerAsync()) && !poll.AllowGuestsToVote)
            {
                return this.BadRequest(new { error = await this.localeStringResourceService.GetResourceAsync("Polls.OnlyRegisteredUsersVote") });
            }

            var alreadyVoted = await this.pollService.AlreadyVotedAsync(poll.Id, (await _workContext.GetCurrentCustomerAsync()).Id);
            if (!alreadyVoted.Any())
            {
                // is expired
                if (poll.EndDateUtc <= DateTime.UtcNow)
                {
                    return this.BadRequest(new { error = "Poll has expired" });
                }

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
        }

        [HttpGet]
        [Route("survey")]
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
            var model = await this._pollModelFactory.PreparePollModelAsync(poll, alreadyVoted.Any());

            return this.Ok(model);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetPoll(int id)
        {
            var poll = await this.pollService.GetPollByIdAsync(id);

            if (poll == null)
            {
                return this.BadRequest("This poll no longer exists :(");
            }

            var model = await this._pollModelFactory.PreparePollModelAsync(poll, true);

            return this.Ok(model);
        }
    }
}
