using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

using WorldFeed.Programming.Quiz.Data;
using WorldFeed.Programming.Quiz.Data.Models.Timer;
using WorldFeed.Programming.Quiz.Web.Models.AnonymousUser;
using WorldFeed.Programming.Quiz.Web.ViewModels;

namespace WorldFeed.Programming.Quiz.Web.Controllers
{
    public class HomeController : Controller
    {
        private ILogger<HomeController> logger;
        private readonly ApplicationDbContext db;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext db)
        {
            this.logger = logger;
            this.db = db;
        }
        public IActionResult Index()
        {
            this.logger.LogInformation("24.04.2020, Friday, 12:35 PM, ATMOSPHERIC GOTHIC HORROR READING MUSIC | H.P Lovecraft, Stephen King, Edgar Allen Poe");

            if (this.HttpContext.Session.Get(this.HttpContext.Session.Id) == null)
            {
                this.HttpContext.Session.SetString(this.HttpContext.Session.Id, JsonConvert.SerializeObject(new AnonymousUser
                {
                    QuizTimer = new QuizTimer(),
                    HasUfoPassed = true,
                }));
            }

            var users = this.db.Users
                .Include(ut => ut.UserQuizToken)
                .OrderByDescending(x => x.UserQuizToken.MaximumSolved)
                .ThenByDescending(bs => bs.UserQuizToken.BestStreak)
                .ThenBy(c => c.CreatedOn)
                .Take(10)
                .ToList();

            return View(users);
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
