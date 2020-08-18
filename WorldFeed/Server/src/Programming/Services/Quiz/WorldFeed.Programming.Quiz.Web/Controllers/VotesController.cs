namespace WorldFeed.Programming.Quiz.Web.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using WorldFeed.Programming.Quiz.Data.Models;
    using WorldFeed.Programming.Quiz.Web.ViewModels.Votes;
    using WorldFeed.Programming.Quiz.Services.Data;
    using WorldFeed.Programming.Quiz.Services.Data.Styles;
    using WorldFeed.Programming.Quiz.Web.ViewModels.Styles;

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class VotesController : ControllerBase
    {
        private readonly IVotesService<VoteQuestion> votesQuestionService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IQuestionVoteStylesService questionVoteStylesService;

        public VotesController(IVotesService<VoteQuestion> votesQuestionService,
            UserManager<ApplicationUser> userManager,
            IQuestionVoteStylesService questionVoteStylesService)
        {
            this.votesQuestionService = votesQuestionService;
            this.userManager = userManager;
            this.questionVoteStylesService = questionVoteStylesService;
        }

        [HttpPost]
        public async Task<ActionResult<VoteResponseModel>> Post(VoteInputModel input)
        {
            if (this.ModelState.IsValid == false)
            {
                return this.BadRequest(input);
            }

            var userId = this.userManager.GetUserId(this.User);

            await this.votesQuestionService.VoteAsync(input.EntityId, userId, input.IsUpVote);
            int votes = this.votesQuestionService.GetVotes(input.EntityId);

            var questionVoteStylesCurrent = await this.questionVoteStylesService.UpdateQuestionVote<QuestionVoteStylesViewModel>(userId, input.EntityId, input.IsUpVote);

            return new VoteResponseModel { VotesCount = votes, ThumbsUpStyle = questionVoteStylesCurrent.QuestionLiked, ThumbsDownStyle = questionVoteStylesCurrent.QuestionDisliked };

        }
    }
}
