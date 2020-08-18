using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Services;
using WorldFeed.Programming.Quiz.Services.Data.Styles;
using WorldFeed.Programming.Quiz.Web.ViewModels.Styles;

namespace WorldFeed.Programming.Quiz.Web.Controllers.Styles
{
    [Authorize]
    public class StylesController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IUserQuizTokensService userQuizTokensService;
        private readonly IUserPersonalStylesService userPersonalStylesService;

        public StylesController(
           UserManager<ApplicationUser> userManager,
           IUserQuizTokensService userQuizTokensService,
           IUserPersonalStylesService userPersonalStylesService)
        {
            this.userManager = userManager;
            this.userQuizTokensService = userQuizTokensService;
            this.userPersonalStylesService = userPersonalStylesService;
        }

        public async Task<IActionResult> Index()
        {
            var userCurrent = await this.userManager.FindByNameAsync(this.User.Identity.Name);
            var userStylesCurrent = this.userPersonalStylesService.GetByUserId<UserPersonalStylesViewModel>(userCurrent.Id);

            return View(userStylesCurrent);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(UserPersonalStylesViewModel input)
        {
            var userCurrent = await this.userManager.FindByNameAsync(this.User.Identity.Name);
            await this.userPersonalStylesService.Edit<UserPersonalStylesViewModel>(userCurrent.Id, input.QuestionColor, input.QuestionBackgroundColor, input.AnswerChoiceColor, input.LivesColor);

            return RedirectToAction("Index", "Quiz");
        }
    }
}