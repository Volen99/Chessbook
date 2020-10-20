using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Data.Models.Timer;
using WorldFeed.Programming.Quiz.Services;
using WorldFeed.Programming.Quiz.Services.Data.Timer;
using WorldFeed.Programming.Quiz.Web.Models.AnonymousUser;

namespace WorldFeed.Programming.Quiz.Web.Controllers
{
    public class SkillLevelController : Controller
    {
        private readonly IUserQuizTokensService userQuizTokensService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ITimerService timerService;

        private readonly Random rand;

        public SkillLevelController(
            IUserQuizTokensService userQuizTokensService,
            UserManager<ApplicationUser> userManager,
            ITimerService timerService)
        {
            this.userQuizTokensService = userQuizTokensService;
            this.userManager = userManager;
            this.timerService = timerService;

            this.rand = new Random();
        }

        public IActionResult Index()
        {
            return this.View();
        }

        [HttpGet]
        public async Task<IActionResult> SetInitialUserQuizTokens(string level)
        {
            if (this.ModelState.IsValid == false)
            {
                return this.View();
            }

            int lives = level == "Beginner" ? 50 : level == "Intermediate" ? 40 : level == "Advanced" ? 30 : level == "Expert" ? 20 : 0;

            if (this.User.Identity.IsAuthenticated)
            {
                var userCurrent = await userManager.FindByNameAsync(User.Identity.Name);

                var timerCurrent = this.timerService.GetTimer(userCurrent.UserQuizTokenId);

                if (timerCurrent == null)
                {
                   await this.timerService.CreateAsync(userCurrent.UserQuizTokenId);
                }
                else
                {
                    timerCurrent.Days = 0;
                    timerCurrent.Hours = 0;
                    timerCurrent.Minutes = 0;
                    timerCurrent.Seconds = 0;
                }

                await this.userQuizTokensService.SetInitialUserQuizTokens(userCurrent.UserQuizTokenId, lives);
            }
            else
            {
                if (this.HttpContext.Session.Get(this.HttpContext.Session.Id) == null)
                {
                    this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(new AnonymousUser
                    {
                        QuizTimer = new QuizTimer(),
                    }));
                }

                var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));

                var indexes = new HashSet<int>();
                for (int questionId = 1; questionId <= 1000; questionId++)
                {
                    indexes.Add(questionId);
                }
                anonymousUser.QuestionsLeft = JsonConvert.SerializeObject(indexes);

                var randomQuestionId = indexes.ToList()[this.rand.Next(0, 999)];
                anonymousUser.CurrentQuestionId = randomQuestionId;

                anonymousUser.QuestionsPassed = 0;  
                anonymousUser.WrongAnswers = 0;
                anonymousUser.Lives = lives;
                anonymousUser.CurrentStreak = 0;
                anonymousUser.BestStreak = 0;
                anonymousUser.IsSnakeUnlocked = false;
                anonymousUser.HasUfoPassed = true;

                anonymousUser.QuizTimer.Days = 0;
                anonymousUser.QuizTimer.Hours = 0;
                anonymousUser.QuizTimer.Minutes = 0;
                anonymousUser.QuizTimer.Seconds = 0;

                this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(anonymousUser));
            }

            return RedirectToAction("Index", "Quiz");
        }
    }
}