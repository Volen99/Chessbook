// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860
namespace WorldFeed.WebSPA.Controllers
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment env;
        private readonly IOptionsSnapshot<AppSettings> settings;

        public HomeController(IWebHostEnvironment env, IOptionsSnapshot<AppSettings> settings)
        {
            this.env = env;
            this.settings = settings;
        }
        public IActionResult Configuration()
        {
            return Json(this.settings.Value);
        } 
    }
}
