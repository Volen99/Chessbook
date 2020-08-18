using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

using WorldFeed.Programming.Quiz.Data.Common.Repositories;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Data.Models.Timer;
using WorldFeed.Programming.Quiz.Services.Data.Timer;
using WorldFeed.Programming.Quiz.Web.Models.AnonymousUser;
using WorldFeed.Programming.Quiz.Web.ViewModels.Timers;

namespace WorldFeed.Programming.Quiz.Web.Controllers.Timer
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimerController : ControllerBase
    {
        private readonly ITimerService timerService;
        private readonly IRepository<QuizTimer> quizTimerRepository;

        private UserManager<ApplicationUser> userManager;

        public TimerController(
            ITimerService timerService,
            IRepository<QuizTimer> quizTimerRepository,
            UserManager<ApplicationUser> userManager)
        {
            this.timerService = timerService;
            this.quizTimerRepository = quizTimerRepository;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<QuizTimer>> PostSaveTimerAsync(TimerInputModel input)
        {
            if (this.User.Identity.IsAuthenticated)
            {
                var userCurrent = await userManager.FindByNameAsync(this.User.Identity.Name);
                var timerCurrent = this.timerService.GetTimer(userCurrent.UserQuizTokenId);

                timerCurrent.Days = int.Parse(input.Days);
                timerCurrent.Hours = int.Parse(input.Hours);
                timerCurrent.Minutes = int.Parse(input.Minutes);
                timerCurrent.Seconds = input.Seconds;

                await this.quizTimerRepository.SaveChangesAsync();
                return timerCurrent;
            }
            else
            {
                var anonymousUser = JsonConvert.DeserializeObject<AnonymousUser>(this.HttpContext.Session.GetString(this.HttpContext.Session.Id));

                anonymousUser.QuizTimer.Days = int.Parse(input.Days);
                anonymousUser.QuizTimer.Hours = int.Parse(input.Hours);
                anonymousUser.QuizTimer.Minutes = int.Parse(input.Minutes);
                anonymousUser.QuizTimer.Seconds = input.Seconds;

                this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(anonymousUser));

                return anonymousUser.QuizTimer;
            }
        }
    }
}