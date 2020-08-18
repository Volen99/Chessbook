using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WorldFeed.Programming.Quiz.Common.Controllers;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Services;
using WorldFeed.Programming.Quiz.Web.ViewModels.Questions;
using WorldFeed.Programming.Quiz.Web.ViewModels.UsersQuizTokens;

namespace WorldFeed.Programming.Quiz.Web.Controllers
{
    [Authorize]
    public class UserQuizTokensController : ApiController
    {
        private readonly IUserQuizTokensService userQuizTokensService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IQuestionService questionService;

        public UserQuizTokensController(
            IUserQuizTokensService userQuizTokensService,
            UserManager<ApplicationUser> userManager,
            IQuestionService questionService)
        {
            this.userQuizTokensService = userQuizTokensService;
            this.userManager = userManager;
            this.questionService = questionService;
        }

        [HttpGet(nameof(GetIncreaseProgress))]
        public async Task<ActionResult<UserQuizTokenIncreaseProgessResponseModel>> GetIncreaseProgress()
        {
            var userCurrent = await userManager.FindByNameAsync(User.Identity.Name);
            var result = await this.userQuizTokensService.IncreaseProgress(userCurrent.UserQuizTokenId);

            return new UserQuizTokenIncreaseProgessResponseModel { QuestionsPassed = result.QuestionsPassed, Lives = result.Lifes };
        }

        [HttpGet(nameof(GetDecreaseLives))]
        public async Task<ActionResult<DecreaseLivesResponseModel>> GetDecreaseLives()
        {
            var userCurrent = await userManager.FindByNameAsync(User.Identity.Name);
            var result = await this.userQuizTokensService.DecreaseLives(userCurrent.UserQuizTokenId);

            return new DecreaseLivesResponseModel { Lives = result };
        }

        [HttpGet(Id)]
        public async Task<ActionResult<int>> GetRemoveQuestion(int id)
        {
            if (this.ModelState.IsValid == false)
            {
                return this.BadRequest(id);
            }

            var userCurrent = await userManager.FindByNameAsync(User.Identity.Name);
            var removedQuestionId = await this.questionService.RemoveQuestion(userCurrent.UserQuizTokenId, id);

            return removedQuestionId;
        }

        [HttpPost]
        public async Task<ActionResult<UserQuizTokenUpdateStreakResponseModel>> UpdateStreak(UserQuizTokenUpdateStreakInputModel input)
        {
            if (this.ModelState.IsValid == false)
            {
                return this.BadRequest(input);
            }

            var userCurrent = await userManager.FindByNameAsync(User.Identity.Name);
            var result = await this.userQuizTokensService.UpdateStreak(userCurrent.UserQuizTokenId, input.IsQuestionAnsweredCorrectly);

            return new UserQuizTokenUpdateStreakResponseModel { StreakCurrent = result.CurrentStreak, StreakBest = result.BestStreak };
        }

        [HttpGet(nameof(GetUfoBonusLives))]
        public async Task<ActionResult<UserQuizTokenUfoBonusLiveResponseModel>> GetUfoBonusLives()
        {
            if (this.ModelState.IsValid == false)
            {
                return this.BadRequest(1);
            }

            var userCurrent = await userManager.FindByNameAsync(User.Identity.Name);
            var result = await this.userQuizTokensService.UpdateBonusUfoLives(userCurrent.UserQuizTokenId, 1);

            string message = "OK";
            if (result.Lifes == 1000)
            {
                message = $"Whoaa! {userCurrent.UserName} you are fucking smart! You (almost) got the lives you wanted to pass the quiz! ;) | 13.05.2020, Wednesday, 12:12 PM, Wanderlust 🌲 - An Indie/Folk/Pop Playlist | Vol. I";
            }

            return new UserQuizTokenUfoBonusLiveResponseModel { Lives = result.Lifes, Message = message };
        }

        [HttpPost(nameof(PostIncreaseSnakeLives))]
        public async Task<ActionResult<UserQuizTokensIncreaseLivesInputModel>> PostIncreaseSnakeLives(UserQuizTokensIncreaseLivesInputModel input)
        {
            if (this.ModelState.IsValid == false)
            {
                return BadRequest();
            }

            var userCurrent = await userManager.FindByNameAsync(User.Identity.Name);
            var userLives = await this.userQuizTokensService.IncreaseSnakeLives(userCurrent.UserQuizTokenId, input.Lives);

            string message = "OK";
            if (userLives == -1)
            {
                message = "Not today, bro";
            }

            return new UserQuizTokensIncreaseLivesInputModel { Message = message, Lives = userLives };
        }
    }
}