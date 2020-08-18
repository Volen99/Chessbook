using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Web.ViewModels.Questions;
using WorldFeed.Programming.Quiz.Services;
using WorldFeed.Programming.Quiz.Web.Models.AnonymousUser;
using WorldFeed.Programming.Quiz.Services.Data.Styles;
using WorldFeed.Programming.Quiz.Web.ViewModels.Styles;
using WorldFeed.Programming.Quiz.Services.Data.Timer;

namespace WorldFeed.Programming.Quiz.Web.Controllers
{
    public class QuizController : Controller
    {
        private IUserQuizTokensService userQuizTokensService;
        private readonly IQuestionService questionService;
        private readonly IUserPersonalStylesService userPersonalStylesService;
        private readonly IQuestionVoteStylesService questionVoteStylesService;
        private readonly ITimerService timerService;
        private UserManager<ApplicationUser> userManager;
        private ApplicationUser userCurrent;

        private Random rand;

        public QuizController(
            UserManager<ApplicationUser> userManager,
            IUserQuizTokensService userQuizTokensService,
            IQuestionService questionService,
            IUserPersonalStylesService userPersonalStylesService,
            IQuestionVoteStylesService questionVoteStylesService,
            ITimerService timerService)
        {
            this.userQuizTokensService = userQuizTokensService;
            this.questionService = questionService;
            this.userPersonalStylesService = userPersonalStylesService;
            this.questionVoteStylesService = questionVoteStylesService;
            this.timerService = timerService;
            this.userManager = userManager;

            this.rand = new Random();
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                await this.GetCurrentUser();

                if (this.userCurrent.UserQuizToken.Lifes <= 0)
                {
                    return RedirectToAction("Index", "SkillLevel");
                }

                var currentQuestion = this.questionService.GetById<QuestionViewModel>(this.userCurrent.UserQuizToken.CurrentQuestionId);

                var userStylesCurrent = this.userPersonalStylesService.GetByUserId<UserPersonalStylesViewModel>(this.userCurrent.Id);
                currentQuestion.UserStyles = userStylesCurrent;

                var userQuestionVoteStyes = this.questionVoteStylesService.GetById<QuestionVoteStylesViewModel>(this.userCurrent.Id, currentQuestion.Id);
                currentQuestion.QuestionVoteStyles = userQuestionVoteStyes;

                currentQuestion.DisplayProgress = this.userCurrent.UserQuizToken.QuestionsPassed;
                currentQuestion.DisplayLives = this.userCurrent.UserQuizToken.Lifes;
                currentQuestion.DisplayCurrentStreak = this.userCurrent.UserQuizToken.CurrentStreak;
                currentQuestion.DisplayBestStreak = this.userCurrent.UserQuizToken.BestStreak;

                currentQuestion.IsSnakeUnlocked = this.userCurrent.UserQuizToken.IsSnakeUnlocked;

                System.Threading.Thread.Sleep(100); // Yeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!!!

                currentQuestion.Timer = this.timerService.GetTimer(this.userCurrent.UserQuizTokenId);

                return View(currentQuestion);
            }
            else
            {
                if (this.HttpContext.Session.GetString(this.HttpContext.Session.Id) != null)
                {
                    var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));
                    if (anonymousUser.Lives > 0)
                    {
                        var currentQuestion = this.questionService.GetById<QuestionViewModel>(anonymousUser.CurrentQuestionId);

                        currentQuestion.DisplayProgress = anonymousUser.QuestionsPassed;
                        currentQuestion.DisplayLives = anonymousUser.Lives;
                        currentQuestion.DisplayCurrentStreak = anonymousUser.CurrentStreak;
                        currentQuestion.DisplayBestStreak = anonymousUser.BestStreak;

                        currentQuestion.IsSnakeUnlocked = anonymousUser.IsSnakeUnlocked;
                        currentQuestion.Timer = anonymousUser.QuizTimer;

                        return View(currentQuestion);
                    }
                }
            }

            return RedirectToAction("Index", "SkillLevel");
        }

        public async Task<object> GetCurrentUser()
        {
            if (User.Identity.IsAuthenticated)
            {
                this.userCurrent = await userManager.FindByNameAsync(User.Identity.Name);

                var userTokens = this.userQuizTokensService.GetAll<UserQuizToken>().FirstOrDefault(i => i.Id == this.userCurrent.UserQuizTokenId);
                if (userTokens == null)
                {
                    throw new ArgumentException($"id with value {this.userCurrent.UserQuizTokenId} was not found in the Database!");
                }

                this.userCurrent.UserQuizToken = userTokens;

                return this.userCurrent;
            }
            return null;
        }
    }
}